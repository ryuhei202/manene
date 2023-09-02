import { TChartItem } from "@/app/api/before-inspections/useBeforeInspectionsCreate";
import { List } from "@mui/material";
import ItemCard from "../common/Item/item-card";
import ItemInfoCard from "../common/Item/item-info-card";

type TProps = {
  chartItems: TChartItem[];
  onClick: () => void;
  isLoading: boolean;
};

export default function BeforeInspectionList({
  chartItems,
  onClick,
  isLoading,
}: TProps) {
  return (
    <List>
      {chartItems.map((item: TChartItem) => {
        return (
          <ItemCard key={item.id} imagePath={item.itemInfo.itemImageUrl}>
            <ItemInfoCard
              itemInfo={item.itemInfo}
              onClick={onClick}
              isLoading={isLoading}
              isPurchased={item.purchasedFlag}
              inspectionStatus={item.inspectionStatus}
            />
          </ItemCard>
        );
      })}
    </List>
  );
}
