import { JSONFile, Low } from "lowdb";
import { join, resolve } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";

const dataDir = resolve(join("data"));
const merkleDbFileName = "merkle-db.json";

const merkleFile = join(dataDir, merkleDbFileName);

if (!existsSync(merkleFile)) {
  if (!existsSync(dataDir)) mkdirSync(dataDir);
  writeFileSync(merkleFile, "{}");
}

const merkleAdapter = new JSONFile<
  Record<
    string,
    { [account: string]: { index: number; amount: string; proof: string[]; flags?: { [flag: string]: boolean } } }
  >
>(merkleFile);
const merkleDb = new Low(merkleAdapter);

await merkleDb.read();

if (!merkleDb.data) merkleDb.data = {};

// eslint-disable-next-line import/prefer-default-export
export { merkleDb };
