import { routes } from '@project-shared/shared';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { tlp } from '../../lib/translations';
import { Container } from '../common/gridSystem';

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

        <Link href="/test">
          <a>test</a>
        </Link>

        <Link {...tlp({ tRoutes: routes.register })}>
          <a>register</a>
        </Link>

        <Link {...tlp({ tRoutes: routes.login })}>
          <a>login</a>
        </Link>

        <Link {...tlp({ tRoutes: routes.profile })}>
          <a>profile</a>
        </Link>

        <Link href="/en/login">
          <a>en login</a>
        </Link>
      </Container>

      <div className="mt-3">{children}</div>
    </>
  );
};

export default L1;
