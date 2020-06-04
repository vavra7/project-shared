import express from 'express';
// import { add } from '@project-shared/shared';

const app = express();

app.get('/', (req, res) => {
  // const a = add(1, 4, 4);

  // res.send(`${a} asdfvf`);
  res.send(`asdkghfvf`);
});

app.listen(5000, () => console.log('Server started on port 5000'));
