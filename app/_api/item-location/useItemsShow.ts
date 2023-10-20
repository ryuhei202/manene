import { TGetItemsShow, TParams } from '../../../types/types';
import { useGetRequest } from '../useGetRequest';

export default function useItemsShow(params: TParams) {
  const { id } = params;
  const { data, error, isLoading } = useGetRequest<TGetItemsShow, TParams>({
    path: `items/${id}`,
    params,
  });
  return { data, error, isLoading };
}
