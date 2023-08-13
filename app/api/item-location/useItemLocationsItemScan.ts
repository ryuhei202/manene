import { useGetRequest } from "../useGetRequest";

export type TItemMaster = {
  id: number;
  name: string;
};

export type TItemLocationsItemScanResponse = {
  id: number;
  size?: string;
  itemImageUrl: string;
  m_cate_small: TItemMaster;
  m_location?: TItemMaster;
};

type TParams = {
  itemId: number;
};

export default function useItemLocationsItemScan(params: TParams) {
  const { data, error, isLoading } = useGetRequest<
    TItemLocationsItemScanResponse,
    TParams
  >({ path: "item_locations/item_scan", params });

  return { data, error, isLoading };
}
