import getWastedReasonIndex from "@/app/api/wasted_reason/getWastedReasonIndex";
import WastedReasonItemMediumCard from "@/app/components/wasted_reason/wasted-reason-item-medium-card";
import WastedReasonSelect from "@/app/components/wasted_reason/wasted-reason-select";

export default async function WastedReasonPage() {
  const data2 = await getWastedReasonIndex({ itemId: 497288 });
  console.log(data2.wastedReasons[0].details[0].itemParts[0]);

  const data = {
    id: 1,
    itemImageUrl: "",
    mBrand: "Brand",
    size: "M",
    mCateSmall: "イージーパンツ",
    mColor: "チャコールグレー",
    status: "有効",
  };

  return (
    <>
      <WastedReasonItemMediumCard itemInfo={data} />
      <WastedReasonSelect wastedReasons={data2.wastedReasons} />
    </>
  );
}
