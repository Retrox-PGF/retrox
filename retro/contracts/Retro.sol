// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

contract Retro {

    uint256 constant totalVotesPerBadgeHolder = 100;
    uint256 constant nominationDuration = 1;
    uint256 constant votingDuration = 1;
    uint256 private funds;

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
    event Disperse(address indexed, uint256);

    // Only the safe owners can create a new round.
    function createRound(uint256 roundURI, address[] memory badgeHolders, uint256 fundsCommitted) public {

        rounds[roundCounter].roundURI = roundURI;
        rounds[roundCounter].badgeHolders = badgeHolders;
        rounds[roundCounter].startBlockTimestamp = block.timestamp;
        rounds[roundCounter].fundsCommitted = fundsCommitted;

        emit RoundCreated(roundURI, block.timestamp, fundsCommitted);
        roundCounter++;
    }

    // function nominate(uint256 nominationURI) virtual public;


    // function vote(uint256 nominationURI, uint256 votePower) virtual public;

    function disperseFunds(uint roundNum) public {
        require((block.timestamp - rounds[roundNum].startBlockTimestamp) >= (nominationDuration + votingDuration), 'Only disperse funds after round is completed');
        uint totalNumVotes = totalVotesPerBadgeHolder * rounds[roundNum].badgeHolders.length;
        for(uint i=0; i < rounds[roundNum].nominationCounter; i++){
            uint amount = (nominations[roundNum][i].numVotes / totalNumVotes) * funds;
            (bool sent,) = nominations[roundNum][i].recipient.call{value: amount}("");
            require(sent, 'Failed to send');
            emit Disperse(nominations[roundNum][i].recipient, amount);
        }

    }


}
