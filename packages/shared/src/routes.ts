export type Route = {
  href: string;
  as?: (params: { [key: string]: string }) => string;
};

export type TranslatableRoute = {
  cs: Route;
  en: Route;
};

export interface Routes {
  homePage: TranslatableRoute;
  register: TranslatableRoute;
  login: TranslatableRoute;
  confirmUser: TranslatableRoute;
  profile: TranslatableRoute;
  test: TranslatableRoute;
}

export const routes: Routes = {
  homePage: {
    cs: {
      href: '/'
    },
    en: {
      href: '/en'
    }
  },
  register: {
    cs: {
      href: '/registrace'
    },
    en: {
      href: '/en/register'
    }
  },
  login: {
    cs: {
      href: '/prihlaseni'
    },
    en: {
      href: '/en/login'
    }
  },
  confirmUser: {
    cs: {
      href: '/potvrzeni/[token]',
      as: token => `/potvrzeni/${token}`
    },
    en: {
      href: '/en/confirm/[token]',
      as: token => `/en/confirm/${token}`
    }
  },
  profile: {
    cs: {
      href: '/ucet'
    },
    en: {
      href: '/en/profile'
    }
  },
  test: {
    cs: {
      href: '/test'
    },
    en: {
      href: '/en/test'
    }
  }
};
