import { usePostRequest } from "../usePostRequest";
import { TInspectionGroupResponse } from "./getInspectionGroupsIndex";

export default function useInspectionGroupsCreate() {
  const { mutate, error, isLoading, isSuccess } = usePostRequest<
    undefined,
    TInspectionGroupResponse
  >({ path: "inspection/inspection_groups" });

  return { mutate, error, isLoading, isSuccess };
}
