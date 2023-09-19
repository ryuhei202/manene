import { usePutRequest } from "../usePutRequest";
import { TStocktakingsLocationsShowResponse } from "./getStocktakingLocationsShow";

type TStocktakingLocationItemScanResponse = {
  stocktakingLocationResponse: TStocktakingsLocationsShowResponse;
  isMismatched: boolean;
};

type TParams = {
  id: number;
  scannedItemId: number;
};

export default function useStocktakingLocationItemScan(
  params: Pick<TParams, "id">
) {
  const { mutate, error, isLoading } = usePutRequest<
    TParams,
    TStocktakingLocationItemScanResponse
  >({ path: `stocktaking_locations/${params.id}/item_scan` });
  return { mutate, error, isLoading };
}
