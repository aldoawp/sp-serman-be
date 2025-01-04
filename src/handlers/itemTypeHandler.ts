import { Request, Response } from 'express';
import { create, read } from '../services/itemTypeService';
import { CreateItemTypeDTO } from '../dtos/itemType/CreateItemTypeDTO';
import { itemTypeSchema } from '../utils/validations/itemTypeValidation';

// Connect to supabase DB
// Create migration
// Populate DB
// Login api
// Require auth middleware

export const getAllItemType = (_req: Request, res: Response) => {
  const result = read();
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

export const updateItemType = (req: Request, res: Response) => {
  req;
  res.send();
};

export const deleteItemType = (req: Request, res: Response) => {
  req;
  res.send('Delete jenis barang');
};
