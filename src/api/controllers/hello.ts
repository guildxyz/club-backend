import ControllerFunction from "../../types/ControllerFunction.js";

const hello: ControllerFunction = (req, res) => {
  try {
    if (req.query.name !== undefined) res.status(200).json({ message: `Hello ${req.query.name}` });
    else res.status(200).json({ message: "Hello friend" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unknown error" });
  }
};

export default hello;
