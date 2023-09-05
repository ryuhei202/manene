import { usePatchRequest } from "../usePatchRequest";
import { TInspectingItem } from "./fetchInspectingItemsShow";

export type TImage = {
  imageData: string;
  imageFileName: string;
};

type TInspectingItemsToPurchaseItemResponse = {
  encloseItemId: number;
  inspectingItem: TInspectingItem;
};

type TParams = {
  id: number;
  memo: string;
  images: TImage[];
  purchaseRequestReason: number;
};
export default function useInspectingItemsToPurchaseItem(
  params: Pick<TParams, "id">
) {
  const { mutate, error, isLoading, isSuccess } = usePatchRequest<
    Omit<TParams, "id">,
    TInspectingItemsToPurchaseItemResponse
  >({ path: `inspection/inspecting_items/${params.id}/to_purchase_item` });

  return { mutate, error, isLoading, isSuccess };
}
