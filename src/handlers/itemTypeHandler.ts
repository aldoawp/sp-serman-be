import { Request, Response } from 'express';
import { ItemTypeModel } from '../models/itemTypeModel';
import { itemTypes } from '../services/itemTypeService';
const { validationResult } = require('express-validator');

export const getAllItemType = (req: Request, res: Response) => {
  try {
    // const jenisBarangList: JenisBarang[] = jenisBarangs;
    res.status(200).json(req.headers.authorization);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createItemType = (req: Request, res: Response) => {
  const validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    res.status(400).json({ errors: validationError.array() });
    return;
  }

  const jenisBarang: ItemTypeModel = {
    id: `id${itemTypes.length + 1}`,
    name: req.body.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  itemTypes.push(jenisBarang);
  res.status(201).json(itemTypes);
};

export const updateItemType = (req: Request, res: Response) => {
  req;
  res.send();
};

export const deleteItemType = (req: Request, res: Response) => {
  req;
  res.send('Delete jenis barang');
};
