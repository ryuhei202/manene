import getNoCacheData from "../getNoCacheData";

export const STATUS = {
  IN_PROGRESS: 0,
  DONE: 2,
} as const;

export type TLocation = {
  id: number;
  mLocationId: number;
  mLocationName: string;
  totalCount: number;
  unscannedCount: number;
  mismatchingCount: number;
  status: (typeof STATUS)[keyof typeof STATUS];
};

export type TStocktakingsCurrentResponse = {
  locations: TLocation[] | null;
};
export default async function getStocktakingsCurrent() {
  return await getNoCacheData<TStocktakingsCurrentResponse>({
    path: "stocktakings/current",
  });
}
