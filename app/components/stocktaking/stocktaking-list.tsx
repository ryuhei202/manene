"use client";
import { TLocation } from "@/app/api/stocktaking/getStocktakingsCurrent";
import { List } from "@mui/material";
import StocktakingRow from "./stocktaking-row";
type TProps = {
  locations: TLocation[];
  onClick: (id: number) => void;
};

export default function StocktakingList({ locations, onClick }: TProps) {
  return (
    <List disablePadding>
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
