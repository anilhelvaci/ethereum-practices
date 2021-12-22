// deploy/00_deploy_deed_repository.js

const { ethers } = require("hardhat");

const localChainId = "31337";

const sleep = (ms) =>
  new Promise((r) =>
    setTimeout(() => {
      // console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
      r();
    }, ms)
  );

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("DeedRepository", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [ "DeedNFT", "DE" ],
    log: true,
  });

  // Getting a previously deployed contract
  const DeedRepository = await ethers.getContract("DeedRepository", deployer);
  /*  await DeedRepository.setPurpose("Hello");
  
    To take ownership of DeedRepository using the ownable library uncomment next line and add the
    address you want to be the owner. 
    // DeedRepository.transferOwnership(YOUR_ADDRESS_HERE);

    //const DeedRepository = await ethers.getContractAt('DeedRepository', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
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
  const DeedRepository = await deploy("DeedRepository", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const DeedRepository = await deploy("DeedRepository", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify your contracts with Etherscan
  // You don't want to verify on localhost
  if (chainId !== localChainId) {
    // wait for etherscan to be ready to verify
    await sleep(15000);
    await run("verify:verify", {
      address: DeedRepository.address,
      contract: "contracts/DeedRepository.sol:DeedRepository",
      contractArguments: [],
    });
  }
};
module.exports.tags = ["DeedRepository"];
