import getNoCacheData from "../getNoCacheData";

export type TInspectionGroupResponse = {
  inspection_groups: {
    id: number;
    groupNo: number;
    registrationStartTime: string;
    registrationEndTime?: string;
    inspectionEndTime?: string;
    chartCount: number;
    washingItemCount: number;
    purchaseItemCount: number;
  }[];
};

export default async function getInspectionGroupIndex() {
  return await getNoCacheData<TInspectionGroupResponse>({
    path: "inspection/inspection_groups",
  });
}
