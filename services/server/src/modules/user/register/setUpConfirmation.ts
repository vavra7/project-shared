import { v4 } from 'uuid';
import { User } from '../../../entity/User';
import { sendUserConfirmEmail } from '../../../lib/mailer';
import { getStore } from '../../../lib/store';

export async function setUpConfirmation({ id: userId, email }: User): Promise<void> {
  const token = 'cnf:' + v4();
  const store = getStore();

  await store.set(token, userId, 'EX', 60 * 60 * 24);
  await sendUserConfirmEmail(email, token);
}
