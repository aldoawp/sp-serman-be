import express from 'express';
import compression from 'compression';
import itemTypeRouter from './routes/itemTypeRouter';
import itemBrandRouter from './routes/itemBrandRouter';

const app = express();

app.use(express.json());
app.use(compression());

app.use('/api/v1/item-type', itemTypeRouter);
app.use('/api/v1/item-brand', itemBrandRouter);

export default app;
