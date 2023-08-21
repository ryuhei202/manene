"use client";
import { TItemLocationsItemScanResponse } from "@/app/api/item-location/useItemLocationsItemScan";
import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import { Box, Button, Tab, Tabs } from "@mui/material";
import React from "react";
import ScanButton from "../common/button/scan-button";
import ItemList from "../item-location/item-list";

type TProps = {
  allItems: TItemLocationsItemScanResponse[];
  unscannedItems?: TItemLocationsItemScanResponse[];
  matchedItems?: TItemLocationsItemScanResponse[];
  mismatchingItems?: TItemLocationsItemScanResponse[];
  onScanItem: (id: number) => void;
  onClickOpenMissingRegisterDialog: () => void;
  onClickOpenReturnLocationDialog: () => void;
  onScanLocationId: (locationId: number) => void;
  selectedTabNumber: string;
  onChangeSelectedTab: (event: React.SyntheticEvent, newValue: string) => void;
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
              <Tab label={`棚${allItems.length}`} value="1" />
              {unscannedItems && (
                <Tab label={`未${unscannedItems.length}`} value="2" />
              )}
              {matchedItems && (
                <Tab label={`一致${matchedItems.length}`} value="3" />
              )}
              {mismatchingItems && (
                <Tab label={`不一致${mismatchingItems.length}`} value="4" />
              )}
            </Tabs>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <ItemList selectedItems={allItems} />
            <Box sx={footerStyle}>
              <ScanButton title="アイテムスキャン" onScan={onScanItem} />
            </Box>
          </TabPanel>
          {unscannedItems && (
            <TabPanel value="2" sx={{ padding: 0 }}>
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
            <TabPanel value="3" sx={{ padding: 0 }}>
              <ItemList selectedItems={matchedItems} />
            </TabPanel>
          )}
          {mismatchingItems && (
            <TabPanel value="4" sx={{ padding: 0 }}>
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
