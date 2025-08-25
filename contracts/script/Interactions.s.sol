// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";
import {CertificationNft} from "../src/CertificationNft.sol";

contract MintCertificationNft is Script {
    string public constant CDN =
        "ipfs://bafkreid7ak5xvbrlg7hsmhxlhn4dlexahzqktg7objj7jm74iax6knwara";

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
