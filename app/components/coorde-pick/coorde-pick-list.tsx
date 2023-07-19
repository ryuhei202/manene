"use client";
import { TCoordePicksIndexResponse } from "@/app/api/coorde_pick/useCoordePicksIndex";
import { AppBar, Box, Fab, Typography, useTheme } from "@mui/material";
import ItemCard from "../common/Item/item-card";
import ItemInfoCard from "../common/Item/item-info-card";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

type TProps = {
  tChartItems: TCoordePicksIndexResponse[];
  onClickBackQrReader: () => void;
};

export default function CoordePickList({
  tChartItems,
  onClickBackQrReader,
}: TProps) {
  const theme = useTheme();

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
      <Box onClick={onClickBackQrReader}>
        <Fab
          size="large"
          sx={{
            backgroundColor: theme.palette.primary.main,
            position: "absolute",
            bottom: "12vh",
            left: "12.5vw",
          }}
        >
          <KeyboardBackspaceIcon fontSize="large" sx={{ color: "white" }} />
        </Fab>
      </Box>
    </>
  );
}
