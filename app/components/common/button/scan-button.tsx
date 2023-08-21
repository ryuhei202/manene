"use client";
import { Button } from "@mui/material";
import { useState } from "react";
import QrCodeReader from "../barcode/qr-code-reader";
import DisableBackDialog from "../dialog/disable-back-dialog";

type TProps = {
  onScan: (id: number) => void;
  title: string;
  disabled?: boolean;
  color?: string;
};

export default function ScanButton({
  onScan,
  title,
  disabled = false,
  color,
}: TProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        variant="contained"
        onClick={() => setIsOpen(true)}
        sx={{ height: "50px", backgroundColor: color ?? "primary.main" }}
        disabled={disabled}
      >
        {title}
      </Button>
      <DisableBackDialog open={isOpen} altCallback={() => setIsOpen(false)}>
        <QrCodeReader onScan={onScan} />
      </DisableBackDialog>
    </>
  );
}
