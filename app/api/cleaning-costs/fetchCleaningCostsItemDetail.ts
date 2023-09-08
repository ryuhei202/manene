import fetchData from "../fetchData";

type TParams = { tItemId: number };

export type TCleaningCostsItemDetailResponse = {
  id: number;
  itemImageUrl: string;
  previousCleaningDate: string | null;
  previousCleaningCategoryName: string;
};

export default async function fetchCleaningCostsItemDetail(params: TParams) {
  const data = await fetchData<TCleaningCostsItemDetailResponse, TParams>({
    path: `cleaning_costs/item_detail/`,
    params: params
  });
  return data;
}
