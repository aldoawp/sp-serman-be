import app from './app';
import { serverConfig } from './config/serverConfig';

const port = serverConfig.port;

app.listen(port, () => {
  console.log('server started at http://localhost:' + port);
});
