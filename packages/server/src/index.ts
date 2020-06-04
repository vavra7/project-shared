import express from 'express';
import { add } from '@project-shared/common';

const app = express();

app.get('/', (req, res) => {
  const a = add(1, 4, 4);

  res.send(`${a} asdfvf`);
});

app.listen(5000, () => console.log('Server started on port 5000'));
