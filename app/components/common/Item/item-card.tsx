"use client";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import { Box } from "@mui/material";
import React from "react";
import ExpandableImage from "../Image/expandable-image";

type TProps = {
  imagePath: string;
  isItemPicked: boolean;
  children: React.ReactNode;
};

export default function ItemCard({
  imagePath,
  isItemPicked,
  children,
}: TProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: 1,
        p: 0.5,
        bgcolor: "background.paper",
      }}
    >
      {isItemPicked && (
        <CheckCircleOutlineSharpIcon sx={{ color: "primary.main", mx: 0.5 }} />
      )}
      <ExpandableImage imagePath={imagePath} />
      <Box sx={{ ml: 1.5 }}>{children}</Box>
    </Box>
  );
}
