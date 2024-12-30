import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  req;
  res.send('Test');
});

app.listen(port, () => {
  console.log('server started at http://localhost:' + port);
});
