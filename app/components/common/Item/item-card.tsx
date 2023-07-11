import { Box } from "@mui/material";
import ExpandableImage from "../Image/expandable-image";

type TProps = {
  imagePaths: { defaultPath: string; expandedPath: string };
  children: React.ReactNode;
};

export default function ItemCard({ imagePaths, children }: TProps) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 3,
        }}
      >
        <ExpandableImage
          defaultImageSrc={imagePaths.defaultPath}
          expandedImageSrc={imagePaths.expandedPath}
        />
        {children}
      </Box>
    </div>
  );
}
