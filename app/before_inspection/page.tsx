import dynamic from "next/dynamic";
import getBeforeInspectionsAcceptingGroup from "../_api/before-inspections/getBeforeInspectionsAcceptingGroup";

const BeforeInspectionContainer = dynamic(
  () => import("../_components/before-inspection/before-inspection-container"),
  {
    ssr: false,
  }
);
export default async function BeforeInspection() {
  const data = await getBeforeInspectionsAcceptingGroup();
  return <BeforeInspectionContainer inspectionGroup={data.tInspectionGroup} />;
}
