import getMessageSigner from "./getMessageSigner.js";

const verifySignature = (message: string, signature: string) => {
  try {
    return getMessageSigner(message, signature) === process.env.ADMIN_ADDRESS;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default verifySignature;
