"use client";
import { Backdrop, Box, CircularProgress, Dialog } from "@mui/material";

type TProps = {
  isOpen: boolean;
};

export default function LoadingDialog({ isOpen }: TProps) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpen}
    >
      <Dialog open={isOpen}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100px"
          height="100px"
        >
          <CircularProgress color="primary" />
        </Box>
      </Dialog>
    </Backdrop>
  );
}
