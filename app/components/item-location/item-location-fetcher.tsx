"use client";
import useItemLocationsItemScan, {
  TItemLocationsItemScanResponse,
} from "@/app/api/item-location/useItemLocationsItemScan";
import { useEffect } from "react";
import LoadingDialog from "../common/dialog/loading-dialog";

type TProps = {
  itemId: number;
  onSetItem: (data: TItemLocationsItemScanResponse) => void;
  onUnSetItemId: () => void;
};

export default function ItemInfoFetcher({
  itemId,
  onSetItem,
  onUnSetItemId,
}: TProps) {
  const { data, isLoading, error } = useItemLocationsItemScan({
    itemId: itemId,
  });

  useEffect(() => {
    if (data) {
      onSetItem(data);
      onUnSetItemId();
    }
  }, [data, onSetItem, onUnSetItemId]);

  if (error) {
    alert(error.message);
  }
  if (isLoading || !data) return <LoadingDialog />;
  return <></>;
}
