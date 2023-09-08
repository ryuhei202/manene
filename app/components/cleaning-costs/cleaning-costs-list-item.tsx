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
      <Image src={item.itemImageUrl} alt="item-image" width={70} height={125} />
      <Box>
        <Typography>アイテムID:{item.id}</Typography>
        <Typography
          sx={{
            color: item.previousCleaningDate ? "red" : "inherit"
          }}
        >
          前回登録日:{item.previousCleaningDate ?? "無し"}
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            color: item.previousCleaningDate ? "red" : "inherit"
          }}
        >
          {item.previousCleaningCategoryName}
        </Typography>
      </Box>
    </ListItem>
  );
}
