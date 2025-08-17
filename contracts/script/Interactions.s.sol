// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";
import {CertificationNft} from "../src/CertificationNft.sol";

contract MintCertificationNft is Script {
    string public constant CDN =
        "https://bafybeifh36hd37ie5yti6xh5gzgzdamhtbozg5rxhym6ondp4qzswactpe.ipfs.dweb.link?filename=certificate.png.png";

    function run() external {
        address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployment(
            "CertificationNft",
            block.chainid
        );
        mintNftOnContract(mostRecentlyDeployed);
    }

    function mintNftOnContract(address contractAddress) public {
        vm.startBroadcast();
        CertificationNft(contractAddress).mintNft(CDN);
        vm.stopBroadcast();
    }
}
