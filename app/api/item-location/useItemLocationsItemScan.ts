import { useGetRequest } from "../useGetRequest";

export type TItemLocationsItemScanResponse = {
  id: number;
  size: string | null;
  itemImageUrl: string;
  mCateSmall: {
    id: number;
    name: string;
  };
  mLocation: {
    id: number;
    name: string;
  } | null;
};

type TParams = {
  itemId: number;
};

export default function useItemLocationsItemScan(params: TParams) {
  const { data, error, isLoading, refetch } = useGetRequest<
    TItemLocationsItemScanResponse,
    TParams
  >({ path: "item_locations/item_scan", params: params });

  return { data, error, isLoading, refetch };
}
