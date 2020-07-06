import { routes } from '@project-shared/shared';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { t, tlp } from '../../lib/translations';
import { Container } from '../common/gridSystem';
import LanguageSwitcher from '../common/LanguageSwitcher';

interface Props {
  children: ReactNode;
}

const L1: FC<Props> = ({ children }) => {
  return (
    <>
      <Container className="py-2" flexDirection="row" justifyContent="space-around">
        <Link {...tlp({ tRoutes: routes.homePage })}>
          <a>
            <i className="icon-home" /> index
          </a>
        </Link>

        <Link {...tlp({ tRoutes: routes.test })}>
          <a>test</a>
        </Link>

        <Link {...tlp({ tRoutes: routes.register })}>
          <a>register</a>
        </Link>

        <Link {...tlp({ tRoutes: routes.login })}>
          <a>{t('login.link')}</a>
        </Link>

        <Link {...tlp({ tRoutes: routes.profile })}>
          <a>profile</a>
        </Link>

        <LanguageSwitcher />
      </Container>

      <div className="mt-3">{children}</div>
    </>
  );
};

export default L1;
