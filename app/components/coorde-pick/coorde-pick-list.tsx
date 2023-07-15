"use client";
import { TCoordePicksIndexResponse } from "@/app/api/coorde_pick/useCoordePicksIndex";
import { AppBar, Box, Fab, Typography } from "@mui/material";
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
  const testData: TCoordePicksIndexResponse[] = [
    {
      id: 497215,
      size: "S",
      mCateSmallName: "無地Tシャツ",
      mColorName: "カーキ",
      mBrandName: "LUCIANO-c",
      mLocationName: "F-01-下",
      itemImageUrl: "",
      isPicked: false,
    },
  ];
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            コーデピック
          </Typography>
        </AppBar>
      </Box>
      <Box>
        {testData
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
            backgroundColor: "#1976d2",
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
            backgroundColor: "#1976d2",
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
