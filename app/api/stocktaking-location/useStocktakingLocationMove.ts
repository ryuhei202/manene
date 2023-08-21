import { usePutRequest } from "../usePutRequest";
import { TStocktakingsLocationsShowResponse as TStocktakingLocationMoveResponse } from "./getStocktakingLocationsShow";

type TParams = {
  id: number;
  targetLocationId: number;
  itemIds: number[];
};
export default function useStocktakingLocationMove(
  params: Pick<TParams, "id">
) {
  const { mutate, error, isLoading } = usePutRequest<
    TParams,
    TStocktakingLocationMoveResponse
  >({ path: `stocktaking_locations/${params.id}/move` });
  return { mutate, error, isLoading };
}
