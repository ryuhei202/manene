"use client";
import { Button } from "@mui/material";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";
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
          <Button onClick={handleClickSwitchModal}>
            <KeyboardAltIcon />
          </Button>
        </>
      ) : (
        <BarcodeInput
          onClickSetId={onScan}
          onClickCloseBarcodeModal={handleClickSwitchModal}
        />
      )}
    </>
  );
}
