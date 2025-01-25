import express from 'express';
import compression from 'compression';
import cors from 'cors';
import itemTypeRouter from './routes/itemTypeRouter';
import itemBrandRouter from './routes/itemBrandRouter';
import authRouter from './routes/authRouter';
import corsOption from './config/corsConfig';
import validateAuth from './middleware/authMiddleware';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(cors(corsOption));

app.use('/api/v1/item-type', validateAuth, itemTypeRouter);
app.use('/api/v1/item-brand', validateAuth, itemBrandRouter);
app.use('/api/v1/auth', authRouter);

export default app;
