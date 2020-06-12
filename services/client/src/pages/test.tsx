import { NextPage } from 'next';
import Link from 'next/link';

const test: NextPage = () => {
  return (
    <div>
      <Link href="/">
        <a>index</a>
      </Link>
      <div>test page</div>
    </div>
  );
};

export default test;
