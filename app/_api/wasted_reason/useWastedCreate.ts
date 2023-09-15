import { usePostRequest } from "../usePostRequest";

type TParams = {
  itemId: number;
  wastedReason: {
    wastedReasonTypeId: number;
    wastedReasonPartIds: number[];
  }[];
};

export default function useWastedCreate(params: Pick<TParams, "itemId">) {
  const { mutate, error, isLoading, isSuccess } = usePostRequest<
    Omit<TParams, "itemId">
  >({
    path: `items/${params.itemId}/wasted_reason`,
  });
  return { mutate, error, isLoading, isSuccess };
}
