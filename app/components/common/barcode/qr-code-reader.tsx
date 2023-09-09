"use client";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import BarcodeInputDialog from "./barcode-input-dialog";

type TProps = {
  onScan: (id: number) => void;
  isRectangle?: boolean;
};

export default function QrCodeReader({ onScan, isRectangle = false }: TProps) {
  const [isBarcodeInputOpen, setIsBarcodeInputOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const handleClickSwitchModal = () => {
    setIsBarcodeInputOpen(!isBarcodeInputOpen);
  };
  const handleCloseModal = () => {
    setDialogMessage("");
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    bgcolor: "background.paper",
    border: "3px solid",
    borderColor: "primary.main",
    boxShadow: 24,
    p: 4,
  };
  const onNewScanResult = (decodedText: string) => {
    const id = JSON.parse(decodedText).chartId
      ? JSON.parse(decodedText).chartId
      : decodedText;
    isNaN(id)
      ? setDialogMessage("再度バーコードを読み取って下さい。")
      : onScan(parseInt(id));
  };

  return (
    <>
      <Box
        sx={
          isRectangle
            ? { position: "relative" }
            : {
                display: "flex",
                flexDirection: "column",
              }
        }
      >
        <Html5QrcodePlugin
          fps={10}
          qrbox={{
            width: isRectangle ? 300 : 250,
            height: isRectangle ? 100 : 250,
          }}
          disableFlip={false}
          aspectRatio={isRectangle ? 3 : undefined}
          qrCodeSuccessCallback={onNewScanResult}
          facingMode={"environment"}
        />
        <Box display="flex" justifyContent="end">
          <Button
            style={
              isRectangle
                ? {
                    position: "absolute",
                    bottom: "6px",
                    right: "10px",
                  }
                : {
                    marginTop: "20px",
                    marginRight: "20px",
                  }
            }
            onClick={handleClickSwitchModal}
            variant="contained"
          >
            <KeyboardAltOutlinedIcon sx={{ color: "white" }} />
          </Button>
        </Box>
      </Box>
      <Modal
        open={dialogMessage !== ""}
        onClose={handleCloseModal}
        disableAutoFocus={true}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            読み取り失敗
          </Typography>
          <Typography sx={{ mt: 2 }}>{dialogMessage}</Typography>
        </Box>
      </Modal>
      <BarcodeInputDialog
        onClickSetId={onScan}
        onClose={handleClickSwitchModal}
        isOpen={isBarcodeInputOpen}
      />
    </>
  );
}
