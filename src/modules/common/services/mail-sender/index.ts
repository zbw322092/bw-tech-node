import * as nodemailer from 'nodemailer';
import nconf from '../../../../config/config';
import { IsEmail, Length } from 'class-validator';

// const transporter = nodemailer.createTransport(nconf.get("mail:options"));

// transporter.verify((error, success) => {
//   if (error) {
//     console.error(`SMTP configuartion error: ${error}`);
//   } else {
//     console.log('SMTP Server is ready to take mail messages');
//   }
// });

// export class MailSender {
//   constructor(to:string, subject: string, text: string, html: string) {
//     this.to = to;
//     this.subject = subject;
//     this.text = text;
//     this.html = html;
//   }
//   @IsEmail()
//   to: string;

//   @Length(5, 200)
//   subject: string;

//   text: string;
//   html: string;

//   public async sendMail() {
//     const from = nconf.get('mail:options:host') || 'localhost';
//     return transporter.sendMail({
//       from,
//       to: this.to,
//       subject: this.subject,
//       text: this.text,
//       html: this.html
//     });
//   }
// }