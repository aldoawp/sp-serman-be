import { ApiResponse } from '../types/ApiResponse';
import { CreateItemTypeDTO } from '../dtos/itemType/CreateItemTypeDTO';
import { ItemTypeModel } from '../models/itemTypeModel';
import { GetItemTypeDTO } from '../dtos/itemType/GetItemTypeDTO';
import { prisma } from '../app';

// Simulate DB
const currentDate = new Date();
export let itemTypes: ItemTypeModel[] = [
  {
    id: 'id1',
    name: 'Aldo Arista',
    created_at: currentDate,
    updated_at: currentDate,
  },
  {
    id: 'id2',
    name: 'Budi Santoso',
    created_at: currentDate,
    updated_at: currentDate,
  },
];

const apiResponse = (
  statusCode: number,
  message: string,
  payload: unknown
): ApiResponse<any> => ({
  status: statusCode,
  message: message,
  payload: payload,
});

export const create = async (data: CreateItemTypeDTO) => {
  try {
    const itemTypeData = await prisma.itemType.create({
      data: {
        name: data.name,
      },
    });

    return apiResponse(201, 'New item type successfuly created', {
      id: itemTypeData.id,
      name: data.name,
      created_at: itemTypeData.created_at,
      updated_at: itemTypeData.updated_at,
    });
  } catch (error) {
    return apiResponse(500, 'Failed to create item type', error);
  }
};

export const read = () => {
  try {
    const allItemTypes: GetItemTypeDTO[] = itemTypes.map((val) => {
      return { id: val.id, name: val.name };
    });
    return apiResponse(200, 'Successfuly read all item types', allItemTypes);
  } catch (error) {
    return apiResponse(500, 'Failed to create item type.', error);
  }
};
