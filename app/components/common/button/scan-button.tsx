"use client";
import { Button } from "@mui/material";
import QrCodeReader from "../barcode/qr-code-reader";
import { CSSProperties } from "react";
import { useState } from "react";
import DisableBackDialog from "../dialog/disable-back-dialog";

type TProps = {
  onScan: (id: number) => void;
  title: string;
  disabled?: boolean;
  color?: string;
  buttonStyle?: CSSProperties;
};

export default function ScanButton({
  onScan,
  title,
  disabled = false,
  color,
  buttonStyle,
}: TProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
        <QrCodeReader onScan={onScan} />
      </DisableBackDialog>
    </>
  );
}
