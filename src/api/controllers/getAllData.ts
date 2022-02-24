import ControllerFunction from "../../types/ControllerFunction.js";
import { merkleDb } from "../../lowdb.js";

const getAllData: ControllerFunction = async (req, res) => {
  try {
    res.status(200).json(merkleDb.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected error" });
  }
};

export default getAllData;
