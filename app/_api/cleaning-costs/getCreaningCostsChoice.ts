import getNoCacheData from "../getNoCacheData";

export type TCleaningCostsResponse = {
  id: number;
  name: string;
  baseCost: number;
};

export default async function getCleaningCostsChoices() {
  return await getNoCacheData<TCleaningCostsResponse[]>({
    path: "cleaning_costs/choice",
  });
}
