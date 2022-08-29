import ControllerFunction from "../../types/ControllerFunction.js";
import { merkleDb } from "../../lowdb.js";

const getClaimData: ControllerFunction = async (req, res) => {
  try {
    await merkleDb.read();
    const { cohortId, account } = req.params;
    switch (false) {
      case cohortId in merkleDb.data:
        res.status(404).json({ message: "Cohort not found" });
      case account in merkleDb.data[cohortId]:
        res.status(404).json({ message: "Account not found in this cohort" });
      default:
        res.status(200).json(merkleDb.data[cohortId][account]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected error" });
  }
};

export default getClaimData;
