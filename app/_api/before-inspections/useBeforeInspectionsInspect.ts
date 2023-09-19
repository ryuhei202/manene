import { usePostRequest } from "../usePostRequest";
import { TBeforeInspectionsCreateResponse as TBeforeInspectionsInspectResponse } from "./useBeforeInspectionsCreate";

type TParams = {
  chartId: number;
};
export default function useBeforeInspectionsInspect() {
  const { mutate, error, isLoading, isSuccess } = usePostRequest<
    TParams,
    TBeforeInspectionsInspectResponse
  >({
    path: "inspection/before_inspections/inspect",
  });

  return { mutate, error, isLoading, isSuccess };
}
