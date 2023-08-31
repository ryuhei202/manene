import dynamic from "next/dynamic";
import getInspectionGroupIndex from "../api/inspection-groups/getInspectionGroupsIndex";
const InspectionGroupContainer = dynamic(
  () => import("../components/inspection-group/inspection-group-container"),
  {
    ssr: false,
  }
);
export default async function InspectionGroupPage() {
  const data = await getInspectionGroupIndex();
  return (
    <InspectionGroupContainer initialInspectionGroups={data.inspectionGroups} />
  );
}
