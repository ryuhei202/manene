"use client";
import { TItemLocationsItemScanResponse } from "@/app/_api/item-location/useItemLocationsItemScan";
import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import { Box, Button, Tab, Tabs } from "@mui/material";
import React from "react";
import ScanButton from "../common/button/scan-button";
import ItemList from "../item-location/item-list";

type TProps = {
  allItems: TItemLocationsItemScanResponse[];
  unscannedItems: TItemLocationsItemScanResponse[] | null;
  matchedItems: TItemLocationsItemScanResponse[] | null;
  mismatchingItems: TItemLocationsItemScanResponse[] | null;
  onScanItem: (id: number) => void;
  onClickOpenMissingRegisterDialog: () => void;
  onClickOpenReturnLocationDialog: () => void;
  onScanLocationId: (locationId: number) => void;
  selectedTabNumber: string;
  onChangeSelectedTab: (event: React.SyntheticEvent, newValue: string) => void;
};

export const TAB_NUMBER = {
  FIRST: "1",
  SECOND: "2",
  THIRD: "3",
  FORTH: "4",
};

export default function LocationItemTabs({
  allItems,
  unscannedItems,
  matchedItems,
  mismatchingItems,
  onScanItem,
  onClickOpenMissingRegisterDialog,
  onClickOpenReturnLocationDialog,
  onScanLocationId,
  selectedTabNumber,
  onChangeSelectedTab,
}: TProps) {
  const footerStyle = {
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
  };

  return (
    <>
      <Box sx={{ width: "100%", height: "100%" }}>
        <TabContext value={selectedTabNumber}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              position: "sticky",
              top: 93,
              bgcolor: "white",
              zIndex: 1000,
            }}
          >
            <Tabs
              onChange={onChangeSelectedTab}
              centered
              value={selectedTabNumber}
            >
              <Tab label={`棚${allItems.length}`} value={TAB_NUMBER.FIRST} />
              {unscannedItems && (
                <Tab
                  label={`未${unscannedItems.length}`}
                  value={TAB_NUMBER.SECOND}
                />
              )}
              {matchedItems && (
                <Tab
                  label={`一致${matchedItems.length}`}
                  value={TAB_NUMBER.THIRD}
                />
              )}
              {mismatchingItems && (
                <Tab
                  label={`不一致${mismatchingItems.length}`}
                  value={TAB_NUMBER.FORTH}
                />
              )}
            </Tabs>
          </Box>
          <TabPanel value={TAB_NUMBER.FIRST} sx={{ padding: 0 }}>
            <ItemList selectedItems={allItems} />
            <Box sx={footerStyle}>
              <ScanButton title="アイテムスキャン" onScan={onScanItem} />
            </Box>
          </TabPanel>
          {unscannedItems && (
            <TabPanel value={TAB_NUMBER.SECOND} sx={{ padding: 0 }}>
              <ItemList selectedItems={unscannedItems} />
              <Box sx={footerStyle}>
                <Button
                  onClick={onClickOpenMissingRegisterDialog}
                  sx={{
                    color: "white",
                    bgcolor: "warning.dark",
                    height: "50px",
                  }}
                >
                  行方不明として登録
                </Button>
              </Box>
            </TabPanel>
          )}
          {matchedItems && (
            <TabPanel value={TAB_NUMBER.THIRD} sx={{ padding: 0 }}>
              <ItemList selectedItems={matchedItems} />
            </TabPanel>
          )}
          {mismatchingItems && (
            <TabPanel value={TAB_NUMBER.FORTH} sx={{ padding: 0 }}>
              <ItemList selectedItems={mismatchingItems} />
              <Box sx={footerStyle}>
                <Button
                  variant="contained"
                  onClick={onClickOpenReturnLocationDialog}
                  sx={{
                    height: "50px",
                  }}
                >
                  この棚に戻す
                </Button>
                <ScanButton title="別の棚に戻す" onScan={onScanLocationId} />
              </Box>
            </TabPanel>
          )}
        </TabContext>
      </Box>
    </>
  );
}
