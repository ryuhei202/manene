import getNoCacheData from "../getNoCacheData";

type TParams = { id: number; }
export type TGetItemsShowResponse = {
  id: number,
  usedCount: number,
  itemCode: string,
  isMarriage: boolean,
  isElasticBand: boolean,
  itemStatus: {
    status: number,
    name: string
  },
  size: string,
  dropSize: {
    id: number,
    name: string
  },
  regDate: string,
  priceTaxIn: number,
  priceRefTaxIn: number,
  shoulder: number,
  bust: number,
  waist: number,
  minWaist: number,
  maxWaist: number,
  hip: number,
  lengthArm: number,
  lengthTop: number,
  lengthWaist: number,
  lengthLeg: number,
  roundNeck: number,
  roundLeg: number,
  roundCalf: number,
  itemImageUrl: string,
  itemOriginalImageUrl: string,
  leeapSize: string,
  tStockingOrderId: number,
  originalSize: number,
  rank: string,
  mCateSmall: {
    id: number,
    name: string
  },
  mBrand: {
    id: number,
    name: string
  },
  mColor: {
    id: number,
    name: string
  },
  mSubColor: {
    id: number,
    name: string
  },
  mPattern: {
    id: number,
    name: string
  },
  mLogo: {
    id: number,
    name: string
  },
  tAdmin: {
    id: number,
    name: string
  },
  mLocation: {
    id: number,
    name: string
  }
};

export default async function getItemsShow(params: TParams) {
  return await getNoCacheData<TGetItemsShowResponse>({
    path: `items/${params.id}`
  });
}