"use client";
import fetchInspectingItemsShow, {
  TInspectingItem,
} from "@/app/api/inspecting-items/fetchInspectingItemsShow";
import { TImage } from "@/app/api/inspecting-items/useInspectingItemsToPurchaseItem";
import { Alert, Box, SelectChangeEvent, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import ItemCard from "../common/Item/item-card";
import ItemInfoCard, { INSPECTION_STATUS } from "../common/Item/item-info-card";
import QrCodeReader from "../common/barcode/qr-code-reader";
import ChartCard from "../common/card/chart-card";
import DisableBackDialog from "../common/dialog/disable-back-dialog";
import Header from "../common/pages/header";
import InspectingItemsSender from "./inspecting-items-sender";
import PurchaseRequestForm from "./purchase-request-form";

export default function InspectionItemsContainer() {
  const [selectedImages, setSelectedImages] = useState<TImage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [requestReason, setRequestReason] = useState<number>();
  const [scannedInspectingItem, setScannedInspectingItem] =
    useState<TInspectingItem>();
  const [encloseItemId, setEncloseItemId] = useState<number>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const statusText = {
    [INSPECTION_STATUS.RETURNED]: "検品中",
    [INSPECTION_STATUS.MISPLACED]: "入れ忘れ",
    [INSPECTION_STATUS.INSPECTED]: "検品済み",
    [INSPECTION_STATUS.WASHING]: "汚れ確認中",
    [INSPECTION_STATUS.PURCHASE_REQUEST]: "買取依頼登録済み",
    [INSPECTION_STATUS.PURCHASE_CANDIDATE]: "買取候補",
  }[scannedInspectingItem?.status as number];

  const handleScan = (itemId: number) => {
    fetchInspectingItemsShow({ id: itemId })
      .then((res) => {
        setScannedInspectingItem(res.tInspectionItem);
        setSelectedImages([]);
        setMessage("");
        setRequestReason(undefined);
      })
      .catch((error: AxiosError) =>
        alert(`アイテムスキャンに失敗しました。 ${error.message}`)
      );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileArray = Array.from(event.target.files);
      const promises = fileArray.map((file) => {
        return new Promise<TImage>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              imageData: reader.result as string,
              imageFileName: file.name,
            });
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(promises).then((images) =>
        setSelectedImages((prev) => [...prev, ...images])
      );
    }
  };
  return (
    <>
      <Header title="返却検品中操作" />
      <QrCodeReader onScan={(id: number) => handleScan(id)} isRectangle />
      {scannedInspectingItem && (
        <>
          <Box margin={2}>
            {scannedInspectingItem.isChartInspected ? (
              <Alert severity="warning">検品処理済みのカルテです。</Alert>
            ) : (
              <Alert severity="warning">
                グループ{scannedInspectingItem.groupNo}
                に登録済みです
              </Alert>
            )}
          </Box>
          <Box marginBottom={1}>
            <ChartCard
              id={scannedInspectingItem.tChart.id}
              tMemberId={scannedInspectingItem.tChart.tMemberId}
              name={scannedInspectingItem.tChart.name}
              deliveryDate={scannedInspectingItem.tChart.rentalStartedAt}
            />
          </Box>
          <ItemCard
            imagePath={scannedInspectingItem.itemInfo.itemImageUrl}
            divider={false}
          >
            <ItemInfoCard itemInfo={scannedInspectingItem.itemInfo} />
          </ItemCard>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            height={80}
          >
            {scannedInspectingItem.status === INSPECTION_STATUS.MISPLACED ? (
              <Typography variant="h6" color="warning.light">
                {statusText}
              </Typography>
            ) : scannedInspectingItem.status === INSPECTION_STATUS.INSPECTED ? (
              <Typography variant="h6" color="success.dark">
                {statusText}
              </Typography>
            ) : (
              <Typography variant="h6" color="warning.dark">
                {statusText}
              </Typography>
            )}
            {encloseItemId && <Typography>ID: {encloseItemId}</Typography>}
          </Box>
          <InspectingItemsSender
            scannedInspectingItem={scannedInspectingItem}
            onClickPurchaseRequestOpen={() => setIsOpen(true)}
            onSetInspectingItem={(inspectingItem: TInspectingItem) =>
              setScannedInspectingItem(inspectingItem)
            }
          />
          <DisableBackDialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            fullScreen
          >
            <PurchaseRequestForm
              inspectingItemId={scannedInspectingItem.id}
              itemInfo={scannedInspectingItem.itemInfo}
              selectedImages={selectedImages}
              onChangeImage={handleImageChange}
              message={message}
              onChangeInput={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setMessage(e.target.value)}
              requestReason={requestReason}
              onChangeSelect={(e: SelectChangeEvent<number>) =>
                setRequestReason(e.target.value as number)
              }
              onClose={() => setIsOpen(false)}
              onSetInspectingItem={(inspectingItem: TInspectingItem) =>
                setScannedInspectingItem(inspectingItem)
              }
              onSetEnclosedItemid={(id: number) => setEncloseItemId(id)}
            />
          </DisableBackDialog>
        </>
      )}
    </>
  );
}
