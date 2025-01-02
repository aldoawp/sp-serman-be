import { Router } from 'express';
import {
  createItemType,
  deleteItemType,
  getAllItemType,
  updateItemType,
} from '../handlers/itemTypeHandler';
import { itemTypeValidationRules } from '../utils/validations';

const router = Router();

router.get('/', getAllItemType);
router.post('/', itemTypeValidationRules, createItemType);
router.put('/:id', updateItemType);
router.delete('/:id', deleteItemType);

export default router;
