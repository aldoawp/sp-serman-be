import { Request, Response } from 'express';
import { create, read, remove, update } from '../services/itemTypeService';
import { CreateItemTypeDTO } from '../dtos/itemType/CreateItemTypeDTO';
import { itemTypeSchema } from '../utils/validations/itemTypeValidation';
import { DeleteItemTypeDTO } from '../dtos/itemType/DeleteItemTypeDTO';
import { ApiResponse } from '../types/ApiResponse';
import { UpdateItemTypeDTO } from '../dtos/itemType/UpdateItemTypeDTO';

// Login api
// Require auth middleware

export const getAllItemType = async (_req: Request, res: Response) => {
  const result = await read();
  res.status(result.status).json({
    message: result.message,
    payload: result.payload,
  });
};

export const createItemType = async (req: Request, res: Response) => {
  try {
    const validatedRequest: CreateItemTypeDTO = itemTypeSchema.parse(req.body);
    const result = await create(validatedRequest);
    res
      .status(result.status)
      .json({ message: result.message, payload: result.payload });
  } catch (error) {
    res.status(400).json({ message: 'Request validation error', error: error });
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
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Request validation error', payload: error });
  }
};

export const deleteItemType = async (req: Request, res: Response) => {
  const id: number = Number(req.params['id']);

  const result: ApiResponse<DeleteItemTypeDTO> = await remove(id);
  res.status(result.status).json({
    message: result.message,
    payload: result.payload,
  });
};
