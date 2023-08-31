import getNoCacheData from "../getNoCacheData";

type TParams = {
  itemId: number;
};

export type TWastedReasonsResponse = {
  id: number;
  name: string;
  details: {
    id: number;
    name: string;
    itemPart: {
      id: number;
      name: string;
    }[];
  }[];
}[];

export default async function WastedReasonsResponse(params: TParams) {
  return await getNoCacheData<TWastedReasonsResponse>({
    path: `items/${params.itemId}/wasted_reason`,
  });
}
