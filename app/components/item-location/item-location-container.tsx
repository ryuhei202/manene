"use client";
import { TItemLocationsItemScanResponse } from "@/app/api/item-location/useItemLocationsItemScan";
import useItemLocationsMove from "@/app/api/item-location/useItemLocationsMove";
import { alertClosedWindow } from "@/app/service/shared/alert-close-window";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ScanButton from "../common/button/scan-button";
import LoadingDialog from "../common/dialog/loading-dialog";
import ItemList from "./item-list";
import ItemInfoFetcher from "./item-location-fetcher";

export default function ItemLocationContainer() {
  const [scannedItemId, setScannedItemId] = useState<number>();
  const [selectedItems, setSelectedItems] = useState<
    TItemLocationsItemScanResponse[]
  >([]);
  const [locationId, setLocationId] = useState<number>();

  const { mutate, isLoading } = useItemLocationsMove();

  const isItemSelected = (targetId: number): boolean => {
    return selectedItems.some((item) => item.id === targetId);
  };

  const handleScanItemId = (id: number) => {
    isItemSelected(id)
      ? alert("このアイテムは既に読み取り済みです")
      : setScannedItemId(id);
  };

  const handleClickOk = () => {
    if (locationId === undefined)
      throw new Error("棚移動に失敗しました。棚番号を正しく入力してください");
    mutate(
      {
        targetLocationId: locationId,
        itemIds: selectedItems.map((item) => item.id),
      },
      {
        onSuccess: () => {
          alert(`棚番号${locationId}に登録しました`);
          setSelectedItems([]);
        },
        onError: (e: AxiosError) => {
          alert(`登録に失敗しました ${e.request?.response}`);
        },
      }
    );
    setLocationId(undefined);
  };

  useEffect(() => {
    alertClosedWindow(!selectedItems);
  }, [selectedItems]);

  if (isLoading) return <LoadingDialog />;

  return (
    <>
      {scannedItemId && (
        <ItemInfoFetcher
          itemId={scannedItemId}
          onSetItem={(data: TItemLocationsItemScanResponse) =>
            setSelectedItems([...selectedItems, data])
          }
          onUnSetItemId={() => setScannedItemId(undefined)}
        />
      )}

      <ItemList selectedItems={selectedItems} />
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "90%",
          display: "flex",
          flexDirection: "column",
          left: "50%",
          transform: "translateX(-50%)",
          justifyContent: "center",
          gap: 2,
          marginBottom: "30px",
        }}
      >
        <ScanButton onScan={handleScanItemId} title="アイテムスキャン" />
        <ScanButton
          onScan={(id: number) => {
            setLocationId(id);
          }}
          title="棚移動"
          disabled={selectedItems.length < 1}
        />

        <Dialog open={locationId !== undefined} fullWidth>
          <DialogTitle>確認</DialogTitle>
          <DialogContent>
            <Typography>棚番: {locationId}</Typography>
            <Typography>に登録しますか？</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLocationId(undefined)}>キャンセル</Button>
            <Button
              onClick={handleClickOk}
              disabled={locationId === undefined && isLoading}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
