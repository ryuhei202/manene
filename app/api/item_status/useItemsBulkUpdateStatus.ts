import { usePostRequest } from "../usePostRequest";

type TParams = {
  status: number;
  itemIds: number[];
};

export default function useItemsBulkUpdateStatus() {
  const { mutate, error, isLoading, isSuccess } = usePostRequest<TParams>({
    path: "items/bulk_update_status"
  });
  return { mutate, error, isLoading, isSuccess };
}
