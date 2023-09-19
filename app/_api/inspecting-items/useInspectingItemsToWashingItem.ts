import { usePatchRequest } from "../usePatchRequest";
import { TInspectingItemsShowResponse as TInspectingItemsToWashingItem } from "./fetchInspectingItemsShow";

type TParams = {
  id: number;
};
export default function useInspectingItemsToWashingItem(params: TParams) {
  const { mutate, error, isLoading, isSuccess } = usePatchRequest<
    TParams,
    TInspectingItemsToWashingItem
  >({ path: `inspection/inspecting_items/${params.id}/to_washing_item` });

  return { mutate, error, isLoading, isSuccess };
}
