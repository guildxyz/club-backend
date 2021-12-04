import ControllerFunction from "../../types/ControllerFunction.js";
import getCohortIdsForAccount from "../../utils/getCohortIdsForAccount.js";
import { merkleDb } from "../../lowdb.js";

const getAllClaimData: ControllerFunction = async (req, res) => {
  try {
    const { account } = req.params;
    const cohortIds = await getCohortIdsForAccount(account);
    const claimData = cohortIds.map((item) => {
      const data = merkleDb.data[item][account];
      return { cohortId: item, ...data };
    });
    res.status(200).json(claimData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected error" });
  }
};

export default getAllClaimData;
