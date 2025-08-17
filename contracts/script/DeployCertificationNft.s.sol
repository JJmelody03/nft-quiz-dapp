// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Script} from "forge-std/Script.sol";
import {CertificationNft} from "../src/CertificationNft.sol";
contract DeployCertificationNft is Script{
function run() external returns(CertificationNft){
  vm.startBroadcast();
  CertificationNft certificationNft = new CertificationNft();
  vm.stopBroadcast();
  return certificationNft;

}
}