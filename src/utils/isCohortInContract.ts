import getCreatedCohorts from "./getCreatedCohorts.js";

const isCohortInContract = async (cohortId: string) => {
  try {
    const createdCohorts = await getCreatedCohorts();
    return createdCohorts.includes(cohortId);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default isCohortInContract;
