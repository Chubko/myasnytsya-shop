import * as EmailTemplates from 'email-templates';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

import {config} from '../../config';
import {ActionEnum} from '../../constants';
import {htmlTemplates} from '../../email-templates';
import {ErrorHandler} from '../../errorHandler';

const contextExtension = {
  frontendURL: config.FRONTEND_URL
};
console.log('login', config.ROOT_EMAIL, config.ROOT_EMAIL_PASSWORD);
const transporter = nodemailer.createTransport({
  service: config.ROOT_EMAIL_SERVICE,
  auth: {
    user: config.ROOT_EMAIL,
    pass: config.ROOT_EMAIL_PASSWORD
  }
});

const emailTemplates = new EmailTemplates({
  message: {},
  views: {
    root: path.join(__dirname,'../../', 'email-templates')
  }
});
console.log('path', __dirname,'../../', 'email-templates');
export class MailService {
  async sendEmail(email: string, action: ActionEnum, context: any = {}): Promise<void> {
    const templateInfo = htmlTemplates[action];

    if (!templateInfo) {
      throw new ErrorHandler(500, 'Template is not found');
    }

    Object.assign(context, contextExtension);

    const html = await emailTemplates.render(templateInfo.templateFileName, context);

    const mainOption = {
      from: `No reply<${config.ROOT_EMAIL}>`,
      to: email,
      subject: templateInfo.subject,
      html
    };

    await transporter.sendMail(mainOption);
  }
}

export const emailService = new MailService();
