export default function Form(props) {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
      <div className="row-span-3 col-span-4 bg-white rounded-xl shadow-md">
        <div className="overflow-y-auto p-5">
          <form onSubmit={props.onSubmit}>
            <div className="grid grid-rows-2 grid-flow-col gap-4">
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Round name</label>
                <input type="text" placeholder="AI safety" name="roundName" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Funding Amount (in ETH)</label>
                <input type="number" placeholder="0.1" name="funding" step="0.001" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Nomination Duration (in days)</label>
                <input type="number" placeholder="21" name="nominationDuration" step="1" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Voting Duration (in days)</label>
                <input type="number" placeholder="7" name="votingDuration" step="1" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Staking Amount</label>
                <input type="number" placeholder="0.001" name="stakingAmount" step="0.001" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">No funding round</label>
                <input type="checkbox" placeholder="0.001" name="noFundingRound" step="0.001" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Voting Type</label>
                <select name="votingType">
                  <option value="QF">Quadratic Funding</option>
                  <option value="QF">Binary (Yes/No) Voting</option>
                  <option value="QF">One-person, one-vote</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Short description</label>
                <input type="text" placeholder="Funding research in AI safety" name="description" className="border rounded-xl p-2" required maxLength="400"></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Badgeholders (entries on a seperate line)</label>
                <textarea name="badgeholders" className="border rounded-xl p-2" placeholder="address, Twitter handle" rows="4" cols="50" required></textarea>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <input type="submit" className="border rounded-xl p-2 bg-blue-600 text-white hover:bg-blue-400 text-lg px-4" text="Create round"></input>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
