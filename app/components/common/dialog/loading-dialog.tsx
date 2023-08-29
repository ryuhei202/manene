"use client";
import dynamic from "next/dynamic";

const Backdrop = dynamic(
  () => import("@mui/material").then((mod) => mod.Backdrop),
  {
    ssr: false,
  }
);

const Box = dynamic(() => import("@mui/material").then((mod) => mod.Box), {
  ssr: false,
});
const CircularProgress = dynamic(
  () => import("@mui/material").then((mod) => mod.CircularProgress),
  {
    ssr: false,
  }
);
const Dialog = dynamic(
  () => import("@mui/material").then((mod) => mod.Dialog),
  {
    ssr: false,
  }
);
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
