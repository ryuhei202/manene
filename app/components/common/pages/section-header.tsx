"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

type TProps = {
  height?: number;
  children: React.ReactNode;
};
export default function SectionHeader({ height = 35, children }: TProps) {
  return (
    <Box
      width="100%"
      height={height}
      bgcolor="secondary.main"
      display="flex"
      alignItems="center"
    >
      <Typography marginLeft={1}>{children}</Typography>
    </Box>
  );
}
