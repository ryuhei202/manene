import { usePostRequest } from "../usePostRequest";

type TItemsValidateBulkUpdateStatusResponse = {
  notExistIds: number[],
};

type TParams = {
  status: number;
  itemIds: number[];
};

export default function useItemsValidateBulkUpdateStatus() {
  const { mutate, error, isLoading, isSuccess } = usePostRequest<
  TParams,
  TItemsValidateBulkUpdateStatusResponse>({ path: "items/validate_bulk_update_status"});

  return { mutate, error, isLoading, isSuccess };
}
