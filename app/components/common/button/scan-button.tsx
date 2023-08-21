"use client";
import { Button, Dialog } from "@mui/material";
import QrCodeReader from "../barcode/qr-code-reader";
import useDisableBrowserBack from "../custom-hook/useDisableBrowserBack";
import { CSSProperties } from "react";

type TProps = {
  onScan: (id: number) => void;
  title: string;
  disabled?: boolean;
  color?: string;
  buttonStyle?: CSSProperties;
};

export default function ScanButton({ onScan, title, disabled, color, buttonStyle }: TProps) {
  const { isDialogOpen, handleClickCloseDialog, handleClickOpenDialog } =
    useDisableBrowserBack();
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpenDialog}
        sx={{ height: "50px", backgroundColor: color ?? "primary.main" }}
        disabled={!!disabled}
        style={buttonStyle}
      >
        {title}
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClickCloseDialog}>
        <QrCodeReader onScan={onScan} />
      </Dialog>
    </>
  );
}
