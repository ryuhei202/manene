import getNoCacheData from "../getNoCacheData";

export type TItemStatus = {
  value: string;
  name: number;
};

export type TOptionsIndexResponse = {
  itemStatus: TItemStatus[];
};

export default async function getOptionsIndex() {
  return await getNoCacheData<TOptionsIndexResponse>({
    path: "item/bulk_update_status/options",
  });
}
