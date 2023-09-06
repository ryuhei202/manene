"use client";
import { TInspectingItem } from "@/app/api/inspecting-items/fetchInspectingItemsShow";
import useInspectingItemsCompleteWashing from "@/app/api/inspecting-items/useInspectingItemsCompleteWashing";
import useInspectingItemsInspectMisplaced from "@/app/api/inspecting-items/useInspectingItemsInspectMisplaced";
import useInspectingItemsToWashingItem from "@/app/api/inspecting-items/useInspectingItemsToWashingItem";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { INSPECTION_STATUS } from "../common/Item/item-info-card";
import DisableBackDialog from "../common/dialog/disable-back-dialog";
import LoadingDialog from "../common/dialog/loading-dialog";

type TProps = {
  scannedInspectingItem: TInspectingItem;
  onClickPurchaseRequestOpen: () => void;
  onSetInspectingItem: (inspectingItem: TInspectingItem) => void;
};
export default function InspectingItemsSender({
  scannedInspectingItem,
  onClickPurchaseRequestOpen,
  onSetInspectingItem,
}: TProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate: toWashingMutate, isLoading: isToWashingLoading } =
    useInspectingItemsToWashingItem({
      id: scannedInspectingItem.id,
    });
  const { mutate: completeWashingMutate, isLoading: isCompleteWashingLoading } =
    useInspectingItemsCompleteWashing({
      id: scannedInspectingItem.id,
    });
  const {
    mutate: inspectMisplacedMutate,
    isLoading: isInspectMisplacedLoading,
  } = useInspectingItemsInspectMisplaced({
    id: scannedInspectingItem.id,
  });

  const handleClickToWashing = () => {
    toWashingMutate(undefined, {
      onSuccess(response) {
        onSetInspectingItem(response.data.tInspectionItem);
      },
      onError(error: AxiosError) {
        alert(
          `汚れ確認中登録に失敗しました。 ${
            (error.response?.data as { message: string })?.message
          }`
        );
      },
    });
  };

  const handleClickCompleteWashing = () => {
    completeWashingMutate(undefined, {
      onSuccess(response) {
        onSetInspectingItem(response.data.tInspectionItem);
        setIsOpen(false);
      },
      onError(error: AxiosError) {
        alert(
          `汚れ確認中登録に失敗しました。 ${
            (error.response?.data as { message: string })?.message
          }`
        );
      },
    });
  };

  const handleClickInspectMisplaced = () => {
    inspectMisplacedMutate(undefined, {
      onSuccess(response) {
        onSetInspectingItem(response.data.tInspectionItem);
      },
      onError(error: AxiosError) {
        alert(`即時検品に失敗しました。 ${error}`);
      },
    });
  };

  return (
    <>
      <LoadingDialog
        isOpen={
          isToWashingLoading ||
          isCompleteWashingLoading ||
          isInspectMisplacedLoading
        }
      />
      <Box display="flex" justifyContent="center">
        {![
          INSPECTION_STATUS.INSPECTED as number,
          INSPECTION_STATUS.MISPLACED as number,
          INSPECTION_STATUS.PURCHASE_REQUEST as number,
          INSPECTION_STATUS.PURCHASE_CANDIDATE as number,
        ].includes(scannedInspectingItem.status) && (
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width="90%"
            justifyContent="center"
          >
            {scannedInspectingItem.status === INSPECTION_STATUS.WASHING ? (
              <Button
                onClick={() => setIsOpen(true)}
                variant="contained"
                sx={{ bgcolor: "secondary.dark" }}
                disabled={isToWashingLoading}
              >
                汚れ確認中を解除する
              </Button>
            ) : (
              <Button variant="contained" onClick={handleClickToWashing}>
                汚れ確認中にする
              </Button>
            )}
            <Button
              onClick={onClickPurchaseRequestOpen}
              variant="contained"
              sx={{ bgcolor: "warning.dark" }}
            >
              買取依頼
            </Button>
          </Box>
        )}
        {scannedInspectingItem.status === INSPECTION_STATUS.MISPLACED &&
          scannedInspectingItem.isChartInspected && (
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              width="90%"
              justifyContent="center"
            >
              <Button
                variant="contained"
                onClick={handleClickInspectMisplaced}
                disabled={isInspectMisplacedLoading}
              >
                即時検品
              </Button>
              <Button
                onClick={onClickPurchaseRequestOpen}
                variant="contained"
                sx={{ bgcolor: "warning.dark" }}
              >
                買取依頼
              </Button>
            </Box>
          )}
      </Box>
      <DisableBackDialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>汚れ確認中を解除</DialogTitle>
        <DialogContent>
          汚れ確認中を解除しますか？
          <br />
          所属グループが検品済みの場合、このアイテムはすぐに検品済みでになります。
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>キャンセル</Button>
          <Button
            onClick={handleClickCompleteWashing}
            disabled={isCompleteWashingLoading}
          >
            OK
          </Button>
        </DialogActions>
      </DisableBackDialog>
    </>
  );
}
