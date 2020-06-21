import { routes } from '@project-shared/shared';
import { NextPage } from 'next';
import { Container } from '../components/common/gridSystem';
import Layout1 from '../components/layouts/layout1';

const Index: NextPage = () => {
  return (
    <Layout1>
      <Container>
        <pre>{JSON.stringify(routes, null, 2)}</pre>
      </Container>
    </Layout1>
  );
};

export default Index;
