import { usePatchRequest } from "../usePatchRequest";
import { TInspectingItemsShowResponse as TInspectingItemsCompleteWashing } from "./fetchInspectingItemsShow";

type TParams = {
  id: number;
};
export default function useInspectingItemsCompleteWashing(params: TParams) {
  const { mutate, error, isLoading, isSuccess } = usePatchRequest<
    TParams,
    TInspectingItemsCompleteWashing
  >({ path: `inspection/inspecting_items/${params.id}/complete_washing` });

  return { mutate, error, isLoading, isSuccess };
}
