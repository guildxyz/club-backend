import contract from "../config/contract.js";

const getCreatedCohorts = async () => {
  try {
    const events = await contract.queryFilter(contract.filters.CohortAdded());
    return events.map((item) => item.args.cohortId);
  } catch (e) {
    console.error(e);
  }
};

export default getCreatedCohorts;
