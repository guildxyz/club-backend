import { merkleDb } from "../../lowdb.js";
import isCohortInContract from "../../utils/isCohortInContract.js";
import verifySignature from "../../utils/verifySignature.js";
import ControllerFunction from "../../types/ControllerFunction.js";

const deleteCohort: ControllerFunction = async (req, res) => {
  try {
    const cohortId = req.body.cohortId;
    if (verifySignature(cohortId, req.body.signature)) {
      await merkleDb.read();
      if (await isCohortInContract(cohortId))
        res.status(500).json({ message: "Cohort already added to the contract, therefore it cannot be deleted" });
      else if (cohortId in merkleDb.data) {
        if (delete merkleDb.data[cohortId]) {
          await merkleDb.write();
          res.status(200).json({ message: `${cohortId} successfully deleted` });
        } else res.status(500).json({ message: "Deleting cohort failed" });
      } else res.status(404).json({ message: `Cohort with id ${cohortId} does not exist` });
    } else res.status(401).json({ message: "Invalid signature" });
  } catch (error) {
    if ((error as Error).message === "Incorrect signature")
      res.status(500).json({ message: "Incorrect signature provided" });
    else {
      console.error(error);
      res.status(500).json({ message: "Unexpected error" });
    }
  }
};

export default deleteCohort;
