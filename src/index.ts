import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  fetch('https://fake-json-api.mock.beeceptor.com/users')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.send(data);
      console.log(
        'Data successfuly sent with status: ' +
          res.statusCode +
          ' ' +
          res.statusMessage
      );
    })
    .catch((error) => {
      console.log('Error: ', error);
      res.status(500).send('Internal server error');
    });
  req;
});

app.listen(port, () => {
  console.log('server started at http://localhost:' + port);
});
