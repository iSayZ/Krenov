import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { render } from '@react-email/components';
import { AdminAccount, AdminAccountDocument } from 'src/admin/schema/admin-account.schema';
import { AdminProfile, AdminProfileDocument } from 'src/admin/schema/admin-profile.schema';
import EmailAdressChangedEmail from './emails/EmailAdressChangedEmail';
import PasswordChangedEmail from './emails/PasswordChangedEmail';
import PasswordResetEmail from './emails/PasswordResetEmail';
import ResetBackupCodesEmail from './emails/ResetBackupCodesEmail';
import { MailConfig } from './mail.config';
import { MailData } from './mail.types';
import SendBackupCodesEmail from './emails/SendBackupCodesEmail';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MailService {
  constructor(
    @InjectModel(AdminAccount.name)
    private adminAccountModel: Model<AdminAccountDocument>,
    @InjectModel(AdminProfile.name)
    private adminProfileModel: Model<AdminProfileDocument>,
    private readonly mailConfig: MailConfig
  ) {}

  // To send an e-mail with a template
  async sendMail(mailData: MailData) {
    const html = await render(mailData.template);

    const { transporter } = this.mailConfig.createMailerOptions();

    await transporter
      .sendMail({
        from: `${process.env.APP_NAME} <${process.env.SMTP_USER}>`,
        to: mailData.to,
        subject: mailData.subject,
        html: html,
      })
      .then((info) => {
        console.log('Message sent: %s', info.messageId);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  // To send an email for password change
  async sendConfirmPasswordChangeMail(
    account: AdminAccount,
    profile: AdminProfile,
    token: string
  ) {
    try {
      const name = profile.firstname;
      const appName = process.env.APP_NAME;
      const appUrl = process.env.CLIENT_URL;

      const mailData: MailData = {
        to: account.email,
        subject: 'Changement de Mot de Passe',
        template: PasswordChangedEmail({ name, appName, appUrl, token }),
      };

      await this.sendMail(mailData);
    } catch (error) {
      console.error(error);
    }
  }

  // To send an email for e-mail change
  async sendConfirmEmailChangeMail(
    account: AdminAccount,
    profile: AdminProfile,
    token: string
  ) {
    try {
      const name = profile.firstname;
      const appName = process.env.APP_NAME;
      const appUrl = process.env.CLIENT_URL;

      const mailData: MailData = {
        to: account.email,
        subject: "Changement d'adresse mail",
        template: EmailAdressChangedEmail({ name, appName, appUrl, token }),
      };

      await this.sendMail(mailData);
    } catch (error) {
      console.error(error);
    }
  }

  // To send an email for reset password
  async sendConfirmResetPasswordMail(
    account: AdminAccount,
    profile: AdminProfile,
    token: string
  ) {
    try {
      const name = profile.firstname;
      const appName = process.env.APP_NAME;
      const appUrl = process.env.CLIENT_URL;

      const mailData: MailData = {
        to: account.email,
        subject: 'Réinitialisation du mot de passe',
        template: PasswordResetEmail({ name, appName, appUrl, token }),
      };

      await this.sendMail(mailData);
    } catch (error) {
      console.error(error);
    }
  }

  // To send an email for reset backup codes
  async sendConfirmResetBackupCodesMail(
    account: AdminAccount,
    profile: AdminProfile,
    token: string
  ) {
    try {
      const name = profile.firstname;
      const appName = process.env.APP_NAME;
      const appUrl = process.env.CLIENT_URL;

      const mailData: MailData = {
        to: account.email,
        subject: 'Réinitialisation des codes de secours 2FA',
        template: ResetBackupCodesEmail({ name, appName, appUrl, token }),
      };

      await this.sendMail(mailData);
    } catch (error) {
      console.error(error);
    }
  }

  // To send an email for with new backup codes
  async sendNewBackupCodesMail(
    userId: string,
    backupCodes: string[]
  ) {
    try {
      // Get the account info for the mail
      const account = await this.adminAccountModel.findById( userId ).exec();

      if (!account) {
        throw new NotFoundException(`Aucun compte correspondant.`);
      }

      // Get the profile info corresponding to the account for the mail
      const profile = await this.adminProfileModel
      .findOne({ admin_id: account._id })
      .exec();

      if (!profile) {
        throw new NotFoundException(`Aucun profil correspondant.`);
      }

      const name = profile.firstname;
      const appName = process.env.APP_NAME;
      const appUrl = process.env.CLIENT_URL;

      const mailData: MailData = {
        to: account.email,
        subject: 'Vos codes de secours 2FA pour sécuriser votre compte',
        template: SendBackupCodesEmail({ name, appName, appUrl, backupCodes }),
      };

      await this.sendMail(mailData);

      return {
        message: 'Password updated successfully',
        statusCode: HttpStatus.OK,
        redirectUrl: '/success',
      };
    } catch (error) {
      console.error(error);
    }
  }
}
