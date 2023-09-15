import getOptionsIndex from "../_api/item_status/getOptionsIndex";
import ItemStatusContainer from "../_components/item-status/item-status-container";

export default async function ItemStatusPage() {
  const data = await getOptionsIndex();
  return <ItemStatusContainer statusOption={data} />;
}
