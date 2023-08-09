"use client";
import { TCoordePicksIndexResponse } from "@/app/api/coorde_pick/useCoordePicksIndex";
import useCoordePicksPick from "@/app/api/coorde_pick/useCoordePicksPick";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { Box, Button, Fab, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ItemCard from "../common/Item/item-card";
import ItemInfoCard from "../common/Item/item-info-card";
import QrCodeReaderDialog from "../common/barcode/qr-code-reader-dialog";

type TProps = {
  tChartId: number;
  tChartItems: TCoordePicksIndexResponse[];
};

export default function CoordePickList({ tChartId, tChartItems }: TProps) {
  const theme = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const handleClickOpenBarcodeDialog = () => {
    setIsDialogOpen(true);
    history.pushState("", "", pathname);
  };

  const [chartItems, setChartItems] =
    useState<TCoordePicksIndexResponse[]>(tChartItems);

  const { mutate, isLoading } = useCoordePicksPick();
  const handleScan = (targetItemId: number) => {
    if (tChartId && targetItemId)
      mutate(
        { tChartId, targetItemId },
        {
          onError: (error) => {
            alert(error);
          },
          onSuccess: (data) => {
            setChartItems(data.data);
          },
        }
      );
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
        {chartItems.map((chartItem: TCoordePicksIndexResponse) => (
          <ItemCard
            key={chartItem.id}
            imagePath={chartItem.itemImageUrl}
            isItemPicked={chartItem.isPicked}
          >
            <ItemInfoCard itemInfo={chartItem} />
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
          <Button onClick={handleClickOpenBarcodeDialog}>
            <QrCode2Icon fontSize="large" sx={{ color: "white" }} />
          </Button>
        </Fab>
        <QrCodeReaderDialog
          isOpen={isDialogOpen}
          onScan={handleScan}
          // onClose={}
        />
      </Box>
    </>
  );
}
