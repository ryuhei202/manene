import { useGetRequest } from "../useGetRequest";

type TGetItemsShow = {
  id: "number";
  usedCount: "number";
  itemCode: "string";
  isMarriage: "false";
  isElasticBand: "false";
  itemStatus: {
    status: "number";
    name: "string";
  };
  size: "string";
  dropSize: {
    id: "number";
    name: "string";
  };
  regDate: "string";
  priceTaxIn: "number";
  priceRefTaxIn: "number";
  shoulder: "number";
  bust: "number";
  waist: "number";
  minWaist: "number";
  maxWaist: "number";
  hip: "number";
  lengthArm: "33";
  lengthTop: "73";
  lengthWaist: "number";
  lengthLeg: "number";
  roundNeck: "number";
  roundLeg: "number";
  roundCalf: "number";
  itemImageUrl: "string";
  itemOriginalImageUrl: "string";
  leeapSize: "string";
  tStockingOrderId: "number";
  originalSize: "number";
  rank: "string";
  mCateSmall: {
    id: "number";
    name: "string";
  };
  mBrand: {
    id: "number";
    name: "string";
  };
  mColor: {
    id: "number";
    name: "string";
  };
  mSubColor: {
    id: "number";
    name: "string";
  };
  mPattern: {
    id: "number";
    name: "string";
  };
  mLogo: {
    id: "number";
    name: "string";
  };
  tAdmin: {
    id: "number";
    name: "string";
  };
  mLocation: {
    id: "number";
    name: "string";
  };
};

type TParams = {
  id: number;
};

export default function useItemsShow(params: TParams) {
  const { id } = params;
  const { data, error, isLoading } = useGetRequest<TGetItemsShow, TParams>({
    path: `items/${id}`,
    params: params,
  });
  return { data, error, isLoading };
}
