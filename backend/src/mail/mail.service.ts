import { Injectable } from '@nestjs/common';
import { MailConfig } from './mail.config';
import { MailData } from './mail.types';
import { AdminAccount } from 'src/admin/schema/admin-account.schema';
import { AdminProfile } from 'src/admin/schema/admin-profile.schema';
import { render } from '@react-email/components';
import PasswordChangedEmail from './emails/PasswordChangedEmail';
import EmailAdressChangedEmail from './emails/EmailAdressChangedEmail';
import PasswordResetEmail from './emails/PasswordResetEmail';

@Injectable()
export class MailService {
  constructor(private readonly mailConfig: MailConfig) {}

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
      console.log(error);
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
      console.log(error);
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
        subject: "Réinitialisation du mot de passe",
        template: PasswordResetEmail({ name, appName, appUrl, token }),
      };

      await this.sendMail(mailData);
    } catch (error) {
      console.log(error);
    }
  }
}
