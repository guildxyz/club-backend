import { merkleDb } from "../lowdb.js";

const getCohortIdsForAccount = async (account: string) => {
  try {
    await merkleDb.read();
    return Object.keys(merkleDb.data).filter((key) =>
      Object.keys(merkleDb.data[key]).find((innerKey) => innerKey === account)
    );
  } catch (e) {
    console.error(e);
  }
};

export default getCohortIdsForAccount;
