# Seed Club Merkle Vesting Backend

The app in this repository is a backend for the Merkle Vesting contract found [here](https://github.com/AgoraSpaceDAO/club-contracts). It allows creating Merkle trees from a supplied input and saves them in a database. All data is queryable and should make using the Merkle Vesting contract easier and more accessible.

## Requirements

To run the project you need:

- [Node.js](https://nodejs.org) development environment, version 14.13.1 or newer.
- A file named `.env`. An example can be found in the project's root folder.

## Usage

Pull the repository from GitHub, then install its dependencies by executing this command:

```bash
npm install
```

To start the project in production mode:

```bash
npm start
```

Or, to start the project in development mode:

```bash
npm run dev
```

This will start the app on localhost on the port configured in the _.env_ file.

## Endpoints

### Owner-only

- `[POST]` `save-list`: generates a Merkle tree based on an input file and saves the claim data mapped to the tree's root (cohortId). The generated root can be used to call the _addCohort_ function of the contract
- `[DELETE]` `delete-cohort`: deletes a cohort from the database if it's not already added to the contract

Note: example input files for these endpoints can be found in the project's _example_ directory. Notice they both need a signature (used to verify the caller's account). Signing example using [ethers.js](https://github.com/ethers-io/ethers.js/):

```ts
const messageHash = ethers.utils.id(JSON.stringify(message)); // "message" is the data to be signed, i.e. the input list (in the case of save-list) or the cohort ID (in the case of delete-cohort).
const messageHashBytes = ethers.utils.hexlify(messageHash);
const signature = await wallet.signMessage(messageHashBytes);
console.log(signature); // The signature we need.
console.log(ethers.utils.verifyMessage(messageHashBytes, signature)); // Should return the signer's address.
```

### General

- `[GET]` `hello?name=World`: a test endpoint with an optional parameter
- `[GET]` `cohort/:cohortId`: checks if a specific cohort with _cohortId_ exists in the database or the contract. If both are true, returns it's data
- `[GET]` `cohort-ids/:account`: returns the IDs of the cohorts the _account_ is in
- `[GET]` `claim-data/:cohortId/:account`: returns the claim data for a specific _account_ in a specific cohort (_cohortId_)
- `[GET]` `all-claim-data/:account`: returns the claim data for a specific _account_ from all the cohorts it is in

Note: the claim data are used to call the _claim_ function in the contract.

curl -i -X POST -H 'Content-Type: application/json' -d @example/save-list-input-example.json http://localhost:3000/api/save-list
curl -i -X DELETE -H 'Content-Type: application/json' -d @example/delete-cohort-input-example.json http://localhost:3000/api/delete-cohort
