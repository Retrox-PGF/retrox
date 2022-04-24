import { ethers } from "ethers"

export async function getRounds() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

    const retroAddress = "0x3cAD7cd0d54E0794D5864e9979B21a60E04fDC6b"
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