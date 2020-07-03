import { useRouter } from 'next/router';
import { FC } from 'react';
import Layout1 from '../../../../components/layouts/layout1';

const Insertion: FC = () => {
  const { query } = useRouter();

  return (
    <Layout1>
      <pre>{JSON.stringify(query, null, 4)}</pre>
    </Layout1>
  );
};

export default Insertion;
