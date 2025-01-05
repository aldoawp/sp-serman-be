import { ApiResponse } from '../types/ApiResponse';
import { CreateItemTypeDTO } from '../dtos/itemType/CreateItemTypeDTO';
import { ItemTypeModel } from '../models/itemTypeModel';
import { GetItemTypeDTO } from '../dtos/itemType/GetItemTypeDTO';
import { prisma } from '../app';
import { DeleteItemTypeDTO } from '../dtos/itemType/DeleteItemTypeDTO';
import { UpdateItemTypeDTO } from '../dtos/itemType/UpdateItemTypeDTO';
import { apiResponse } from '../utils/helpers';

export const readAll = async (): Promise<ApiResponse<GetItemTypeDTO>> => {
  try {
    const itemTypesList: GetItemTypeDTO[] = await prisma.itemType.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    if (itemTypesList.length !== 0) {
      return apiResponse(200, 'Successfuly read all item types', itemTypesList);
    } else {
      return apiResponse(204, 'The list is empty', itemTypesList);
    }
  } catch (error) {
    return apiResponse(500, 'Failed to create item type.', error);
  }
};

export const create = async (
  data: CreateItemTypeDTO
): Promise<ApiResponse<ItemTypeModel>> => {
  try {
    const itemTypeData: ItemTypeModel = await prisma.itemType.create({
      data: {
        name: data.name,
      },
    });

    return apiResponse(201, 'New item type successfuly created', {
      id: itemTypeData.id,
      name: itemTypeData.name,
      created_at: itemTypeData.created_at,
      updated_at: itemTypeData.updated_at,
    });
  } catch (error) {
    return apiResponse(500, 'Failed to create item type', error);
  }
};

export const remove = async (
  id: number
): Promise<ApiResponse<DeleteItemTypeDTO>> => {
  try {
    const itemTypeData = await prisma.itemType.delete({
      where: {
        id: id,
      },
    });

    const response: DeleteItemTypeDTO = {
      id: itemTypeData.id,
      name: itemTypeData.name,
    };

    return apiResponse(200, 'Item successfuly deleted', response);
  } catch (error) {
    return apiResponse(500, 'Failed to delete item type', error);
  }
};

export const update = async (
  data: UpdateItemTypeDTO
): Promise<ApiResponse<UpdateItemTypeDTO>> => {
  try {
    const result: ItemTypeModel = await prisma.itemType.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        updated_at: new Date(),
      },
    });

    const response: UpdateItemTypeDTO = {
      id: result.id,
      name: result.name,
      updatedAt: result.updated_at,
    };

    return apiResponse(200, 'Update item type successful', response);
  } catch (error) {
    return apiResponse(500, 'Failed to update item type', error);
  }
};
