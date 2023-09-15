import { usePostRequest } from "../usePostRequest";
import { TStocktakingsCurrentResponse as TStocktakingsCreateResponse } from "./getStocktakingsCurrent";

export default function useStocktakingsCreate() {
  const { mutate, error, isLoading } = usePostRequest<
    undefined,
    TStocktakingsCreateResponse
  >({ path: "stocktakings" });
  return { mutate, error, isLoading };
}
