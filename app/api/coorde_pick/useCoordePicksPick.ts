import { usePostRequest } from "../usePostRequest";

type TItemPickResponse = {
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
  targetItemId: number;
};

export default function useCoordePicksPick() {
  const { mutate, error, isLoading, isSuccess } = usePostRequest<
    TParams,
    TItemPickResponse
  >({ path: "coorde_picks/pick" });
  return { mutate, error, isLoading, isSuccess };
}
