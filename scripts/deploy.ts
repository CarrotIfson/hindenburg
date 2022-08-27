import { ethers, hardhatArguments } from "hardhat";
import  * as Config from "./config";

async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
  const [deployer] = await ethers.getSigners();
  console.log('deployer address: ', deployer.address);

  const TheShire = await ethers.getContractFactory("TheShire");
  const theShire = await TheShire.deploy("TheShire","SHR");
  console.log('Deployed TheShire on: ', theShire.address);
  Config.setConfig(network + '.TheShire', theShire.address); 

  //FRODO
  await theShire.mint("https://ipfs.io/ipfs/QmQNXLhQz923BwcsPqrgpH6kcto8J46WVkLvkb4NUxc7XZ");
  console.log("Minted Frodo");
  //SAM
  await theShire.mint("https://ipfs.io/ipfs/QmZFc7kFAysZJy2Hgrk3L6P1VweyYGTj6JvoRK5Lhavx4G");
  console.log("Minted SAM");
  await Config.updateConfig();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
