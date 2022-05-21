import { ethers } from "ethers"
import { deployed_address } from '../contract_config.js';

export async function getRounds() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

    const retroAddress = deployed_address
    const retroABI = [
      "function getNextRoundNum() public view returns (uint256)",
      "function getRoundData(uint256 roundNum) public view returns(string memory, uint256, uint256, uint256, uint256)"
    ]
    const retroContract = new ethers.Contract(retroAddress, retroABI, provider);

    const numRounds = (await retroContract.getNextRoundNum()).toNumber();

    let rounds = []
    for (let i = 0; i < numRounds; i++) {
        const round = await retroContract.getRoundData(i);
        rounds.push({
            roundURI: round[0],
            startBlockTimestamp: round[1].toNumber(),
            fundsCommitted: ethers.utils.formatEther(round[2]),
            nominationCounter: round[3].toNumber(),
            totalVotes: round[4].toNumber(),
        })
    }

    return rounds;
}