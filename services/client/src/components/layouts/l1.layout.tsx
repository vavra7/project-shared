import { Container } from '../common/gridSystem';
import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

const L1: FC<Props> = ({ children }) => {
  return (
    <>
      <Container className="py-2" flexDirection="row" justifyContent="space-around">
        <Link href="/">
          <a>
            <i className="icon-home" /> index
          </a>
        </Link>

        <Link href="/test">
          <a>test</a>
        </Link>
      </Container>

      {children}
    </>
  );
};

export default L1;
