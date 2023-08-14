"use client";
import { Button, Dialog } from "@mui/material";
import QrCodeReader from "../barcode/qr-code-reader";
import useDisableBrowserBack from "../custom-hook/useDisableBrowserBack";

type TProps = {
  onScan: (id: number) => void;
  title: string;
  disabled?: boolean;
  color?: string;
};

export default function ScanButton({ onScan, title, disabled, color }: TProps) {
  const { isDialogOpen, handleClickCloseDialog, handleClickOpenDialog } =
    useDisableBrowserBack();
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpenDialog}
        sx={{ height: "50px", backgroundColor: color ?? "primary.main" }}
        disabled={!!disabled}
      >
        {title}
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClickCloseDialog}>
        <QrCodeReader onScan={onScan} />
      </Dialog>
    </>
  );
}
