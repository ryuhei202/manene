import getCleaningCostsChoices from "../_api/cleaning-costs/getCreaningCostsChoice";
import CleaningCostsContainer from "../_components/cleaning-costs/cleaning-costs-container";

export default async function CleaningCostsPage() {
  const data = await getCleaningCostsChoices();
  return <CleaningCostsContainer cleaningOptions={data} />;
}
