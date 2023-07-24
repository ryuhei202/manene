"use client";
import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import BarcodeInputDialog from "./barcode-input-dialog";

type TProps = {
  onScan: (id: number) => void;
};

export default function QrCodeReader({ onScan }: TProps) {
  const [isBarcodeInputOpen, setIsBarcodeInputOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const handleClickSwitchModal = () => {
    setIsBarcodeInputOpen(!isBarcodeInputOpen);
  };
  const handleCloseModal = () => {
    setIsMessageDialogOpen(false);
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

  console.log(isMessageDialogOpen);

  return (
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
                ? setIsMessageDialogOpen(true)
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
        <Modal
          open={isMessageDialogOpen}
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
      <BarcodeInputDialog
        onClickSetId={onScan}
        onClose={handleClickSwitchModal}
        isOpen={isBarcodeInputOpen}
      />
    </>
  );
}
