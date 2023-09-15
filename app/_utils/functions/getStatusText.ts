export const INSPECTION_STATUS = {
  RETURNED: 0,
  MISPLACED: 1,
  INSPECTED: 2,
  WASHING: 3,
  PURCHASE_REQUEST: 4,
  PURCHASE_CANDIDATE: 5,
} as const;

export const getStatusText = (status: number): string => {
  switch (status) {
    case INSPECTION_STATUS.RETURNED:
      return "検品中";
    case INSPECTION_STATUS.MISPLACED:
      return "入れ忘れ";
    case INSPECTION_STATUS.INSPECTED:
      return "検品済み";
    case INSPECTION_STATUS.WASHING:
      return "汚れ確認中";
    case INSPECTION_STATUS.PURCHASE_REQUEST:
      return "買取依頼登録済み";
    case INSPECTION_STATUS.PURCHASE_CANDIDATE:
      return "買取候補";
    default:
      throw new Error(`エラーが発生しました。担当者にお問い合わせください。`);
  }
};
