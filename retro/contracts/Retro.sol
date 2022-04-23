// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

abstract contract Retro {

    uint256 constant totalVotesPerBadgeHolder = 100;
    uint256 constant nominationDuration = 1;
    uint256 constant votingDuration = 1;

    enum RoundState {
        Nominations,
        Voting, 
        Disbursement, 
        Cancelled
    }

    struct Round {
        uint256 roundURI;
        address[] badgeHolders;
        uint256 startBlockTimestamp;
        uint256 fundsCommitted;
        uint256 votePowerTotal; 
        uint256 nominationCounter;
        
    }

    struct Nomination {
        uint256 nominationURI;
        address recipient;
        uint256 numVotes;
    }

    //Nominations[roundNum][i].numVotes
    mapping (uint256 => Round) public rounds; 
    mapping (uint256 => mapping (uint256 => Nomination)) public nominations;

    uint256 public roundCounter;

    event RPGFSetup(
        address indexed initiator,
        address indexed owner,
        address indexed avatar,
        address target
    );

    event RoundCreated(uint256 roundURI, uint256 startBlockTimestamp, uint256 fundsCommitted);

    // Only the safe owners can create a new round.
    function createRound(uint256 roundURI, address[] memory badgeHolders, uint256 fundsCommitted) public {

        rounds[roundCounter].roundURI = roundURI;
        rounds[roundCounter].badgeHolders = badgeHolders;
        rounds[roundCounter].startBlockTimestamp = block.timestamp;
        rounds[roundCounter].fundsCommitted = fundsCommitted;

        emit RoundCreated(roundURI, block.timestamp, fundsCommitted);
        roundCounter++;
    }

    function nominate(uint256 nominationURI) virtual public;


    function vote(uint256 nominationURI, uint256 votePower) virtual public;


}
