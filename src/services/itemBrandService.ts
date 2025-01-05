import prisma from '../config/prismaConfig';
import { GetItemBrandDTO } from '../dtos/itemBrand/GetItemBrandDTO';
import { ApiResponse } from '../types/ApiResponse';
import { apiResponse } from '../utils/helpers';

export const readAll = async (): Promise<ApiResponse<GetItemBrandDTO>> => {
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
    return apiResponse(500, 'Failed to read all item brands', error);
  }
};
// export const create = () => {};
// export const remove = () => {};
// export const update = () => {};
