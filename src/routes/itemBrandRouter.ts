import { Router } from 'express';
import {
  // createItemBrand,
  // deleteItemBrand,
  getAllItemBrand,
  // updateItemBrand,
} from '../handlers/itemBrandHandler';

const router = Router();

router.get('/', getAllItemBrand);
// router.post('/', createItemBrand);
// router.put('/:id', updateItemBrand);
// router.delete('/:id', deleteItemBrand);

export default router;
