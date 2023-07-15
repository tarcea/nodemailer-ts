import 'dotenv/config';
import { createTransport } from 'nodemailer';

const host = process.env.BREVO_HOST;
const port = Number(process.env.BREVO_PORT);
const user = process.env.BREVO_USERNAME;
const pass = process.env.BREVO_PASSWORD;
const from = process.env.FROM;
const to = process.env.TO;

const transporter = createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

const mailOptions = {
  from,
  to,
  subject: 'test subject',
  text: 'test email using brevo/sendinblue smtp',
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log('email sent' + info.response);
  }
});
