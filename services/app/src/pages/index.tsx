import React from 'react';
import { add } from '@project-shared/common';

const index: React.FC = () => {
  return (
    <div>
      <div>{add(1, 2, 3)}</div>
    </div>
  );
};

export default index;
