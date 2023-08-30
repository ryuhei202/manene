import { Backdrop, CircularProgress, Dialog } from "@mui/material";

export default function LoadingDialog() {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <Dialog open>
        <CircularProgress color="primary" />
      </Dialog>
    </Backdrop>
  );
}
