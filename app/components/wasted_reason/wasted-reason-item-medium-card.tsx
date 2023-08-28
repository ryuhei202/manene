import { Box } from "@mui/material";
import ExpandableImage from "../common/Image/expandable-image";

type TProps = {
  itemInfo: {
    id: number;
    itemImageUrl: string;
    mBrand: string;
    size: string;
    mCateSmall: string;
    mColor: string;
    status: string;
  };
};

export default function WastedReasonItemMediumCard({ itemInfo }: TProps) {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "7%",
      }}
    >
      <Box>
        <ExpandableImage imagePath={itemInfo.itemImageUrl} />
      </Box>
      <Box
        sx={{
          paddingLeft: "3%",
          color: "secondary.dark",
        }}
      >
        id: {itemInfo.id} {itemInfo.mBrand}
        <br />
        {itemInfo.size} / {itemInfo.mCateSmall} / {itemInfo.mColor}
        <br />
        <span style={{ color: "red" }}>
          現在のステータス: {itemInfo.status}
        </span>
      </Box>
    </Box>
  );
}
