import { useGetRequest } from "../useGetRequest";

export type TCoordePicksIndexResponse = {
  id: number;
  size: string;
  itemImageUrl: string;
  mCateSmallName: string;
  mColorName: string;
  mBrandName: string;
  mLocationName: string;
  isPicked: boolean;
};

type TParams = {
  tChartId: number;
};

export default function useCoordePicksIndex(params: TParams) {
  const { data, error, isLoading } = useGetRequest<
    TCoordePicksIndexResponse[],
    { tChartId: number }
  >({ path: "coorde_picks", params: params });

  return { data, error, isLoading };
}
