import { parseBalanceMap } from "../../lib/parse-balance-map.js";
import { merkleDb } from "../../lowdb.js";
import verifySignature from "../../utils/verifySignature.js";
import ControllerFunction from "../../types/ControllerFunction.js";

const saveList: ControllerFunction = async (req, res) => {
  try {
    if (verifySignature(req.body.input, req.body.signature)) {
      const merkleTree = parseBalanceMap(req.body.input);
      if (!(merkleTree.merkleRoot in merkleDb.data)) {
        merkleDb.data[merkleTree.merkleRoot] = merkleTree.claims;
        await merkleDb.write();
      }
      res.status(200).json(merkleTree);
    } else res.status(401).json({ message: "Invalid signature" });
  } catch (error) {
    if ((error as Error).message === "Incorrect signature")
      res.status(500).json({ message: "Incorrect signature provided" });
    else {
      console.error(error);
      res.status(500).json({ message: "Saving list failed" });
    }
  }
};

export default saveList;
