import { NextPage } from 'next';
import { Container } from '../components/common/gridSystem';
import Layout1 from '../components/layouts/layout1';

const test: NextPage = () => {
  return (
    <Layout1>
      <Container>
        <div>test page</div>
      </Container>
    </Layout1>
  );
};

export default test;
