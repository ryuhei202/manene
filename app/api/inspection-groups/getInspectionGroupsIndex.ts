import getNoCacheData from "../getNoCacheData";

export type TInspectionGroupResponse = {
  inspection_groups: {
    id: number;
    group_no: number;
    registration_start_time: string;
    registration_end_time?: string;
    inspection_end_time?: string;
    chart_count: number;
    washing_item_count: number;
    purchase_item_count: number;
  }[];
};

export default async function getInspectionGroupIndex() {
  return await getNoCacheData<TInspectionGroupResponse>({
    path: "inspection/inspection_groups",
  });
}
