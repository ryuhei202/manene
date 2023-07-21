"use client";
import { TCoordePicksIndexResponse } from "@/app/api/coorde_pick/useCoordePicksIndex";
import { AppBar, Box, Fab, Typography } from "@mui/material";
import ItemCard from "../common/Item/item-card";
import ItemInfoCard from "../common/Item/item-info-card";
import QrCode2Icon from "@mui/icons-material/QrCode2";

type TProps = {
  tChartItems: TCoordePicksIndexResponse[];
};

export default function CoordePickList({ tChartItems }: TProps) {
  return (
    <>
      <Box>
        <AppBar position="static">
          <Typography variant="h6" m={1.5}>
            コーデピック
          </Typography>
        </AppBar>
      </Box>
      <Box>
        {tChartItems.map((unPickedTChartItem: TCoordePicksIndexResponse) => (
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
