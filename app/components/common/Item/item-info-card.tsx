"use client";
import { TCoordePicksIndexResponse } from "@/app/api/coorde_pick/useCoordePicksIndex";
import { Box, Typography } from "@mui/material";

type TItemInfo = Omit<TCoordePicksIndexResponse, "itemImageUrl" | "isPicked">;

type TProps = {
  itemInfo: TItemInfo;
};

export default function ItemInfoCard({ itemInfo }: TProps) {
  return (
    <>
      <Typography component="div" display={"flex"} fontSize={"h5.fontSize"}>
        <Box>棚名</Box>
        <Box sx={{ mx: 1 }}>:</Box>
        <Box>{itemInfo.mLocationName}</Box>
      </Typography>
      <Typography
        component="div"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          fontSize: 17,
        }}
      >
        <Box mr={1.5}>{itemInfo.id}</Box>
        <Box>{itemInfo.mBrandName}</Box>
      </Typography>
      <Typography component="div" display={"flex"} fontSize={17}>
        <Box>{itemInfo.size}</Box>
        <Box mx={0.5}>/</Box>
        <Box>{itemInfo.mCateSmallName}</Box>
        <Box mx={0.5}>/</Box>
        <Box>{itemInfo.mColorName}</Box>
      </Typography>
    </>
  );
}
