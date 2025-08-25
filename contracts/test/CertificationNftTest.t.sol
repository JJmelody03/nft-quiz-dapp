// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Test} from "forge-std/Test.sol";
import {CertificationNft} from "../src/CertificationNft.sol";
import {DeployCertificationNft} from "../script/DeployCertificationNft.s.sol";

contract CertificationNftTest is Test {
    DeployCertificationNft public deployer;
    CertificationNft public certificationNft;
    address public USER = makeAddr("user");
    string public constant CDN = "https://gateway.pinata.cloud/ipfs/bafkreifpgh4uueny6xetol3y7sbhcdffvxgldhxfiyefv42abzxh774crm";


    function setUp() public {
        deployer = new DeployCertificationNft();
        certificationNft = deployer.run();
    }

    function testNameIsCorrect() public {
        string memory expectedName = "ChaindustryCertificationNFT";
        string memory actualName = certificationNft.name();
        assert(
            keccak256(abi.encodePacked(expectedName)) ==
            keccak256(abi.encodePacked(actualName))
        );
    }

    function testSymbolIsCorrect() public  {
        string memory expectedSymbol = "CDN";
        string memory actualSymbol = certificationNft.symbol();
        assertEq(actualSymbol, expectedSymbol);
    }

    function testCanMintAndHaveBalance() public {
        vm.prank(USER);
        certificationNft.mintNft(CDN);

        assert(certificationNft.balanceOf(USER) == 1);
        assert(
            keccak256(abi.encodePacked(CDN)) ==
            keccak256(abi.encodePacked(certificationNft.tokenURI(0)))
        );
    }
}
