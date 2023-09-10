import { TItemsJudgeThrowAwayResponse } from "@/app/api/judge_throw_away/useItemsJudgeThrowAway";
import JudgeThrowAwayListItem from "./judge-throw-away-list-item";

type TProps = {
  judgedItems: TItemsJudgeThrowAwayResponse[];
};
export default function JudgeThrowAwayList({ judgedItems }: TProps) {
  return judgedItems.map((item: TItemsJudgeThrowAwayResponse) => {
    return (
      <JudgeThrowAwayListItem
        key={item.item.id}
        result={item.result}
        item={item.item}
        condition={item.condition}
        repairMethod={item.repairMethod}
        costDifference={item.costDifference}
      />
    );
  });
}
