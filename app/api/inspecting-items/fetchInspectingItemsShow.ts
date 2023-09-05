"use client";
import fetchData from "../fetchData";

export type TInspectingChart = {
  chartId: number;
  memberId: number;
  memberName: string;
  rentalStartedAt: string;
};

export type TInspectingItemInfo = {
  itemId: number;
  size: string;
  itemImageUrl: string;
  category: string;
  color: string;
  brand: string;
};

export type TInspectingItem = {
  inspectionItemId: number;
  chart: TInspectingChart;
  itemInfo: TInspectingItemInfo;
  status: number;
  groupNo: number;
  isChartInspected: boolean;
};
export type TInspectingItemsShowResponse = {
  inspectingItem: TInspectingItem;
};

type TParams = {
  id: number;
};

export default async function fetchInspectingItemsShow(params: TParams) {
  const data = await fetchData<TInspectingItemsShowResponse>({
    path: `inspection/inspecting_items/${params.id}`,
  });

  return data;
}
