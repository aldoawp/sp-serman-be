import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import { PrismaClient } from '@prisma/client';
// import { createClient } from 'redis';
import itemTypeRouter from './routes/itemTypeRouter';
import itemBrandRouter from './routes/itemBrandRouter';

dotenv.config();
const app = express();
export const prisma = new PrismaClient();
// export const redisClient = createClient();
// redisClient.on('error', (err) => console.log('Redis Client Error: ', err));
// const initRedis = async () => {
//   // await redisClient.connect();
// };
// initRedis();

app.use(express.json());
app.use(compression());

app.use('/api/v1/item-type', itemTypeRouter);
app.use('/api/v1/item-brand', itemBrandRouter);

export default app;
