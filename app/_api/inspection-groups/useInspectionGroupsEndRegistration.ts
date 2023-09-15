import { usePatchRequest } from "../usePatchRequest";
import { TInspectionGroupResponse } from "./getInspectionGroupsIndex";

type TParams = {
  id: number;
};
export default function useInspectionGroupsEndRegistration(params: TParams) {
  const { mutate, error, isLoading, isSuccess } = usePatchRequest<
    TParams,
    TInspectionGroupResponse
  >({ path: `inspection/inspection_groups/${params.id}/end_registration` });

  return { mutate, error, isLoading, isSuccess };
}
