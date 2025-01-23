import express from 'express';
import compression from 'compression';
import cors from 'cors';
import itemTypeRouter from './routes/itemTypeRouter';
import itemBrandRouter from './routes/itemBrandRouter';
import corsOption from './config/corsConfig';

const app = express();

app.use(express.json());
app.use(compression());
app.use(cors(corsOption));

app.use('/api/v1/item-type', itemTypeRouter);
app.use('/api/v1/item-brand', itemBrandRouter);
app.use('/api/v1/auth', )

export default app;
