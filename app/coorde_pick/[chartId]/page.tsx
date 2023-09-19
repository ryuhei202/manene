import getCoordePickIndex from "@/app/_api/coorde_pick/getCoordePickIndex";
import CoordePickList from "@/app/_components/coorde-pick/coorde-pick-list";

type TProps = {
  params: { chartId: number };
};

export default async function ChartItemListPage({ params }: TProps) {
  const chartItemsData = await getCoordePickIndex({ tChartId: params.chartId });
  return (
    <CoordePickList tChartId={params.chartId} tChartItems={chartItemsData} />
  );
}
