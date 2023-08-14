"use client";
import { TItemLocationsItemScanResponse } from "@/app/api/item-location/useItemLocationsItemScan";
import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box, Button, Tab } from "@mui/material";
import React, { useState } from "react";
import ScanButton from "../common/button/scan-button";
import ItemList from "../item_location/item-list";

type TProps = {
  mLocationId: number;
  allItems: TItemLocationsItemScanResponse[];
  unscannedItems?: TItemLocationsItemScanResponse[];
  matchedItems?: TItemLocationsItemScanResponse[];
  mismatchingItems?: TItemLocationsItemScanResponse[];
  onScanItemId: (id: number) => void;
  onClickOpenMissingRegisterDialog: () => void;
  onClickOpenMoveThisLocationDialog: () => void;
  onScanLocationId: (locationId: number) => void;
};

export default function LocationItemTabSwicherer({
  allItems,
  unscannedItems,
  matchedItems,
  mismatchingItems,
  onScanItemId,
  onClickOpenMissingRegisterDialog,
  onClickOpenMoveThisLocationDialog,
  onScanLocationId,
}: TProps) {
  const [selectedTabNumber, setSelectedTabNumber] = useState<string>("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTabNumber(newValue);
  };

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
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
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
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <ItemList selectedItems={allItems} />
            <Box sx={footerStyle}>
              <ScanButton title="アイテムスキャン" onScan={onScanItemId} />
            </Box>
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            {unscannedItems && (
              <>
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
              </>
            )}
          </TabPanel>
          <TabPanel value="3" sx={{ padding: 0 }}>
            {matchedItems && <ItemList selectedItems={matchedItems} />}
          </TabPanel>
          <TabPanel value="4" sx={{ padding: 0 }}>
            {mismatchingItems && (
              <>
                <ItemList selectedItems={mismatchingItems} />
                <Box sx={footerStyle}>
                  <Button
                    variant="contained"
                    onClick={onClickOpenMoveThisLocationDialog}
                    sx={{
                      height: "50px",
                    }}
                  >
                    この棚に戻す
                  </Button>
                  <ScanButton title="別の棚に戻す" onScan={onScanLocationId} />
                </Box>
              </>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
