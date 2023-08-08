"use client";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import QrCodeReader from "./qr-code-reader";

type TProps = {
  onScan: (id: number) => void;
  onClickSetId: (id: number) => void;
  onClose: () => void;
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
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        {/* <BarcodeInputDialog /> */}
      </DialogActions>
    </Dialog>
  );
}
