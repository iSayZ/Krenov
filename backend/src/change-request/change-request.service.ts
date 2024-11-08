import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AdminAccount,
  AdminAccountDocument,
} from '../admin/schema/admin-account.schema';
import {
  AdminProfile,
  AdminProfileDocument,
} from '../admin/schema/admin-profile.schema';
import {
  updatePasswordAccountDto,
  updateEmailAccountDto,
  resetPasswordAccountDto,
  resetBackupCodesAccountDto,
} from '../admin/dto/update-admin-account.dto';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import {
  ChangeRequest,
  ChangeRequestDocument,
} from './schema/change-request.schema';
import { AdminService } from 'src/admin/admin.service';
import { TwoFactorService } from 'src/twofactor/twofactor.service';

@Injectable()
export class ChangeRequestService {
  constructor(
    @InjectModel(AdminAccount.name)
    private adminAccountModel: Model<AdminAccountDocument>,
    @InjectModel(AdminProfile.name)
    private adminProfileModel: Model<AdminProfileDocument>,
    @InjectModel(ChangeRequest.name)
    private changeRequestModel: Model<ChangeRequestDocument>,
    private authService: AuthService,
    private adminService: AdminService,
    private mailService: MailService,
    private jwtService: JwtService,
    private twoFactorService: TwoFactorService,
  ) {}

  // Generate an unique token to create a change request
  private async generateTokenToChangeRequest(
    uniqueId: string
  ): Promise<string> {
    const payload = {
      changeRequestId: uniqueId,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });

