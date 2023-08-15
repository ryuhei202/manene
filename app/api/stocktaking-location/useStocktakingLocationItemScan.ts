import { usePutRequest } from "../usePutRequest";
import { TStocktakingsLocationsShowResponse } from "./getStocktakingLocationsShow";

type TStocktakingLocationItemScan = {
  stocktakingLocationResponse: TStocktakingsLocationsShowResponse;
  isMismatched: boolean;
};

type TParams = {
  id: number;
  scannedItemId: number;
};
export default function useStocktakingLocationItemScan(params: TParams) {
  const { mutate, error, isLoading } = usePutRequest<
    TParams,
    TStocktakingLocationItemScan
  >({ path: `stocktaking_locations/${params.id}/item_scan`, params: params });
  return { mutate, error, isLoading };
}
