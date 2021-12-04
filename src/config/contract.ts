import { Contract } from "@ethersproject/contracts";
import { readFile } from "fs/promises";
import { join, resolve } from "path";
import provider from "./provider.js";

const VESTING_ABI = await readFile(resolve(join("static", "vestingAbi.json")), {
  encoding: "utf-8",
});

const contract = new Contract(process.env.VESTING_ADDRESS, VESTING_ABI, provider);

export default contract;
