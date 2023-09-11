import getItemsShow from "@/app/api/item_detail/getItemsShow";
import getWastedReasonIndex from "@/app/api/wasted_reason/getWastedReasonIndex";
import dynamic from "next/dynamic";
const WastedReasonContainer = dynamic(
  () => import("../../components/wasted-reason/wasted-reason-container"),
  {
    ssr: false,
  }
);

type TProps = {
  params: {
    id: number;
  };
};

export default async function WastedReasonIdPage({ params }: TProps) {
  const [itemData, wastedReasonData] = await Promise.all([
    getItemsShow(params),
    getWastedReasonIndex({ itemId: params.id }),
  ]);
  return (
    <WastedReasonContainer
      itemInfo={{
        id: itemData.id,
        itemImageUrl: itemData.itemImageUrl,
        mBrand: itemData.mBrand.name,
        size: itemData.size,
        mCateSmall: itemData.mCateSmall.name,
        mColor: itemData.mColor.name,
        status: itemData.itemStatus.name,
      }}
      wastedReasons={wastedReasonData.wastedReasons}
    />
  );
}
