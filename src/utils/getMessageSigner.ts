import { utils } from "ethers";

const getMessageSigner = (message: string, signature: string) => {
  try {
    const messageHash = utils.id(message);
    const messageHashHex = utils.hexlify(messageHash);
    return utils.verifyMessage(messageHashHex, signature);
  } catch (e) {
    throw new Error("Incorrect signature");
  }
};

export default getMessageSigner;
