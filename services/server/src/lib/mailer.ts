import { routes } from '@project-shared/shared';
import { createTransport, getTestMessageUrl, Transporter } from 'nodemailer';
import { getMailerConfig } from '../config/mailerConfig';

let transporter: Transporter | undefined;

async function getTransporter(): Promise<Transporter> {
  if (!transporter) {
    const mailerConfig = await getMailerConfig();

    transporter = createTransport(mailerConfig);
  }

  return transporter;
}

async function sendUserConfirmEmail(email: string, token: string): Promise<void> {
  const transporter = await getTransporter();
  // TODO: handle translations in link
  const url = process.env.CLIENT_URL + (routes as any).confirmUser.cs.as(token);
  const mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>',
    to: email,
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: `<a href="${url}">${url}</a>`
  };

  const message = await transporter.sendMail(mailOptions);

  console.log('Preview URL: %s', getTestMessageUrl(message));
}

export { sendUserConfirmEmail };
