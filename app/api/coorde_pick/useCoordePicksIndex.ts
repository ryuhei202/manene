import { useGetRequest } from "../useGetRequest";

type TCoordePicksIndexResponse = {
  id: number;
  size: string;
  item_image_url: string;
  m_cate_small_name: string;
  m_color_name: string;
  m_brand_name: string;
  m_location_name: string;
  is_picked: boolean;
}[];

type TParams = {
  tChartId: number;
};

export default function useCoordePicksIndex(params: TParams) {
  const { data, error, isLoading } = useGetRequest<
    TCoordePicksIndexResponse,
    { tChartId: number }
  >({ path: "coorde_picks", params: params });

  return { data, error, isLoading };
}
