import { User } from '../../../entity/User';
import { getStore } from '../../../lib/store';
import { sendUserConfirmEmail } from '../../../lib/mailer';
import { v4 } from 'uuid';

export async function setUpConfirmation({ id: userId, email }: User): Promise<void> {
  const token = 'confirm:' + v4();
  const store = getStore();

  await store.set(token, userId, 'EX', 60 * 60 * 24);
  await sendUserConfirmEmail(email, token);
}
