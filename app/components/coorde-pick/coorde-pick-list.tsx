"use client";
import { TCoordePicksIndexResponse } from "@/app/api/coorde_pick/useCoordePicksIndex";
import { Box, Fab, useTheme } from "@mui/material";
import ItemCard from "../common/Item/item-card";
import ItemInfoCard from "../common/Item/item-info-card";
import QrCode2Icon from "@mui/icons-material/QrCode2";

type TProps = {
  tChartItems: TCoordePicksIndexResponse[];
};

export default function CoordePickList({ tChartItems }: TProps) {
  const theme = useTheme();
  const pathname = usePathname();
  const handleClickOpenBarcodeDialog = () => {
    setIsDialogOpen(true);
    history.pushState("", "", pathname);
  };

  const blockBrowserBack = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  useEffect(() => {
    addEventListener("popstate", blockBrowserBack);
  }, []);

  return (
    <>
      <Box>
        {tChartItems
          .filter(
            (tChartItem: TCoordePicksIndexResponse) =>
              tChartItem.isPicked === false
          )
          .map((unPickedTChartItem: TCoordePicksIndexResponse) => (
            <ItemCard
              key={unPickedTChartItem.id}
              imagePath={unPickedTChartItem.itemImageUrl}
            >
              <ItemInfoCard itemInfo={unPickedTChartItem} />
            </ItemCard>
          ))}
      </Box>
      <Box>
        <Fab
          size="large"
          sx={{
            backgroundColor: theme.palette.primary.main,
            position: "absolute",
            bottom: "12vh",
            right: "12.5vw",
          }}
        >
          <QrCode2Icon fontSize="large" sx={{ color: "white" }} />
        </Fab>
      </Box>
    </>
  );
}
