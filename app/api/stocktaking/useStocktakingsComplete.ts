import { usePostRequest } from "../usePostRequest";
import { TStocktakingsCurrentResponse as TStocktakingsCompleteResponse } from "./getStocktakingsCurrent";

export default function useStocktakingsComplete() {
  const { mutate, error, isLoading } = usePostRequest<
    undefined,
    TStocktakingsCompleteResponse
  >({ path: "stocktakings/complete" });
  return { mutate, error, isLoading };
}
