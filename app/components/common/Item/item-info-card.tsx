import { TCoordePicksIndexResponse } from "@/app/api/coorde_pick/useCoordePicksIndex";

type TItemInfo = Omit<TCoordePicksIndexResponse, "itemImageUrl" | "isPicked">;

type TProps = {
  itemInfo: TItemInfo;
};

// const testData: TItemInfo = {
//   id: 497215,
//   size: "S",
//   mCateSmallName: "無地Tシャツ",
//   mColorName: "カーキ",
//   mBrandName: "LUCIANO-c",
//   mLocationName: "F-01-下",
// };

export default function ItemInfoCard({ itemInfo }: TProps) {
  return (
    <>
      <div>
        <p>棚名: {itemInfo.mLocationName}</p>
      </div>
      <div>
        <p>{itemInfo.id}</p>
        <p>{itemInfo.mBrandName}</p>
      </div>
      <div>
        <p>{itemInfo.size}</p>
        <p>{itemInfo.mCateSmallName}</p>
        <p>{itemInfo.mColorName}</p>
      </div>
    </>
  );
}
