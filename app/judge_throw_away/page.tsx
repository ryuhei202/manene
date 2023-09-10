import getJudgeThrowAwayOptions from "../api/judge_throw_away/getJudgeThrowAwayOptions";
import JudgeThrowAwayContainer from "../components/judge-throw-away/judge-throw-away-container";

export default async function JudgeThrowAwayPage() {
  const data = await getJudgeThrowAwayOptions();
  return <JudgeThrowAwayContainer option={data} />;
}
