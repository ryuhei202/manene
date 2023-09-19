import { usePostRequest } from "../usePostRequest";

type TParams = {
  mCleaningCategoryId: number;
  tItemIds: number[];
  cost: number;
};

export default function useCleaningCostsCreate() {
  const { mutate, error, isLoading, isSuccess } = usePostRequest<TParams>({
    path: `cleaning_costs`
  });
  return { mutate, error, isLoading, isSuccess };
}
