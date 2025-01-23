import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from '../config/prismaConfig';
import { CreateItemBrandDTO } from '../dtos/itemBrand/CreateItemBrandDTO';
import { DeleteItemBrandDTO } from '../dtos/itemBrand/DeleteItemBrandDTO';
import { GetItemBrandDTO } from '../dtos/itemBrand/GetItemBrandDTO';
import { UpdateItemBrandDTO } from '../dtos/itemBrand/UpdateItemBrandDTO';
import ItemBrandModel from '../models/itemBrandModel';
import { ApiResponse } from '../types/ApiResponse';
import { apiResponse } from '../utils/helpers';

export const readAll = async (): Promise<
  ApiResponse<GetItemBrandDTO[] | Error>
> => {
  try {
    const itemBrandList: GetItemBrandDTO[] = await prisma.itemBrand.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    if (itemBrandList.length <= 0) {
      return apiResponse(204, 'The item brand list is empty', itemBrandList);
    }

    return apiResponse(200, 'Successfuly read all item brands', itemBrandList);
  } catch (error) {
    console.error('Error on read all item brand: ', error);
    return apiResponse(500, 'Failed to read all item brands', error);
  }
};

export const create = async (
  data: CreateItemBrandDTO
): Promise<ApiResponse<CreateItemBrandDTO | Error>> => {
  try {
    const createItemBrand: ItemBrandModel = await prisma.itemBrand.create({
      data: {
        name: data.name,
      },
    });

    const newItemBrand: CreateItemBrandDTO = {
      id: createItemBrand.id,
      name: createItemBrand.name,
      createdAt: createItemBrand.created_at,
    };

    return apiResponse(201, 'Successfuly created new item brand', newItemBrand);
  } catch (error) {
    console.error('Error on create item brand: ', error);
    return apiResponse(500, 'Failed to create item brand', error);
  }
};
export const update = async (
  data: UpdateItemBrandDTO
): Promise<ApiResponse<UpdateItemBrandDTO | Error>> => {
  try {
    const updateItemBrand: ItemBrandModel = await prisma.itemBrand.update({
      data: {
        name: data.name,
      },
      where: {
        id: data.id,
      },
    });

    const updatedItemBrand: UpdateItemBrandDTO = {
      id: updateItemBrand.id,
      name: updateItemBrand.name,
      updatedAt: updateItemBrand.updated_at,
    };

    return apiResponse(200, 'Successfuly updated item brand', updatedItemBrand);
  } catch (error) {
    console.error('Error on update item brand: ', error);

    if (error instanceof PrismaClientKnownRequestError) {
      return apiResponse(404, 'Item brand not found', error);
    }

    return apiResponse(500, 'Failed to updating item brand', error);
  }
};

export const remove = async (
  id: number
): Promise<ApiResponse<DeleteItemBrandDTO | Error>> => {
  try {
    const deleteItemBrand: ItemBrandModel = await prisma.itemBrand.delete({
      where: {
        id: id,
      },
    });

    const deletedItemBrand: DeleteItemBrandDTO = {
      id: deleteItemBrand.id,
      name: deleteItemBrand.name,
    };

    return apiResponse(200, 'Successfuly deleted item brand', deletedItemBrand);
  } catch (error) {
    console.error('Error on removing item brand: ', error);

    if (error instanceof PrismaClientKnownRequestError) {
      return apiResponse(404, 'Item brand not found', error);
    }

    return apiResponse(500, 'Failed to delete item brand', error);
  }
};
