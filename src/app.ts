import express from 'express';
import itemTypeRouter from './routes/itemTypeRouter';

const app = express();

app.use(express.json());

// Item type API endpoint
app.use('/api/v1/item-type', itemTypeRouter);

export default app;
