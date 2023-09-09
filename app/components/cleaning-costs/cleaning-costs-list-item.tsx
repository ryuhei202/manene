import { Box, ListItem, Typography } from "@mui/material";
import Image from "next/image";

type TItem = {
  id: number;
  itemImageUrl: string;
  previousCleaningDate: string | null;
  previousCleaningCategoryName: string;
};

type TProps = {
  item: TItem;
};

export default function CleaningCostsListItem({ item }: TProps) {
  return (
    <ListItem divider>
      <Box display="flex" width="100%" alignItems="center">
        <Image
          src={item.itemImageUrl}
          alt="item-image"
          width={45}
          height={70}
          style={{ marginLeft: 5 }}
        />

        <Box marginLeft={2}>
          <Typography variant="subtitle1">アイテムID:{item.id}</Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: item.previousCleaningDate ? "warning.dark" : "inherit",
            }}
          >
            前回登録日:{item.previousCleaningDate ?? "無し"}
          </Typography>
        </Box>
        <Typography
          marginLeft="auto"
          variant="subtitle1"
          marginTop={3}
          sx={{
            color: item.previousCleaningDate ? "warning.dark" : "inherit",
          }}
        >
          {item.previousCleaningCategoryName}
        </Typography>
      </Box>
    </ListItem>
  );
}
