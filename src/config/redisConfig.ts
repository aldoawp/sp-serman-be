import { createClient } from 'redis';

export const redisClient = createClient();

redisClient.on('error', (err) => console.log('Redis Client Error: ', err));

const initRedis = async () => {
  await redisClient.connect();
};

initRedis();
