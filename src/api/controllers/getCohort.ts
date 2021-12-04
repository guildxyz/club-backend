import contract from "../../config/contract.js";
import isCohortInContract from "../../utils/isCohortInContract.js";
import ControllerFunction from "../../types/ControllerFunction.js";
import { merkleDb } from "../../lowdb.js";

const getCohortData = async (cohortId: string) => {
  const cohortData = await contract.getCohort(cohortId);
  return {
    merkleRoot: cohortData.merkleRoot,
    distributionEnd: cohortData.distributionEnd.toString(),
    vestingEnd: cohortData.vestingEnd.toString(),
    vestingPeriod: cohortData.vestingPeriod.toString(),
    cliffPeriod: cohortData.cliffPeriod.toString(),
  };
};

const getCohort: ControllerFunction = async (req, res) => {
  try {
    const { cohortId } = req.params;

    const cohortInContract = await isCohortInContract(cohortId);
    const cohortInDb = cohortId in merkleDb.data;

    switch (true) {
      case cohortInContract && cohortInDb:
        const formattedCohortData = await getCohortData(cohortId);
        res.status(200).json({ status: "Cohort found in both the db and in the contract", ...formattedCohortData });
        break;
      case !cohortInContract && cohortInDb:
        res.status(200).json({ status: "Cohort not added to the contract yet" });
        break;
      case cohortInContract && !cohortInDb:
        res.status(200).json({ status: "Cohort found in the contract, not in db" });
        break;
      default:
        res.status(404).json({ status: "Cohort does not exist yet" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected error" });
  }
};

export default getCohort;
