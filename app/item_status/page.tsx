import getOptionsIndex from "../api/item_status/getOptionsIndex";
import ItemStatusContainer from "../components/item-status/item-status-container";


export default async function ItemStatusPage() {
  const data = await getOptionsIndex();
  return <ItemStatusContainer statusOption={data}/>
}