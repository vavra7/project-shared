type Routes = { [key: string]: (...params: string[]) => string };

export const routes: Routes = {
  home: () => '/',
  register: () => '/user/register',
  login: () => '/user/login',
  confirmUser: token => `/user/confirm/${token}`
};
