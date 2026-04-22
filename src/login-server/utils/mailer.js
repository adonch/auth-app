import nodemailer from 'nodemailer';
import 'dotenv/config';
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jaime.gottlieb2@ethereal.email',
        pass: '68PK8vKMbcdrxQJXcd'
    }
});
function send(email, subject, html) {
  return transporter.sendMail({
    from: 'Auth API',
    to: email,
    subject,
    html,
  });
}
function sendActivationLink(email, activationToken) {
  const link = `${process.env.VITE_APP_URL}/activate/${activationToken}`;
  const html = `
    <h1>Account activation</h1>
    <a href="${link}">${link}</a>
  `;

  return send(email, 'Account activation', html);
}

export const mailer = {
  send,
  sendActivationLink,
};
