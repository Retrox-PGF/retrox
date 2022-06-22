export default function NominationDetail(props) {
  return (
    <>
    <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100 text-xl">
      <span>{props.nomination ? props.nomination.projectName : 'Click on nomination to view details'}</span>
    </div>
    <div className="overflow-y-auto p-5" style={{ maxHeight: "24rem" }}>
      {props.nomination ?
        <>
        <div className="font-semibold text-lg">Information</div>
        <div className="grid grid-rows-2 grid-flow-col mb-2">
          <div>Proposer: {props.nomination.nominatorName}</div>
          <div>Website: <a href={props.nomination.projectURL} target="_blank" rel="noreferrer" className="text-blue-600">{props.nomination.projectName}</a></div>
          <div>Categories: {props.nomination.projectLeadName}</div>
        </div>
      <div className="font-semibold mt-2 text-lg">Description</div>
        <p>
        {props.nomination.rationale}
      </p>
      </>
      :
      null}
    </div>
    </>
  )
}
