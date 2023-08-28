import getNoCacheData from "../getNoCacheData";

type TParams = {
  itemId: number;
};

export type TWastedReasons = {
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

export default async function getWastedReasonIndex(params: TParams) {
  return await getNoCacheData<TWastedReasons>({
    path: `items/${params}/wasted_reason`,
  });
}
