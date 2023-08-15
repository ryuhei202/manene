import getStocktakingsCurrent from "../api/stocktaking/getStocktakingsCurrent";
import StocktakingContainer from "../components/stocktaking/stocktaking-container";

export default async function StocktakingPage() {
  const data = await getStocktakingsCurrent();
  return <StocktakingContainer locationList={data} />;
}
