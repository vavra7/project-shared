import { createTestAccount } from 'nodemailer';

export const getMailerConfig = async (): Promise<object> => {
  const account = await createTestAccount();

  return {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass
    }
  };
};
