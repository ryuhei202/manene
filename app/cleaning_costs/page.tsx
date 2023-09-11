import getCleaningCostsChoices from "../api/cleaning-costs/getCreaningCostsChoice";
import CleaningCostsContainer from "../components/cleaning-costs/cleaning-costs-container";

export default async function CleaningCostsPage() {
  const data = await getCleaningCostsChoices();
  return <CleaningCostsContainer cleaningOptions={data} />;
}
