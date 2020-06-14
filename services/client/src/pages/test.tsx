import { NextPage } from 'next';
import { Container } from '../components/common/gridSystem';
import Link from 'next/link';
import Layout1 from '../components/layouts/l1.layout';

const test: NextPage = () => {
  return (
    <Layout1>
      <Container>
        <Link href="/">
          <a>index</a>
        </Link>
        <div>test page</div>
      </Container>
    </Layout1>
  );
};

export default test;
