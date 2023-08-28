import getNoCacheData from "../getNoCacheData";

export type TInspectionGroup = {
  id: number;
  groupNo: number;
  registrationStartTime: string;
  registrationEndTime?: string;
  inspectionEndTime?: string;
  chartCount: number;
  washingItemCount: number;
  purchaseItemCount: number;
};

export type TInspectionGroupResponse = {
  inspectionGroups: TInspectionGroup[];
};

export default async function getInspectionGroupIndex() {
  return await getNoCacheData<TInspectionGroupResponse>({
    path: "inspection/inspection_groups",
  });
}
