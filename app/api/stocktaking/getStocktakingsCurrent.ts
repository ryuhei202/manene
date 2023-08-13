import getNoCacheData from "../getNoCacheData";

export type TLocation = {
  id: number;
  mLocationId: number;
  mLocationName: string;
  totalCount: number;
  unscannedCount: number;
  mismatchingCount: number;
  status: 0 | 2;
};

export type TStocktakingsCurrentResponse = {
  location: TLocation[] | null;
};
export default async function getStocktakingsCurrent() {
  return await getNoCacheData<TStocktakingsCurrentResponse>({
    path: "stocktakings/current",
  });
}
