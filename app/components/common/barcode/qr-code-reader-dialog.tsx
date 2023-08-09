"use client";
import { Dialog, DialogContent } from "@mui/material";
import QrCodeReader from "./qr-code-reader";

type TProps = {
  onScan: (id: number) => void;
  onClose?: () => void;
  isOpen: boolean;
};

export default function QrCodeReaderDialog({
  onScan,
  onClose,
  isOpen,
}: TProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <QrCodeReader onScan={onScan} />
      </DialogContent>
    </Dialog>
  );
}
