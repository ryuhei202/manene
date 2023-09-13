"use client";
import { Button } from "@mui/material";
import { CSSProperties, useState } from "react";
import QrCodeReader from "../barcode/qr-code-reader";
import DisableBackDialog from "../dialog/disable-back-dialog";

type TProps = {
  onScan: (id: number) => void;
  title: string;
  disabled?: boolean;
  color?: string;
  buttonStyle?: CSSProperties;
  autoCloseDialog?: boolean;
};

export default function ScanButton({
  onScan,
  title,
  disabled = false,
  color,
  buttonStyle,
  autoCloseDialog,
}: TProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleScan = (id: number) => {
    onScan(id);
    if (autoCloseDialog) {
      setIsOpen(false);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        onClick={() => setIsOpen(true)}
        sx={{ height: "50px", backgroundColor: color ?? "primary.main" }}
        style={buttonStyle}
        disabled={disabled}
      >
        {title}
      </Button>
      <DisableBackDialog open={isOpen} onClose={() => setIsOpen(false)}>
        <QrCodeReader onScan={handleScan} />
      </DisableBackDialog>
    </>
  );
}
