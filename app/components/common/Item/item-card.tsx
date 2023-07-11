import { Box } from "@mui/material";
import ExpandableImage from "../Image/expandable-image";
import React from "react";

type TProps = {
  imagePath: string;
  children: React.ReactNode;
};

export default function ItemCard({ imagePath, children }: TProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        borderBottom: 1,
        p: 1,
        bgcolor: "background.paper",
      }}
    >
      <ExpandableImage imagePath={imagePath} />
      <Box sx={{ ml: 3, width: "auto" }}>{children}</Box>
    </Box>
  );
}