    return token;
  }

  // Generate token and stock the change request on BDD
  private async saveChangeRequest(
    userId: string,
    requestType: string,
    newValue: string
  ): Promise<string> {
    // Generate an unique id for the change request
    const uniqueId = this.authService.generateSessionId();

    // Generate token available 1h with unique id
    const token = await this.generateTokenToChangeRequest(uniqueId);

    // Create the change request on BDD
    const changeRequest = new this.changeRequestModel({
      change_request_id: uniqueId,
      token,
      user_id: userId,
      request_type: requestType,
      new_value: newValue,
      created_at: new Date(),
      expires_at: new Date(Date.now() + 60 * 60 * 1000), // Expire in 1h
    });

    await changeRequest.save();

    return token;
  }

  // To delete the change request
  async deleteChangeRequest(changeRequestId: string): Promise<void> {
    // Rechercher le document en utilisant le champ `change_request_id`
    const changeRequest = await this.changeRequestModel
      .findOne({ change_request_id: changeRequestId })
      .exec();

    if (!changeRequest) {
      throw new NotFoundException('Change request not found');
    }

    await this.changeRequestModel
      .deleteOne({ change_request_id: changeRequestId })
      .exec();
  }

  // To check validity token and get the request on BDD
  async verifyTokenAndGetRequest(
    token: string
  ): Promise<ChangeRequestDocument | null> {
    try {
      // Check token
      const payload = this.jwtService.verify(token);
      const changeRequestId = payload.changeRequestId;

      // Search on BDD
      return await this.changeRequestModel.findOne({
        change_request_id: changeRequestId,
      });
    } catch {
      return null; // If token invalid or expired
    }
  }

  // To apply the good proccess at the request type
  async processChangeRequest(
    changeRequest: ChangeRequestDocument
  ): Promise<any> {
    switch (changeRequest.request_type) {
      case 'change_password':
        const passwordResult = this.adminService.changePassword(
          changeRequest.user_id,
          changeRequest.new_value
        );
        await this.deleteChangeRequest(changeRequest.change_request_id);
        return passwordResult;
      case 'change_email':
        const emailResult = this.adminService.changeEmail(
          changeRequest.user_id,
          changeRequest.new_value
        );
        await this.deleteChangeRequest(changeRequest.change_request_id);
        return emailResult;
      case 'reset_password':
        const resetPasswordResult = this.adminService.resetPassword(
          changeRequest.user_id,
          changeRequest.new_value
        );
        await this.deleteChangeRequest(changeRequest.change_request_id);
        return resetPasswordResult;
      case 'reset_backup_codes':
        const backupCodes = await this.twoFactorService.generateAndStoreBackupCodes(changeRequest.user_id);
        const backupCodesResult = await this.mailService.sendNewBackupCodesMail(changeRequest.user_id, backupCodes);
        await this.deleteChangeRequest(changeRequest.change_request_id);
        return backupCodesResult;
      default:
        throw new NotFoundException('Request type not supported');
    }
  }

  // To update new_value in change request
  async updateNewValueRequest(changeRequestId: string, newPassword: string) {
    try {
      return await this.changeRequestModel
        .findOneAndUpdate(
          { change_request_id: changeRequestId },
          { new_value: newPassword },
          { new: true }
        )
        .exec();
    } catch {
      throw new InternalServerErrorException(
        'Erreur lors de la mise à jour de la valeur.'
      );
    }
  }

  // Route to generate a change request to change password
  async changePasswordRequest(
    userId: string,
    updatePasswordAccountDto: updatePasswordAccountDto
  ) {
    // Check if the current password matches with account
    const password = updatePasswordAccountDto.currentPassword;

    const account = await this.adminAccountModel.findById(userId).exec();

    if (!account) {
      throw new NotFoundException(`Aucun compte correspondant.`);
    }

    const isPasswordValid = await this.authService.verifyPassword(
      account.password,
      password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(`Le mot de passe est incorrect.`);
    }

    // Get the profile info corresponding to the account for the mail
    const profile = await this.adminProfileModel
      .findOne({ admin_id: userId })
      .exec();

    if (!profile) {
      throw new NotFoundException(`Aucun profil correspondant.`);
    }

    // Hash password before stock
    const hashedPassword = await this.authService.hashPassword(
      updatePasswordAccountDto.newPassword
    );

    // Generate and stock the token on BDD
    const changePasswordToken = await this.saveChangeRequest(
      userId,
      'change_password',
      hashedPassword
    );

    // Send an email to the user to confirm the action
    await this.mailService.sendConfirmPasswordChangeMail(
      account,
      profile,
      changePasswordToken
    );
  }

  // Route to generate a change request to change email
  async changeEmailRequest(
    userId: string,
    updateEmailAccountDto: updateEmailAccountDto
  ) {
    // Check if the current email matches with account
    const email = updateEmailAccountDto.currentEmail;

    const account = await this.adminAccountModel.findById(userId).exec();

    if (!account) {
      throw new NotFoundException(`Aucun compte correspondant.`);
    }

    if (account.email !== email) {
      throw new UnauthorizedException(`L'adresse e-mail est incorrecte.`);
    }

    // Get the profile info corresponding to the account for the mail
    const profile = await this.adminProfileModel
      .findOne({ admin_id: userId })
      .exec();

    if (!profile) {
      throw new NotFoundException(`Aucun profil correspondant.`);
    }

    // Generate and stock the token on BDD
    const changeEmailToken = await this.saveChangeRequest(
      userId,
      'change_email',
      updateEmailAccountDto.newEmail
    );

    // Send an email to the user to confirm the action
    await this.mailService.sendConfirmEmailChangeMail(
      account,
      profile,
      changeEmailToken
    );
  }

  // Route to generate a change request to reset password
  async resetPasswordRequest(resetPasswordAccountDto: resetPasswordAccountDto) {
    // Check if the current email matches with an account
    const email = resetPasswordAccountDto.email;

    const account = await this.adminAccountModel.findOne({ email }).exec();

    if (!account) {
      throw new NotFoundException(`Aucun compte correspondant.`);
    }

    if (account.email !== email) {
      throw new UnauthorizedException(`L'adresse e-mail est incorrecte.`);
    }

    // Get the profile info corresponding to the account for the mail
    const profile = await this.adminProfileModel
      .findOne({ admin_id: account._id })
      .exec();

    if (!profile) {
      throw new NotFoundException(`Aucun profil correspondant.`);
    }

    // Generate and stock the token on BDD
    const changeResetPasswordToken = await this.saveChangeRequest(
      account._id as string,
      'reset_password',
      'null'
    );

    // Send an email to the user to confirm the action
    await this.mailService.sendConfirmResetPasswordMail(
      account,
      profile,
      changeResetPasswordToken
    );
  }

  // Route to generate a change request to reset password
  async resetBackupCodes(
    resetBackupCodesAccountDto: resetBackupCodesAccountDto
  ) {
    // Check if the current email matches with an account
    const email = resetBackupCodesAccountDto.email;

    const account = await this.adminAccountModel.findOne({ email }).exec();

    if (!account) {
      throw new NotFoundException(`Aucun compte correspondant.`);
    }

    if (account.email !== email) {
      throw new UnauthorizedException(`L'adresse e-mail est incorrecte.`);
    }

    // Get the profile info corresponding to the account for the mail
    const profile = await this.adminProfileModel
      .findOne({ admin_id: account._id })
      .exec();

    if (!profile) {
      throw new NotFoundException(`Aucun profil correspondant.`);
    }

    // Generate and stock the token on BDD
    const changeResetBackupCodesToken = await this.saveChangeRequest(
      account._id as string,
      'reset_backup_codes',
      'null'
    );

    // Send an email to the user to confirm the action
    await this.mailService.sendConfirmResetBackupCodesMail(
      account,
      profile,
      changeResetBackupCodesToken
    );
  }
}
