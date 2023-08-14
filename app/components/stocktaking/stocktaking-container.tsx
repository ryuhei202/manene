"use client";
import {
  TLocation,
  TStocktakingsCurrentResponse,
} from "@/app/api/stocktaking/getStocktakingsCurrent";
import useStocktakingsComplete from "@/app/api/stocktaking/useStocktakingsComplete";
import useStocktakingsCreate from "@/app/api/stocktaking/useStocktakingsCreate";
import CachedIcon from "@mui/icons-material/Cached";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BarcodeButton from "../common/barcode/barcode-button";
import ErrorDialog from "../common/dialog/error-dialog";
import LoadingDialog from "../common/dialog/loading-dialog";
import Header from "../common/pages/header";
import StocktakingList from "./stocktaking-list";

type TProps = {
  locationList: TStocktakingsCurrentResponse;
};
export default function StocktakingContainer({ locationList }: TProps) {
  const CHECK_IN_PROGRESS = 0;
  const router = useRouter();

  const [locations, setLocations] = useState<TLocation[] | null>(
    locationList.locations
  );

  const {
    mutate: completeMutate,
    error: completeError,
    isLoading: completeIsLoading,
  } = useStocktakingsComplete();
  const {
    mutate: createMutate,
    error: createError,
    isLoading: createIsLoading,
  } = useStocktakingsCreate();

  const canClickCompleteButton = (locations: TLocation[]): boolean => {
    return locations.some((location) => location.status === CHECK_IN_PROGRESS);
  };

  const handleClickNavigate = (id: number) => {
    locations?.some((location) => location.mLocationId === id)
      ? router.push(`/stocktaking/${id}`)
      : alert("棚リストに存在しません");
  };

  const onClickComplete = () => {
    completeMutate(undefined, {
      onSuccess: () => {
        alert(`棚卸しを完了しました`);
        router.push("/");
      },
    });
  };

  const onClickStart = () => {
    createMutate(undefined, {
      onSuccess(response) {
        setLocations(response.data.locations);
      },
    });
  };

  useEffect(() => {
    setLocations(locationList.locations);
  }, [locationList.locations]);

  if (createError) return <ErrorDialog message={createError.message} />;
  if (completeError) return <ErrorDialog message={completeError.message} />;
  if (completeIsLoading || createIsLoading) return <LoadingDialog />;

  return (
    <>
      <Header title="棚卸し">
        <BarcodeButton onScan={handleClickNavigate} />
        <Button onClick={() => router.refresh()}>
          <CachedIcon sx={{ color: "white" }} />
        </Button>
      </Header>

      {locations && (
        <StocktakingList locations={locations} onClick={handleClickNavigate} />
      )}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "90%",
          display: "flex",
          flexDirection: "column",
          left: "50%",
          transform: "translateX(-50%)",
          justifyContent: "center",
          marginBottom: "5px",
        }}
      >
        <Button
          variant="contained"
          sx={{ height: "60px", fontSize: "17px" }}
          disabled={!!locations && canClickCompleteButton(locations)}
          onClick={locations ? onClickComplete : onClickStart}
        >
          {locations ? "棚卸し完了" : "棚卸し開始"}
        </Button>
      </Box>
    </>
  );
}
