import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import itemTypeRouter from './routes/itemTypeRouter';

export const prisma = new PrismaClient();
dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/v1/item-type', itemTypeRouter);

export default app;
