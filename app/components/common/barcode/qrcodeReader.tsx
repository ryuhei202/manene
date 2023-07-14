"use client";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import BarcodeInput from "./barcodeInput";

type TProps = {
  onScan: (id: number) => void;
};

export default function QrCodeReader({ onScan }: TProps) {
  const [isOpenBarcodeInput, setIsOpenBarcodeInput] = useState(false);

  const handleClickSwitchModal = () => {
    setIsOpenBarcodeInput(!isOpenBarcodeInput);
  };

  return (
    <>
      {!isOpenBarcodeInput ? (
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
              constraints={{ facingMode: "user" }}
              onResult={(result, error) => {
                if (result) {
                  onScan(parseInt(result.getText()));
                }

                if (error) {
                  // eslint-disable-next-line no-console
                  console.info(error);
                }
              }}
              containerStyle={{
                width: "90%",
              }}
              videoStyle={{ width: "" }}
            />
          </Box>
          <Button
            onClick={handleClickSwitchModal}
            sx={{
              backgroundColor: "#1976d2",
              position: "absolute",
              bottom: "2.5%",
              right: "5%",
              width: "40px",
              height: "40px",
              minWidth: "40px",
            }}
          >
            <KeyboardAltOutlinedIcon sx={{ color: "white" }} />
          </Button>
        </>
      ) : (
        <BarcodeInput
          onClickSetId={onScan}
          onClickCloseBarcodeModal={handleClickSwitchModal}
          isOpen={isOpenBarcodeInput}
        />
      )}
    </>
  );
}
