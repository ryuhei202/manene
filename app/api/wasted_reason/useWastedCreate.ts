import { usePostRequest } from "../usePostRequest";

type TParams = {
  itemId: number;
  wasted_reason: {
    wastedReasonTypeId: number;
    wastedReasonPartIds: number[];
  }[];
};

export default function useWastedCreate(itemId: number) {
  const { mutate, error, isLoading, isSuccess } = usePostRequest<TParams>({
    path: `items/${itemId}}/wasted_reason`,
  });
  return { mutate, error, isLoading, isSuccess };
}
