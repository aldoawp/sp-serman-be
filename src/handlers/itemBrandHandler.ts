import { Request, Response } from 'express';
import { readAll } from '../services/itemBrandService';
import redisClient from '../config/redisConfig';

export const getAllItemBrand = async (_req: Request, res: Response) => {
  try {
    const cacheKey = 'allItemBrand';

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log('CACHE HIT: get all item brands');
      res.status(200).json({
        message: 'Successfuly fetch all item brands',
        payload: JSON.parse(cachedData),
      });
      return;
    }

    const result = await readAll();

    if (result.status != 200) {
      console.log('Unsuccessful to get all item types');
      res
        .status(result.status)
        .json({ message: result.message, payload: result.payload });
      return;
    }

    await redisClient.set(cacheKey, JSON.stringify(result.payload), {
      EX: 86400,
    });

    res
      .status(result.status)
      .json({ message: result.message, payload: result.payload });
    return;
  } catch (error) {
    console.error('Error getting all item brand: ', error);
    res.status(500).json({ message: 'Internal Server Error', payload: error });
  }
};

// export const createItemBrand = (req: Request, res: Response) => {};

// export const updateItemBrand = (req: Request, res: Response) => {};

// export const deleteItemBrand = (req: Request, res: Response) => {};
