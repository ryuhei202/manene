import { useGetRequest } from "../useGetRequest";

type TCoordePicksIndexResponse = {
  id: number;
  size: string;
  item_image_url: string;
  mCateSmallName: string;
  mColorName: string;
  mBrandName: string;
  mLocationName: string;
  isPicked: boolean;
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
