import { Box, Typography } from "@mui/material";
import React from "react";
type TProps = {
  height?: number;
  children: React.ReactNode;
};

export default function SubHeader({ children, height = 30 }: TProps) {
  return (
    <Box
      bgcolor="secondary.light"
      height={height}
      display="flex"
      alignItems="center"
    >
      <Typography ml={2}>{children}</Typography>
    </Box>
  );
}
