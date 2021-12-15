import { utils } from "ethers";

const getMessageSigner = (message: string, signature: string) => {
  try {
    const messageHash = utils.id(message);
    const messageHashBytes = utils.hexlify(messageHash);
    return utils.verifyMessage(messageHashBytes, signature);
  } catch (e) {
    throw new Error("Incorrect signature");
  }
};

export default getMessageSigner;
