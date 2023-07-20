"use client";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import BarcodeInputDialog from "./barcode-input-dialog";

type TProps = {
  onScan: (id: number) => void;
  onScanSetNan: () => void;
};

export default function QrCodeReader({ onScan, onScanSetNan }: TProps) {
  const [isOpenBarcodeInput, setIsOpenBarcodeInput] = useState(false);
  const handleClickSwitchModal = () => {
    setIsOpenBarcodeInput(!isOpenBarcodeInput);
  };

  return (
    <>
      <>
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              if (result) {
                isNaN(parseInt(result.getText()))
                  ? onScanSetNan()
                  : onScan(parseInt(result.getText()));
              }

              if (error) {
                // eslint-disable-next-line no-console
                console.info(error);
              }
            }}
            containerStyle={{
              width: "100%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            videoStyle={{ width: "100%" }}
          />
        </Box>
        <Button
          onClick={handleClickSwitchModal}
          sx={{
            backgroundColor: "#1976d2",
            position: "absolute",
            bottom: "12vh",
            right: "12.5vw",
            width: "40px",
            height: "40px",
            minWidth: "40px",
          }}
        >
          <KeyboardAltOutlinedIcon sx={{ color: "white" }} />
        </Button>
      </>
      <BarcodeInputDialog
        onClickSetId={onScan}
        onClose={handleClickSwitchModal}
        isOpen={isOpenBarcodeInput}
      />
    </>
  );
}
