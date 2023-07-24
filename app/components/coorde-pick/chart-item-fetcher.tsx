import useCoordePicksIndex from "@/app/api/coorde_pick/useCoordePicksIndex";
import CoordePickList from "./coorde-pick-list";
import ErrorPage from "../common/pages/error-page";
import LoadingPage from "../common/pages/loading-page";

type TProps = {
  tChartId: number;
};

export default function ChartItemFetcher({ tChartId }: TProps) {
  const {
    data: tChartItemsData,
    error: tChartItemsError,
    isLoading,
  } = useCoordePicksIndex({ tChartId });
  if (tChartItemsError) return <ErrorPage massage={tChartItemsError.message} />;
  if (!tChartItemsData || isLoading) return <LoadingPage />;
  return <CoordePickList tChartItems={tChartItemsData} />;
}
