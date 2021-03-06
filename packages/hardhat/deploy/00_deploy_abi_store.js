// deploy/00_deploy_abi_store.js

const { ethers } = require("hardhat");
const saveAbis = require("../lib/abis");

const localChainId = "31337";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("AbiStore", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [ "Hello", ethers.utils.parseEther("1.5") ],
    log: true,
    waitConfirmations: 5,
  });

  // Getting a previously deployed contract
  // const AbiStore = await ethers.getContract("AbiStore", deployer);

  const contracts = [
    "0x13f89adb711c18F8bC218F5E0Ad508784eB8f4E2",
    "0xAf93fCce0548D3124A5fC3045adAf1ddE4e8Bf7e",
    "0x9C5a36AEf5A7b04b0123b2064BD20bc47183e1DC",
    "0x947c0bfA2bf3Ae009275f13F548Ba539d38741C2",
  ];

  const [ipfsHashes, txHashes] = await saveAbis(contracts);
  ipfsHashes.forEach((ipfsHash, i) =>
    console.log(
      "File stored in " + ipfsHash + " and saved in AbiStore " + txHashes[i]
    )
  );

  /*  await AbiStore.setPurpose("Hello");
  
    To take ownership of abiStore using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // await abiStore.transferOwnership(YOUR_ADDRESS_HERE);

    //const abiStore = await ethers.getContractAt('AbiStore', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const abiStore = await deploy("AbiStore", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const abiStore = await deploy("AbiStore", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  // try {
  //   if (chainId !== localChainId) {
  //     await run("verify:verify", {
  //       address: AbiStore.address,
  //       contract: "contracts/AbiStore.sol:AbiStore",
  //       constructorArguments: [],
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};
module.exports.tags = ["AbiStore"];
