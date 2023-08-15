import getNoCacheData from "../getNoCacheData";
import { TItemLocationsItemScanResponse } from "../item-location/useItemLocationsItemScan";

export type TStocktakingsLocationsShowResponse = {
  id: number;
  mLocationId: number;
  mLocationName: string;
  allItems: TItemLocationsItemScanResponse[];
  unscannedItems?: TItemLocationsItemScanResponse[];
  matchedItems?: TItemLocationsItemScanResponse[];
  mismatchingItems?: TItemLocationsItemScanResponse[];
  status: 0 | 2;
};

type TParams = {
  id: number;
};

export default async function getStocktakingsLocationsShow(params: TParams) {
  return await getNoCacheData<TStocktakingsLocationsShowResponse>({
    path: `stocktaking_locations/${params.id}`,
  });
}
