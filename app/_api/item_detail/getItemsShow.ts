import { TGetItemsShow, TParams } from '../../../types/types';
import getNoCacheData from '../getNoCacheData';

export default async function getItemsShow(params: TParams) {
  return await getNoCacheData<TGetItemsShow>({
    path: `items/${params.id}`,
  });
}
