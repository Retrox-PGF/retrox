// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

contract Retro {

    uint256 constant totalVotesPerBadgeHolder = 100;
    uint256 constant nominationDuration = 1;
    uint256 constant votingDuration = 1;
    uint256 constant minFundingThreshold = 1; 

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
        uint256 votePowerTotal; 
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
    event NewNomination(string nominationURI, address recipient);

    // Only the safe owners can create a new round.
    function createRound(string memory roundURI, address[] memory badgeHolders, uint256 fundsCommitted) public {
    
        rounds[roundCounter].roundURI = roundURI;
        rounds[roundCounter].badgeHolders = badgeHolders;
        rounds[roundCounter].startBlockTimestamp = block.timestamp;
        rounds[roundCounter].fundsCommitted = fundsCommitted;
        roundCounter++;
        emit NewRound(roundURI, block.timestamp, fundsCommitted);
    }

    function nominate(uint256 roundNum, string memory nominationURI, address recipient) public {
        //check nomination is valid 
        Round memory round = rounds[roundNum];
        nominations[roundNum][round.nominationCounter].nominationURI = nominationURI;
        nominations[roundNum][round.nominationCounter].recipient = recipient;
        round.nominationCounter++;
        emit NewNomination(nominationURI, recipient);
    }

    // function vote(uint256 nominationURI, uint256 votePower) virtual public;

}


