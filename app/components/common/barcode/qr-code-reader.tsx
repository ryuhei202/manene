"use client";
import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import BarcodeInputDialog from "./barcode-input-dialog";
import Html5QrcodePlugin from "./Html5QrcodePlugin";

type TProps = {
  onScan: (id: number) => void;
};

export default function QrCodeReader({ onScan }: TProps) {
  const [isBarcodeInputOpen, setIsBarcodeInputOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const handleClickSwitchModal = () => {
    setIsBarcodeInputOpen(!isBarcodeInputOpen);
  };
  const handleCloseModal = () => {
    setDialogMessage("");
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
  const onNewScanResult = (decodedText: string) => {
    const chartId = JSON.parse(decodedText).chartId;
    isNaN(chartId)
      ? setDialogMessage("再度バーコードを読み取って下さい。")
      : onScan(parseInt(chartId));
  };

  return (
    <>
      <Html5QrcodePlugin
        fps={10}
        qrbox={{ width: 250, height: 250 }}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
        facingMode={"environment"}
      />
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
      <BarcodeInputDialog
        onClickSetId={onScan}
        onClose={handleClickSwitchModal}
        isOpen={isBarcodeInputOpen}
      />
    </>
  );
}
