import getStocktakingsLocationsShow from "@/app/_api/stocktaking-location/getStocktakingLocationsShow";
import StocktakingLocationContainer from "@/app/_components/stocktaking-location/stocktaking-location-container";

type TParams = {
  params: { id: number };
};
export default async function StocktakingLocationPage({ params }: TParams) {
  const data = await getStocktakingsLocationsShow({ id: params.id });
  return <StocktakingLocationContainer location={data} />;
}
