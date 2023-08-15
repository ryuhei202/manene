import QrCodeIcon from "@mui/icons-material/QrCode";
import { Button, Dialog } from "@mui/material";
import useDisableBrowserBack from "../custom-hook/useDisableBrowserBack";
import QrCodeReader from "./qr-code-reader";

type TProps = {
  onScan: (id: number) => void;
};

export default function BarcodeButton({ onScan }: TProps) {
  const { isDialogOpen, handleClickCloseDialog, handleClickOpenDialog } =
    useDisableBrowserBack();
  return (
    <>
      <Button onClick={handleClickOpenDialog}>
        <QrCodeIcon sx={{ color: "white" }} />
      </Button>

      <Dialog open={isDialogOpen} onClose={handleClickCloseDialog}>
        <QrCodeReader onScan={onScan} />
      </Dialog>
    </>
  );
}
