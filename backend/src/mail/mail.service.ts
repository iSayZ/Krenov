import { Injectable } from '@nestjs/common';
import { MailConfig } from './mail.config';
import { MailData } from './mail.types';

@Injectable()
export class MailService {
  constructor(private readonly mailConfig: MailConfig) {}

  async sendMail(mailData: MailData) {
    const { transporter } = this.mailConfig.createMailerOptions();
    await transporter
      .sendMail({
        from: `${process.env.APP_NAME} <${process.env.SMTP_USER}>`,
        to: mailData.to,
        subject: mailData.subject,
        html: mailData.html,
      })
      .then((info) => {
        console.log('Message sent: %s', info.messageId);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }
}
