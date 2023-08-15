import { usePutRequest } from "../usePutRequest";
import { TStocktakingsLocationsShowResponse as TStocktakingLocationMove } from "./getStocktakingLocationsShow";

type TParams = {
  id: number;
  targetLocationId: number;
  itemIds: number[];
};
export default function useStocktakingLocationMove(params: TParams) {
  const { mutate, error, isLoading } = usePutRequest<
    TParams,
    TStocktakingLocationMove
  >({ path: `stocktaking_locations/${params.id}/move`, params: params });
  return { mutate, error, isLoading };
}
