import getMessageSigner from "./getMessageSigner.js";

const verifySignature = (message: object, signature: string) => {
  try {
    return getMessageSigner(JSON.stringify(message), signature) === process.env.ADMIN_ADDRESS;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default verifySignature;
