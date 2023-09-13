import dynamic from "next/dynamic";
import getStocktakingsCurrent from "../api/stocktaking/getStocktakingsCurrent";
const StocktakingContainer = dynamic(
  () => import("../components/stocktaking/stocktaking-container"),
  {
    ssr: false,
  }
);

export default async function StocktakingPage() {
  const data = await getStocktakingsCurrent();
  return <StocktakingContainer locationList={data} />;
}
