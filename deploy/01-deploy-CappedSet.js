const { network } = require("hardhat");
const { verify } = require("../utils/verify");
require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  let arguments = [];
  if (chainId == 31337) {
    arguments = [10];
  } else if (chainId == 11155111) {
    arguments = [10];
  } else {
    throw Error("Unsupported network");
  }
  //taking 10 as of now, will add an UI for user input later

  log("----------------------------------------------------");
  log("Deploying CappedSet with the account:", deployer);
  log("CappedSet arguments:", arguments);
  log("CappedSet chainId:", chainId);
  log("CappedSet network:", network.name);

  const CappedSet = await deploy("CappedSet", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log("CappedSet deployed to:", CappedSet.address);
  log("----------------------------------------------------");

  if (chainId != 31337) {
    await verify(CappedSet.address, arguments);
  }
};

module.exports.tags = ["CappedSet"];
