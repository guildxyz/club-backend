import { utils } from "ethers";

const getMessageSigner = (message: string, signature: string) => {
  try {
    return utils.verifyMessage(message, signature);
  } catch (e) {
    throw new Error("Incorrect signature");
  }
};

export default getMessageSigner;
