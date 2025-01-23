import { Request, Response } from 'express';
import { create, readAll, remove, update } from '../services/itemTypeService';
import { CreateItemTypeDTO } from '../dtos/itemType/CreateItemTypeDTO';
import { itemTypeSchema } from '../utils/validations/itemTypeValidation';
import { DeleteItemTypeDTO } from '../dtos/itemType/DeleteItemTypeDTO';
import { ApiResponse } from '../types/ApiResponse';
import { UpdateItemTypeDTO } from '../dtos/itemType/UpdateItemTypeDTO';
import redisClient from '../config/redisConfig';

// Login api
// Require auth middleware

export const getAllItemType = async (_req: Request, res: Response) => {
  try {
    const cacheKey = 'allItemTypes';
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('CACHE HIT: get all item types');
      res.status(200).json({
        message: 'Successfuly get all item types',
        payload: JSON.parse(cachedData),
      });
      return;
    }

    const result = await readAll();
    if (result.status != 200) {
      res
        .status(result.status)
        .json({ message: result.message, payload: result.payload });
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
    console.error('Error getting all item types: ', error);
    res.status(500).json({ message: 'Internal server error', payload: error });
  }
};

export const createItemType = async (req: Request, res: Response) => {
  try {
    const validatedRequest: CreateItemTypeDTO = itemTypeSchema.parse(req.body);
    const result = await create(validatedRequest);
    res
      .status(result.status)
      .json({ message: result.message, payload: result.payload });
    return;
  } catch (error) {
    console.error('Request validation error: ', error);
    res.status(400).json({ message: 'Request validation error', error: error });
    return;
  }
};

export const updateItemType = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params['id']);
    const validatedRequest: UpdateItemTypeDTO = itemTypeSchema.parse(req.body);

    const updatedData: UpdateItemTypeDTO = {
      id: id,
      name: validatedRequest.name,
    };

    const result: ApiResponse<UpdateItemTypeDTO> = await update(updatedData);

    res.status(result.status).json({
      message: result.message,
      payload: result.payload,
    });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Request validation error', payload: error });
    return;
  }
};

export const deleteItemType = async (req: Request, res: Response) => {
  const id: number = Number(req.params['id']);

  const result: ApiResponse<DeleteItemTypeDTO> = await remove(id);
  res.status(result.status).json({
    message: result.message,
    payload: result.payload,
  });
  return;
};
