import ControllerFunction from "../../types/ControllerFunction.js";
import getCohortIdsForAccount from "../../utils/getCohortIdsForAccount.js";

const getCohortIdsFor: ControllerFunction = async (req, res) => {
  try {
    const { account } = req.params;
    const cohortIds = await getCohortIdsForAccount(account);
    res.status(200).json({ cohortIds: cohortIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected error" });
  }
};

export default getCohortIdsFor;
