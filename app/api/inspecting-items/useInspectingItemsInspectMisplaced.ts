import { usePatchRequest } from "../usePatchRequest";
import { TInspectingItemsShowResponse as TInspectingItemsInspectMisplaced } from "./fetchInspectingItemsShow";

type TParams = {
  id: number;
};
export default function useInspectingItemsInspectMisplaced(params: TParams) {
  const { mutate, error, isLoading, isSuccess } = usePatchRequest<
    TParams,
    TInspectingItemsInspectMisplaced
  >({ path: `inspection/inspecting_items/${params.id}/inspect_misplaced` });

  return { mutate, error, isLoading, isSuccess };
}
