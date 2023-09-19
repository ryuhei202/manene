import getNoCacheData from "../getNoCacheData";

export type TItemStatus = {
  value: number;
  name: string;
};

export type TOptionsIndexResponse = {
  itemStatuses: TItemStatus[];
};

export default async function getOptionsIndex() {
  return await getNoCacheData<TOptionsIndexResponse>({
    path: "item/bulk_update_status/options",
  });
}
