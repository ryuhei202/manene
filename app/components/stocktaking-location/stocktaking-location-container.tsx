"use client";
import { TItemLocationsItemScanResponse } from "@/app/api/item-location/useItemLocationsItemScan";
import { TStocktakingsLocationsShowResponse } from "@/app/api/stocktaking-location/getStocktakingLocationsShow";
import useStocktakingLocationCompleteScan from "@/app/api/stocktaking-location/useStocktakingLocationCompleteScan";
import useStocktakingLocationItemScan from "@/app/api/stocktaking-location/useStocktakingLocationItemScan";
import useStocktakingLocationMove from "@/app/api/stocktaking-location/useStocktakingLocationMove";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useDisableBrowserBack from "../common/custom-hook/useDisableBrowserBack";
import ErrorDialog from "../common/dialog/error-dialog";
import LoadingDialog from "../common/dialog/loading-dialog";
import Header from "../common/pages/header";
import SubHeader from "../common/pages/sub-header";
import LocationItemTabSwitcher from "./location-item-tab-switcher";

type TProps = {
  location: TStocktakingsLocationsShowResponse;
};
export default function StocktakingLocationContainer({ location }: TProps) {
  const MISSING_LOCATION_ID = 1;
  const ALL_ITEM_TAB_NUMBER = "1";
  const router = useRouter();
  const [selectedTabNumber, setSelectedTabNumber] =
    useState<string>(ALL_ITEM_TAB_NUMBER);
  const handleChangeSelectedTab = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setSelectedTabNumber(newValue);
  };
  const [locationInfo, setLocationInfo] =
    useState<TStocktakingsLocationsShowResponse>(location);

  const [moveLocationId, setMoveLocationId] = useState<number>();
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] =
    useState<boolean>(false);
  const {
    mutate: itemScanMutate,
    error: itemScanError,
    isLoading: isItemScanLoading,
  } = useStocktakingLocationItemScan({
    id: location.id,
  });
  const {
    mutate: moveMutate,
    error: moveError,
    isLoading: isMoveLoading,
  } = useStocktakingLocationMove({
    id: location.id,
  });
  const {
    mutate: completeMutate,
    error: completeError,
    isLoading: isCompleteLoading,
  } = useStocktakingLocationCompleteScan({ id: location.id });

  const {
    isDialogOpen: isMissingDialogOpen,
    handleClickCloseDialog: onClickCloseMissingDialog,
    handleClickOpenDialog: onClickOpenMissingDialog,
  } = useDisableBrowserBack();

  const {
    isDialogOpen: isReturnLocationDialogOpen,
    handleClickCloseDialog: onClickCloseReturnLocationDialog,
    handleClickOpenDialog: onClickOpenReturnLocationDialog,
  } = useDisableBrowserBack();

  const handleScanItem = (id: number) => {
    if (
      locationInfo.matchedItems?.some(
        (item: TItemLocationsItemScanResponse) => item.id === id
      )
    ) {
      alert("このアイテムは既に読み取られています");
      return;
    }
    itemScanMutate(
      { id: location.id, scannedItemId: id },
      {
        onSuccess(response) {
          setLocationInfo(response.data.stocktakingLocationResponse);
          if (response.data.isMismatched) {
            alert("スキャンしたアイテムは不一致でした。");
          }
        },
      }
    );
  };

  const onMoveLocation = ({
    locationId,
    itemIds,
  }: {
    locationId: number;
    itemIds: number[];
  }) => {
    moveMutate(
      {
        id: location.id,
        targetLocationId: locationId,
        itemIds: itemIds,
      },
      {
        onSuccess(response) {
          setLocationInfo(response.data);
        },
      }
    );
    setSelectedTabNumber(ALL_ITEM_TAB_NUMBER);
  };

  const onClickComplete = () => {
    completeMutate(undefined, {
      onSuccess: () => {
        router.push("/stocktaking");
      },
    });
  };

  return (
    <>
      {itemScanError && <ErrorDialog message={itemScanError.message} />}
      {moveError && <ErrorDialog message={moveError.message} />}
      {completeError && <ErrorDialog message={completeError.message} />}
      {(isItemScanLoading || isMoveLoading || isCompleteLoading) && (
        <LoadingDialog />
      )}
      <Box sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header title="棚卸し">
          <Button
            onClick={() => setIsCompleteDialogOpen(true)}
            disabled={!!locationInfo.mismatchingItems}
            sx={{ color: "white" }}
          >
            チェック完了
          </Button>
          {isCompleteDialogOpen && (
            <Dialog open={isCompleteDialogOpen}>
              <DialogTitle>確認</DialogTitle>
              <DialogContent>確認を完了して一覧に戻りますか？</DialogContent>
              <DialogActions>
                <Button onClick={() => setIsCompleteDialogOpen(false)}>
                  キャンセル
                </Button>
                <Button onClick={onClickComplete} disabled={isCompleteLoading}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Header>
        <SubHeader>
          棚番: {location.mLocationId} {location.mLocationName}
        </SubHeader>
      </Box>

      <LocationItemTabSwitcher
        allItems={locationInfo.allItems}
        unscannedItems={locationInfo.unscannedItems}
        matchedItems={locationInfo.matchedItems}
        mismatchingItems={locationInfo.mismatchingItems}
        onScanItem={handleScanItem}
        onClickOpenMissingRegisterDialog={onClickOpenMissingDialog}
        onClickOpenReturnLocationDialog={onClickOpenReturnLocationDialog}
        onScanLocationId={(id: number) => setMoveLocationId(id)}
        selectedTabNumber={selectedTabNumber}
        onChangeSelectedTab={handleChangeSelectedTab}
      />

      <Dialog open={isMissingDialogOpen} fullWidth>
        <DialogTitle>確認</DialogTitle>
        <DialogContent>行方不明として登録しますか？</DialogContent>
        <DialogActions>
          <Button onClick={onClickCloseMissingDialog}>キャンセル</Button>
          <Button
            onClick={() => {
              if (locationInfo.unscannedItems) {
                onMoveLocation({
                  locationId: MISSING_LOCATION_ID,
                  itemIds: locationInfo.unscannedItems.map((item) => item.id),
                });
              } else {
                alert("未スキャンアイテムが存在しません");
              }
              onClickCloseMissingDialog();
            }}
            disabled={isMoveLoading}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isReturnLocationDialogOpen} fullWidth>
        <DialogTitle>確認</DialogTitle>
        <DialogContent>この棚に戻しますか？</DialogContent>
        <DialogActions>
          <Button onClick={onClickCloseReturnLocationDialog}>キャンセル</Button>
          <Button
            onClick={() => {
              if (locationInfo.mismatchingItems) {
                onMoveLocation({
                  locationId: location.mLocationId,
                  itemIds: locationInfo.mismatchingItems.map((item) => item.id),
                });
              } else {
                alert("不一致アイテムが存在しません。");
              }
              onClickCloseReturnLocationDialog();
            }}
            disabled={isMoveLoading}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {moveLocationId && (
        <Dialog open={!!moveLocationId} fullWidth>
          <DialogTitle>確認</DialogTitle>
          <DialogContent>
            <Typography>棚番:{moveLocationId} </Typography>
            <Typography>に登録しますか？ </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setMoveLocationId(undefined)}>
              キャンセル
            </Button>
            <Button
              onClick={() => {
                if (locationInfo.mismatchingItems) {
                  onMoveLocation({
                    locationId: moveLocationId,
                    itemIds: locationInfo.mismatchingItems.map(
                      (item) => item.id
                    ),
                  });
                } else {
                  alert("不一致アイテムが存在しません。");
                }
                setMoveLocationId(undefined);
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
