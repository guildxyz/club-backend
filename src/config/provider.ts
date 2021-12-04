import { InfuraProvider } from "@ethersproject/providers";

const provider = new InfuraProvider(process.env.NETWORK, process.env.INFURA_KEY);

export default provider;
