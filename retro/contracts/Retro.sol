// SPDX-License-Identifier: MIT


// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

// initializing the CFA Library
pragma solidity ^0.8.0;

import { 
    ISuperfluid,
    ISuperToken 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol"; //"@superfluid-finance/ethereum-monorepo/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { 
    IConstantFlowAgreementV1 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {
    CFAv1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

contract Retro {

    using CFAv1Library for CFAv1Library.InitData;
    
    //initialize cfaV1 variable
    CFAv1Library.InitData public cfaV1;
    ISuperfluid public host;
    
    constructor(address _host)  {
        host = ISuperfluid(_host);
        //initialize InitData struct, and set equal to cfaV1
        cfaV1 = CFAv1Library.InitData(
            host,
            //here, we are deriving the address of the CFA using the host contract
            IConstantFlowAgreementV1(
                address(host.getAgreementClass(
                        keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
                    ))
                )
            );
    }
    
    uint256 constant tokensPerBadgeHolder = 100;
    uint256 constant minRoundCreationThreshold = 1;
    uint256 constant minNominationThreshold = 1; 
    uint256 constant minDisperseAmount = 1;

    enum RoundState {
        Nominations,
        Voting, 
        Disbursement, 
        Cancelled
    }

    struct Round {
        string roundURI;
        address[] badgeHolders;
        uint256 startBlockTimestamp;
        uint256 fundsCommitted;
        uint256 nominationCounter;
        uint256 totalVotes;
        uint256 nominationDuration;
        uint256 votingDuration;
    }

    struct Nomination {
        string nominationURI;
        address recipient;
        uint256 numVotes;
    }

    mapping (uint256 => Round) private rounds; 
    mapping (uint256 => mapping (uint256 => Nomination)) private nominations;
    mapping(uint256 => mapping (address => uint256)) private badgeHolderVoteStatus; //0 = inelligible, 1 = eligible, 2 = voted
    mapping(uint256  => uint256) private amounts;
    mapping(uint256 => uint256) private flowRates;

    uint256 private roundCounter;

    event RetroSetup(address indexed initiator);
    event NewRound(string roundURI, uint256 startBlockTimestamp, uint256 fundsCommitted);
    event NewNomination(uint256 roundNum, string nominationURI, address recipient);
    event NewVote(uint256 roundNum, address badgeHolder);
    event Disperse(address indexed recipient, uint256 amount);

    function createRound(string memory roundURI, address[] memory badgeHolders, uint256 nominationDuration, uint256 votingDuration) public payable {
        require(msg.value >= minRoundCreationThreshold, "Insufficient funds to create a new round");
        rounds[roundCounter].roundURI = roundURI;
        rounds[roundCounter].badgeHolders = badgeHolders;
        rounds[roundCounter].startBlockTimestamp = block.timestamp;
        rounds[roundCounter].fundsCommitted = msg.value;
        rounds[roundCounter].nominationDuration = nominationDuration;
        rounds[roundCounter].votingDuration = votingDuration;

        for (uint256 i = 0; i < badgeHolders.length; i++) {
            badgeHolderVoteStatus[roundCounter][badgeHolders[i]] = 1;
        }

        roundCounter++;
        emit NewRound(roundURI, block.timestamp, msg.value);
    }

    function nominate(uint256 roundNum, string memory nominationURI, address recipient) public payable {
        require(msg.value >= minNominationThreshold, "Insufficient funds to nominate");
        require((block.timestamp - rounds[roundNum].startBlockTimestamp) <= rounds[roundNum].nominationDuration, "Nomination period finished");
        Round storage round = rounds[roundNum];
        nominations[roundNum][round.nominationCounter].nominationURI = nominationURI;
        nominations[roundNum][round.nominationCounter].recipient = recipient;
        rounds[roundCounter].fundsCommitted += msg.value;
        round.nominationCounter++;
        emit NewNomination(roundNum, nominationURI, recipient);
    }

    function castVote(uint256 roundNum, uint256[] memory tokenAllocations) public {
        require((block.timestamp - rounds[roundNum].startBlockTimestamp) > rounds[roundNum].nominationDuration && ((block.timestamp - rounds[roundNum].startBlockTimestamp) <= (rounds[roundNum].nominationDuration] + rounds[roundNum].votingDuration)), "Voting period not started or finished");
        require(badgeHolderVoteStatus[roundNum][msg.sender] == 1, "You are not eligible to vote or have already voted");
        Round storage round = rounds[roundNum];
        uint256 tokenSum;
        uint256 votePowerSum;
        for (uint256 i = 0; i <= round.nominationCounter; i++) {
            Nomination storage nomination = nominations[roundNum][i];
            uint256 votePower = sqrt(tokenAllocations[i]); // QV vote 
            nomination.numVotes += votePower;
            votePowerSum += votePower;
            tokenSum += tokenAllocations[i];
        }
        require(tokenSum == tokensPerBadgeHolder, "Incorrect total number of tokens");
        round.totalVotes += votePowerSum;
        badgeHolderVoteStatus[roundNum][msg.sender] = 2;
        emit NewVote(roundNum, msg.sender);
    }

    function toInt96(uint256 value) internal pure returns (int96) {
        require(value <= uint256(int256(type(int96).max)), "SafeCast96: value doesn't fit in 96 bits");
        return int96(int256(value));
    }

    function disperseFunds(uint roundNum) public {
        require((block.timestamp - rounds[roundNum].startBlockTimestamp) > (rounds[roundNum].nominationDuration + rounds[roundNum].votingDuration), 'Only disperse funds after round is completed');
        uint totalNumVotes = rounds[roundNum].totalVotes;
        for(uint i=0; i < rounds[roundNum].nominationCounter; i++){
            uint256 amount = (nominations[roundNum][i].numVotes * rounds[roundNum].fundsCommitted)/totalNumVotes;
            console.log("amount");
            console.log(amount);
            amounts[i] = amount;
            if(amount > minDisperseAmount) {
                (bool sent,) = nominations[roundNum][i].recipient.call{value: amount/2}("");
                require(sent, 'Failed to send');
                emit Disperse(nominations[roundNum][i].recipient, amount);
                cfaV1.createFlow(nominations[roundNum][i].recipient, ISuperToken(0xe72f289584eDA2bE69Cfe487f4638F09bAc920Db), toInt96((1)));
            }
        }
    }


    /// @notice Calculates the square root of x, rounding down.
    /// @dev Uses the Babylonian method https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method.
    ///
    /// Caveats:
    /// - This function does not work with fixed-point numbers.
    ///
    /// @param x The uint256 number for which to calculate the square root.
    /// @return result The result as an uint256.
    function sqrt(uint256 x) internal pure returns (uint256 result) {
        if (x == 0) {
            return 0;
        }

        // Calculate the square root of the perfect square of a power of two that is the closest to x.
        uint256 xAux = uint256(x);
        result = 1;
        if (xAux >= 0x100000000000000000000000000000000) {
            xAux >>= 128;
            result <<= 64;
        }
        if (xAux >= 0x10000000000000000) {
            xAux >>= 64;
            result <<= 32;
        }
        if (xAux >= 0x100000000) {
            xAux >>= 32;
            result <<= 16;
        }
        if (xAux >= 0x10000) {
            xAux >>= 16;
            result <<= 8;
        }
        if (xAux >= 0x100) {
            xAux >>= 8;
            result <<= 4;
        }
        if (xAux >= 0x10) {
            xAux >>= 4;
            result <<= 2;
        }
        if (xAux >= 0x8) {
            result <<= 1;
        }

        // The operations can never overflow because the result is max 2^127 when it enters this block.
        unchecked {
            result = (result + x / result) >> 1;
            result = (result + x / result) >> 1;
            result = (result + x / result) >> 1;
            result = (result + x / result) >> 1;
            result = (result + x / result) >> 1;
            result = (result + x / result) >> 1;
            result = (result + x / result) >> 1; // Seven iterations should be enough
            uint256 roundedDownResult = x / result;
            return result >= roundedDownResult ? roundedDownResult : result;
        }
    }

    function getRoundData(uint256 roundNum) public view returns(string memory, uint256, uint256, uint256, uint256, uint256, uint256) {
        return (rounds[roundNum].roundURI, rounds[roundNum].startBlockTimestamp, rounds[roundNum].fundsCommitted, rounds[roundNum].nominationCounter, rounds[roundNum].totalVotes, rounds[roundNum].nominationDuration, rounds[roundNum].votingDuration);
    }

    function getNominationData(uint256 roundNum, uint256 nominationNum) public view returns (string memory, address, uint256) {
        return (nominations[roundNum][nominationNum].nominationURI, nominations[roundNum][nominationNum].recipient, nominations[roundNum][nominationNum].numVotes);
    }

    function getNextRoundNum() public view returns (uint256) {
        return roundCounter;
    }

    function getAmountData(uint256 nominationNum) public view returns (uint256) {
        return amounts[nominationNum];
    }

    function getBadgeHolderStatus(uint256 roundNum, address badgeHolder) public view returns (uint256) {    
        return badgeHolderVoteStatus[roundNum][badgeHolder];
    }
}
