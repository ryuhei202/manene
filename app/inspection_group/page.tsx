import getInspectionGroupIndex from "../api/inspection-groups/getInspectionGroupsIndex";
import InspectionGroupContainer from "../components/common/inspection-group/inspection-group-container";

export default async function InspectionGroupPage() {
  const data = await getInspectionGroupIndex();
  return (
    <InspectionGroupContainer initialInspectionGroups={data.inspectionGroups} />
  );
}
