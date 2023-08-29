import { usePatchRequest } from "../usePatchRequest";
import { TInspectionGroupResponse } from "./getInspectionGroupsIndex";

type TParams = {
  path: string;
};
export default function useInspectionGroupsInspect() {
  const { mutate, error, isLoading, isSuccess } = usePatchRequest<
    TParams,
    TInspectionGroupResponse
  >({});

  return { mutate, error, isLoading, isSuccess };
}
