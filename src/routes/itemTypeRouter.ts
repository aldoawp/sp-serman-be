import { Router } from 'express';
import {
  createItemType,
  deleteItemType,
  getAllItemType,
  updateItemType,
} from '../handlers/itemTypeHandler';

const router = Router();

router.get('/', getAllItemType);
router.post('/', createItemType);
router.put('/:id', updateItemType);
router.delete('/:id', deleteItemType);

export default router;
