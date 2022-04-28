export default function Form(props) {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
      <div className="row-span-3 col-span-4 bg-white rounded-xl shadow-md">
        <div className="overflow-y-auto p-5">
          <form onSubmit={props.onSubmit}>
            <div className="grid grid-rows-2 grid-flow-col gap-4">
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Nominator name</label>
                <input type="text" placeholder="Retro" name="nominatorName" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Project name</label>
                <input type="text" placeholder="Retro" name="projectName" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Project URL</label>
                <input type="url" placeholder="Retro" name="projectURL" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Project lead name</label>
                <input type="text" placeholder="Retro" name="projectLeadName" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Project recipient address</label>
                <input type="text" name="recipientAddress" placeholder="Retro" className="border rounded-xl p-2" maxLength='42' required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Rationale for nomination</label>
                <textarea name="rationale" className="border rounded-xl p-2" placeholder="This is a description" rows="4" cols="50" required></textarea>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <input type="submit" className="border rounded-xl p-2 bg-blue-600 text-white hover:bg-blue-400 text-lg px-4" text="Nominate"></input>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
