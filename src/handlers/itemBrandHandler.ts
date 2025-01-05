import { Request, Response } from 'express';
import { readAll } from '../services/itemBrandService';

export const getAllItemBrand = async (_req: Request, res: Response) => {
  const result = await readAll();
  res
    .status(result.status)
    .json({ message: result.message, payload: result.payload });
};

// export const createItemBrand = (req: Request, res: Response) => {};

// export const updateItemBrand = (req: Request, res: Response) => {};

// export const deleteItemBrand = (req: Request, res: Response) => {};
