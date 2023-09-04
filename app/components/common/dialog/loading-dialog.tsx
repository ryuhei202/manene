"use client";
import { Box, CircularProgress, Dialog } from "@mui/material";
type TProps = {
  isOpen: boolean;
};

export default function LoadingDialog({ isOpen }: TProps) {
  return (
    <Dialog open={isOpen ?? false}>
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
  );
}
