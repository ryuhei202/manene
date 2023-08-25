import QrCodeIcon from "@mui/icons-material/QrCode";
import { Button } from "@mui/material";
import { useState } from "react";
import DisableBackDialog from "../dialog/disable-back-dialog";
import QrCodeReader from "./qr-code-reader";

type TProps = {
  onScan: (id: number) => void;
};

export default function BarcodeButton({ onScan }: TProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <QrCodeIcon sx={{ color: "white" }} />
      </Button>

      <DisableBackDialog open={isOpen} altCallback={() => setIsOpen(false)}>
        <QrCodeReader onScan={onScan} />
      </DisableBackDialog>
    </>
  );
}
