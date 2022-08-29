import { verifyMessage } from "@ethersproject/wallet";

const getMessageSigner = (message: string, signature: string) => {
  try {
    return verifyMessage(message, signature);
  } catch (e) {
    throw new Error("Incorrect signature");
  }
};

export default getMessageSigner;
