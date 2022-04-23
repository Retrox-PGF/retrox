// SPDX-License-Identifier: MIT


// import "@openzeppelin/contracts/utils/math/SafeMath.sol";

pragma solidity >=0.8.0;

contract Retro {

    uint256 constant tokensPerBadgeHolder = 100;
    uint256 constant nominationDuration = 1;
    uint256 constant votingDuration = 1;
    uint256 constant minRoundCreationThreshold = 1;
    uint256 constant minNominationThreshold = 1; 

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
    }

    struct Nomination {
        string nominationURI;
        address recipient;
        uint256 numVotes;
    }

    //Nominations[roundNum][i].numVotes
    mapping (uint256 => Round) public rounds; 
    mapping (uint256 => mapping (uint256 => Nomination)) public nominations;

    uint256 public roundCounter;

    event RetroSetup(address indexed initiator);
    event NewRound(string roundURI, uint256 startBlockTimestamp, uint256 fundsCommitted);
    event NewNomination(uint256 roundNum, string nominationURI, address recipient);
    event NewVote(uint256 roundNum, address badgeHolder);

    function createRound(string memory roundURI, address[] memory badgeHolders) public payable {
        require(msg.value >= minRoundCreationThreshold, "Insufficient funds to create a new round");
        rounds[roundCounter].roundURI = roundURI;
        rounds[roundCounter].badgeHolders = badgeHolders;
        rounds[roundCounter].startBlockTimestamp = block.timestamp;
        rounds[roundCounter].fundsCommitted = msg.value;
        roundCounter++;
        emit NewRound(roundURI, block.timestamp, msg.value);
    }

    function nominate(uint256 roundNum, string memory nominationURI, address recipient) public payable {
        require(msg.value >= minNominationThreshold, "Insufficient funds to nominate");
        Round storage round = rounds[roundNum];
        nominations[roundNum][round.nominationCounter].nominationURI = nominationURI;
        nominations[roundNum][round.nominationCounter].recipient = recipient;
        rounds[roundCounter].fundsCommitted += msg.value;
        round.nominationCounter++;
        emit NewNomination(roundNum, nominationURI, recipient);
    }

    function castVote(uint256 roundNum, uint256[] memory tokenAllocations) public {
        Round memory round = rounds[roundNum];
        uint256 tokenSum;
        for (uint256 i = 0; i < round.nominationCounter; i++) {
            Nomination storage nomination = nominations[roundNum][i];
            uint256 votePower = sqrt(tokenAllocations[i]); // QV vote 
            nomination.numVotes += votePower;
            tokenSum += tokenAllocations[i];
        }
        require(tokenSum == tokensPerBadgeHolder, "Incorrect total number of tokens");
        emit NewVote(roundNum, msg.sender);
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

}


