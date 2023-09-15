"use client";

import useItemsJudgeThrowAway, {
  TItemsJudgeThrowAwayResponse,
} from "@/app/_api/judge_throw_away/useItemsJudgeThrowAway";
import { AxiosError } from "axios";
import { useEffect } from "react";
import LoadingDialog from "../common/dialog/loading-dialog";

type TProps = {
  itemId: number;
  selectedConditionId: number;
  selectedRepairMethodId: number;
  addJudgedItems: (item: TItemsJudgeThrowAwayResponse) => void;
};
export default function JudgeThrowAwaySender({
  itemId,
  selectedConditionId,
  selectedRepairMethodId,
  addJudgedItems,
}: TProps) {
  const { mutate, isLoading } = useItemsJudgeThrowAway({ id: itemId });

  useEffect(() => {
    mutate(
      {
        conditionId: selectedConditionId,
        repairMethodId: selectedRepairMethodId,
      },
      {
        onSuccess(response) {
          addJudgedItems(response.data);
        },
        onError(error: AxiosError) {
          alert(
            `廃棄判定に失敗しました。 ${
              (error.response?.data as { message: string })?.message
            }`
          );
        },
      }
    );
  }, [mutate, addJudgedItems, selectedConditionId, selectedRepairMethodId]);

  return <LoadingDialog isOpen={isLoading} />;
}
