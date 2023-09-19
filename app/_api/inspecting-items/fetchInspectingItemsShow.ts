"use client";
import { TItemInfo } from "../before-inspections/useBeforeInspectionsCreate";
import fetchData from "../fetchData";

export type TInspectingChart = {
  id: number;
  tMemberId: number;
  name: string;
  rentalStartedAt: string;
};

export type TInspectingItem = {
  id: number;
  tChart: TInspectingChart;
  itemInfo: TItemInfo;
  status: number;
  groupNo: number;
  isChartInspected: boolean;
};
export type TInspectingItemsShowResponse = {
  tInspectionItem: TInspectingItem;
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
