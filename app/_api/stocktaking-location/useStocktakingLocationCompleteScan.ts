import { usePutRequest } from "../usePutRequest";

type TParams = {
  id: number;
};

export default function useStocktakingLocationCompleteScan(params: TParams) {
  const { mutate, error, isLoading } = usePutRequest({
    path: `stocktaking_locations/${params.id}/complete_scan`,
  });
  return { mutate, error, isLoading };
}
