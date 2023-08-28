"use client";
import { TLocation } from "@/app/api/stocktaking/getStocktakingsCurrent";
import dynamic from "next/dynamic";
import StocktakingRow from "./stocktaking-row";
const List = dynamic(() => import("@mui/material").then((mod) => mod.List), {
  ssr: false,
});
type TProps = {
  locations: TLocation[];
  onClick: (id: number) => void;
};

export default function StocktakingList({ locations, onClick }: TProps) {
  return (
    <List>
      {locations.map((location) => {
        return (
          <StocktakingRow
            location={location}
            onClick={onClick}
            key={location.id}
          />
        );
      })}
    </List>
  );
}
