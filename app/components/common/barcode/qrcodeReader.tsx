"use client";
import { Button } from "@mui/material";
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

  console.log(isOpenBarcodeInput);
  return (
    <>
      {!isOpenBarcodeInput ? (
        <>
          <QrReader
            constraints={{ facingMode: "user" }}
            onResult={(result, error) => {
              if (result) {
                onScan(parseInt(result.getText()));
                console.log(result.text);
              }

              if (error) {
                // eslint-disable-next-line no-console
                console.info(error);
              }
            }}
            containerStyle={{ width: "100%" }}
          />
          {/* <p>{data?.text}</p> */}
          <Button
            onClick={handleClickSwitchModal}
            sx={{
              backgroundColor: "#1976d2",
              position: "absolute",
              bottom: "2.5%",
              right: "5%",
              // transform: "translate(-5%, 5%)",
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
