import getCoordePickIndex from "@/app/api/coorde_pick/getCoordePickIndex";
import CoordePickList from "@/app/components/coorde-pick/coorde-pick-list";

type TProps = {
  params: { chartId: number };
};

export default async function ChartItemListPage({ params }: TProps) {
  const chartItemsData = await getCoordePickIndex({ tChartId: params.chartId });
  return <CoordePickList tChartItems={chartItemsData} />;
}
