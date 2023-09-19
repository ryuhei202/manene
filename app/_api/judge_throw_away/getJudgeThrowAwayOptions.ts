import getNoCacheData from "../getNoCacheData";

export type TOption = {
  value: number;
  name: string;
};

export type TJudgeThrowAwayOptionsResponse = {
  conditions: TOption[];
  repairMethods: TOption[];
};

export default async function getJudgeThrowAwayOptions() {
  return await getNoCacheData<TJudgeThrowAwayOptionsResponse>({
    path: "item/judge_throw_away/options",
  });
}
