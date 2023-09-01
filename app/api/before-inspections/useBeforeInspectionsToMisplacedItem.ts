import { usePatchRequest } from "../usePatchRequest";
import { TChart as TBeforeInspectionsToMisplacedItemResponse } from "./useBeforeInspectionsCreate";

type TParams = {
  chartItemId: number;
};
export default function useBeforeInspectionsToMisplacedItem() {
  const { mutate, error, isLoading, isSuccess } = usePatchRequest<
    TParams,
    TBeforeInspectionsToMisplacedItemResponse
  >({
    path: "inspection/before_inspections/to_misplaced_item",
  });

  return { mutate, error, isLoading, isSuccess };
}
