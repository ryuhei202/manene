import { Box } from "@mui/material";
import CleaningCostsListItem from "./cleaning-costs-list-item";

type TItem = {
  id: number;
  itemImageUrl: string;
  previousCleaningDate: string | null;
  previousCleaningCategoryName: string;
}[];

type TProps = {
  items: TItem;
};

export default function CleaningCostsList({ items }: TProps) {
  return (
    <Box>
      {items.map((item) => {
        return (
          <CleaningCostsListItem
            item={item}
            key={item.id}
          ></CleaningCostsListItem>
        );
      })}
    </Box>
  );
}
