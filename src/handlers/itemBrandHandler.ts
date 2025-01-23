import { Request, Response } from 'express';
import { create, readAll, remove, update } from '../services/itemBrandService';
import redisClient from '../config/redisConfig';
import { ApiResponse } from '../types/ApiResponse';
import { GetItemBrandDTO } from '../dtos/itemBrand/GetItemBrandDTO';
import { itemBrandSchema } from '../utils/validations/itemBrandValidation';
import { CreateItemBrandDTO } from '../dtos/itemBrand/CreateItemBrandDTO';
import { UpdateItemBrandDTO } from '../dtos/itemBrand/UpdateItemBrandDTO';
import { DeleteItemBrandDTO } from '../dtos/itemBrand/DeleteItemBrandDTO';

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

    const result: ApiResponse<GetItemBrandDTO[] | Error> = await readAll();

    if (result.status != 200) {
      console.log('Unsuccessful to get all item types');
      res.status(result.status).json({
        message: result.message,
        payload: result.payload,
      });
      return;
    }

    await redisClient.set(cacheKey, JSON.stringify(result.payload), {
      EX: 86400,
    });

    res.status(result.status).json({
      message: result.message,
      payload: result.payload,
    });
    return;
  } catch (error) {
    console.error('Error getting all item brand: ', error);
    res.status(500).json({
      message: 'Internal Server Error',
      payload: error,
    });
    return;
  }
};

export const createItemBrand = async (req: Request, res: Response) => {
  try {
    const validatedRequest: CreateItemBrandDTO = itemBrandSchema.parse(
      req.body
    );

    const result: ApiResponse<CreateItemBrandDTO | Error> =
      await create(validatedRequest);

    res.status(result.status).json({
      message: result.message,
      payload: result.payload,
    });
    return;
  } catch (error) {
    console.error('Error on create item brand: ', error);
    res.status(400).json({
      message: 'Request validation error',
      payload: error,
    });
    return;
  }
};

export const updateItemBrand = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params['id']);
    const validatedRequest: UpdateItemBrandDTO = itemBrandSchema.parse(
      req.body
    );

    const updatedData: UpdateItemBrandDTO = {
      id: id,
      name: validatedRequest.name,
    };

    const result = await update(updatedData);

    res.status(result.status).json({
      message: result.message,
      payload: result.payload,
    });
    return;
  } catch (error) {
    console.error('Error: ', error);
    res.status(400).json({
      message: 'Validation Error',
      payload: error,
    });
    return;
  }
};

export const deleteItemBrand = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const result: ApiResponse<DeleteItemBrandDTO | Error> = await remove(id);
  res.status(result.status).json({
    message: result.message,
    payload: result.payload,
  });
  return;
};
