"use client";
import {
  STATUS,
  TLocation,
  TStocktakingsCurrentResponse,
} from "@/app/api/stocktaking/getStocktakingsCurrent";
import useStocktakingsComplete from "@/app/api/stocktaking/useStocktakingsComplete";
import useStocktakingsCreate from "@/app/api/stocktaking/useStocktakingsCreate";
import CachedIcon from "@mui/icons-material/Cached";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BarcodeButton from "../common/barcode/barcode-button";
import FooterButton from "../common/button/footer-button";
import LoadingDialog from "../common/dialog/loading-dialog";
import Header from "../common/pages/header";
import StocktakingList from "./stocktaking-list";

const Button = dynamic(
  () => import("@mui/material").then((mod) => mod.Button),
  {
    ssr: false,
  }
);

type TProps = {
  locationList: TStocktakingsCurrentResponse;
};
export default function StocktakingContainer({ locationList }: TProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [locations, setLocations] = useState<TLocation[] | null>(
    locationList.locations
  );

  const { mutate: completeMutate, isLoading: completeIsLoading } =
    useStocktakingsComplete();
  const { mutate: createMutate, isLoading: createIsLoading } =
    useStocktakingsCreate();

  const canClickCompleteButton = (locations: TLocation[]): boolean => {
    return locations.some((location) => location.status === STATUS.IN_PROGRESS);
  };

  const handleClickNavigate = (id: number) => {
    locations?.some((location) => location.id === id)
      ? router.push(`/stocktaking/${id}`)
      : alert("棚リストに存在しません");
  };

  const onClickComplete = () => {
    completeMutate(undefined, {
      onSuccess: () => {
        alert(`棚卸しを完了しました`);
        router.push("/");
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  const onClickStart = () => {
    createMutate(undefined, {
      onSuccess(response) {
        setLocations(response.data.locations);
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  useEffect(() => {
    setLocations(locationList.locations);
  }, [locationList.locations]);

  useEffect(() => {
    const locationName = searchParams.get("location_name");
    if (locationName) {
      const element = document.getElementById(locationName);
      if (element) {
        const HEADER_HEIGHT = 63;
        const rect = element.getBoundingClientRect();
        const offset = HEADER_HEIGHT;
        window.scrollTo({
          top: rect.top + window.scrollY - offset,
          behavior: "instant",
        });
      }
    }
  }, [searchParams]);

  return (
    <>
      <LoadingDialog isOpen={completeIsLoading || createIsLoading} />
      <Header title="棚卸し">
        <BarcodeButton onScan={handleClickNavigate} />
        <Button onClick={() => router.refresh()}>
          <CachedIcon sx={{ color: "white" }} />
        </Button>
      </Header>

      {locations && (
        <StocktakingList locations={locations} onClick={handleClickNavigate} />
      )}
      <FooterButton
        onClick={locations ? onClickComplete : onClickStart}
        disabled={!!locations && canClickCompleteButton(locations)}
      >
        {locations ? "棚卸し完了" : "棚卸し開始"}
      </FooterButton>
    </>
  );
}
