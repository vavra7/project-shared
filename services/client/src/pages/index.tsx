import React from 'react';
import { add } from '@project-shared/shared';

const index: React.FC = () => {
  return (
    <div>
      <div>{add(1, 2, 4)} test</div>
    </div>
  );
};

export default index;
