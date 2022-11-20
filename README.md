# FAFU - FAFU - Files Are Forever Urs - Gnosis Safe

Gnosis SAFE App for safe DAO/multisig file storage. FAFU allows you to save your community files on any chain via a storage deal on the fly.

This project combines a Gnosis DAO starter UI and FEVM. The app allows the multisig/Zodiac DAO actors to save files in an encrypted/timelocked/open way in the Filecoin decentralized system. Allowing Integrity, Availability for important and key files, for eg. with the tornado cash system when github removed their work. The Gnosis safe app allows for the upload of the files via web3 storage/lotus, the deal is first brokered with the individual user. The DAO in its mission to then preserve this information creates a multisig/safe tx either via a snapshot proposal or a multisig sign. This transaction is posted into the same chain, a state channel actor then picks it up and creates the corresponding transaction on the FVM to preserve the deal via an escrow market contract.

## How it's Made
We used the Gnosis Safe starter app to create a simple UI to upload any text/csv files and then this is send to web3.storage from where a deal is brokered. The dealid, providerID and piece CID is then written on chain by the DAO multisig. Once this information is published our state channel actor picks it up and deploys a corresponding transaction to preserve the file for a longer duration in the FVM. We are excited that this allows for communities to exist in a safe manner regardless of external environmental factors. We hope in the future we can make a cross chain communication possible so that we can send the event directly to FEVM.

## FAFU deal preservation on FEVM

### Clone the repo and install dependencies

```
git clone https://github.com/shaddamciv/fafu
cd fafu/fafu-hardhat
yarn install
```

### Add your private key as an environment variable

```
PRIVATE_KEY=
```

### Run Hardhat task

```
npx hardhat generate-deal
```
