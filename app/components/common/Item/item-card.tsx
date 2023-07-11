import { Box } from "@mui/material";
import ExpandableImage from "../Image/expandable-image";

type TProps = {
  imagePaths: { defaultPath: string; expandedPath: string };
  children: React.ReactNode;
};

export default function ItemCard({ imagePaths, children }: TProps) {
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
      <ExpandableImage
        defaultImageSrc={imagePaths.defaultPath}
        expandedImageSrc={imagePaths.expandedPath}
      />
      <Box sx={{ ml: 3, width: "auto" }}>{children}</Box>
    </Box>
  );
}
