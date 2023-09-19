import getNoCacheData from "../getNoCacheData";
import { TInspectionGroup } from "../inspection-groups/getInspectionGroupsIndex";

type TInspectionGroupResponse = {
  tInspectionGroup: TInspectionGroup | null;
};
export default async function getBeforeInspectionsAcceptingGroup() {
  return await getNoCacheData<TInspectionGroupResponse>({
    path: "inspection/before_inspections/accepting_group",
  });
}
