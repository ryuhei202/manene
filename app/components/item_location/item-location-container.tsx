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
  const [itemId, setItemId] = useState<number>();
  const [selectedItem, setSelectedItem] = useState<
    TItemLocationsItemScanResponse[]
  >([]);
  const [locationId, setLocationId] = useState<number>();

  const { mutate, isLoading } = useItemLocationsMove();

  const canAddSelectedItem = (targetId: number): boolean => {
    return selectedItem.some((item) => item.id === targetId);
  };

  const onScanItemId = (id: number) => {
    canAddSelectedItem(id)
      ? alert("このアイテムは既に読み取り済みです")
      : setItemId(id);
  };

  const onClickOk = () => {
    if (locationId === undefined)
      throw new Error("棚移動に失敗しました。棚番号を正しく入力してください");
    mutate(
      {
        targetLocationId: locationId,
        itemIds: selectedItem.map((item) => item.id),
      },
      {
        onSuccess: () => {
          alert(`棚番号${locationId}に登録しました`);
          setSelectedItem([]);
        },
        onError: (e: AxiosError) => {
          alert(`登録に失敗しました ${e.request?.response}`);
        },
      }
    );
    setLocationId(undefined);
  };

  useEffect(() => {
    alertClosedWindow(!selectedItem);
  }, [selectedItem]);

  if (isLoading) return <LoadingDialog />;

  return (
    <>
      {itemId && (
        <ItemInfoFetcher
          itemId={itemId}
          onSetItem={(data: TItemLocationsItemScanResponse) =>
            setSelectedItem([...selectedItem, data])
          }
          onUnSetItemId={() => setItemId(undefined)}
        />
      )}

      <ItemList selectedItems={selectedItem} />
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
        <ScanButton onScan={onScanItemId} title="アイテムスキャン" />
        <ScanButton
          onScan={(id: number) => {
            setLocationId(id);
          }}
          title="棚移動"
          disabled={selectedItem.length < 1}
        />

        {locationId && (
          <Dialog open fullWidth>
            <DialogTitle>確認</DialogTitle>
            <DialogContent>
              <Typography>棚版: {locationId}</Typography>
              <Typography>に登録しますか？</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setLocationId(undefined)}>
                キャンセル
              </Button>
              <Button
                onClick={onClickOk}
                disabled={locationId === undefined && isLoading}
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </>
  );
}
