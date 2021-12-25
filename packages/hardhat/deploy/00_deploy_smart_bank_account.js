// deploy/00_deploy_smart_bank_account.js

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

  await deploy("SmartBankAccount", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [ "Hello", ethers.utils.parseEther("1.5") ],
    log: true,
  });

  // Getting a previously deployed contract
  // eslint-disable-next-line no-unused-vars
  const SmartBankAccount = await ethers.getContract(
    "SmartBankAccount",
    deployer
  );

  await SmartBankAccount.setCEth("0x859e9d8a4edadfEDb5A2fF311243af80F85A91b8");

  /*  await YourContract.setPurpose("Hello");

    To take ownership of yourContract using the ownable library uncomment next line and add the
    address you want to be the owner.
    // yourContract.transferOwnership(YOUR_ADDRESS_HERE);

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  // If you want to send value to an address from the deployer
  // const deployerWallet = ethers.provider.getSigner();
  // await deployerWallet.sendTransaction({
  //   to: "0x1207Fb832fa47d52868B6A64fefb43A1bc1D5153",
  //   value: ethers.utils.parseEther("10"),
  // });

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify your contracts with Etherscan
  // You don't want to verify on localhost
  if (chainId !== localChainId) {
    // wait for etherscan to be ready to verify
    await sleep(15000);
    await run("verify:verify", {
      address: SmartBankAccount.address,
      contract: "contracts/SmartBankAccount.sol:SmartBankAccount",
      contractArguments: [],
    });
  }
};
module.exports.tags = ["SmartBankAccount"];
