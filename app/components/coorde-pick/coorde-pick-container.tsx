"use client";
import { useState } from "react";
import ChartItemFetcher from "./chart-item-fetcher";
import QrCodeReader from "../common/barcode/qrcodeReader";
import { Box, Modal, Typography, useTheme } from "@mui/material";

export default function CoordPickContainer() {
  const [tChartId, setTChartId] = useState<number>();

  const [resultError, setResultError] = useState<boolean>(false);

  const handleSetTChartId = (id: number): void => {
    setTChartId(id);
  };

  const handleSetResultError = () => {
    setResultError(true);
  };

  const handleCloseModal = () => {
    setResultError(false);
  };

  const theme = useTheme();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    bgcolor: "background.paper",
    border: `3px solid ${theme.palette.primary.main}`,
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      {!tChartId ? (
        <>
          <QrCodeReader
            onScan={handleSetTChartId}
            onScanSetResultNan={handleSetResultError}
          />
          {!!resultError && (
            <Modal
              open={resultError}
              onClose={handleCloseModal}
              disableAutoFocus={true}
            >
              <Box sx={style}>
                <Typography variant="h6" component="h2">
                  読み取り失敗
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  再度バーコードを読み取って下さい。
                </Typography>
              </Box>
            </Modal>
          )}
        </>
      ) : (
        <ChartItemFetcher tChartId={tChartId} />
      )}
    </>
  );
}
