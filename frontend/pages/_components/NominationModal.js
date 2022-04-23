const NominationModal = (props) => {

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none py-5" onClick={() => {props.close();}}
      >
        <div className="relative w-auto my-6 mx-auto max-w-full max-h-screen my-5 mx-5 py-5">
          <div className="border rounded-2xl shadow-lg relative bg-black flex flex-col w-full outline-none focus:outline-none" onClick={e => {e.stopPropagation();}}>
            <div className="relative p-6 flex-auto mx-auto text-center text-white text-4xl">
              <h2 className="font-bold my-4 text-purple-600">Info</h2>
                  <p className="my-4 text-white text-xl leading-relaxed my-5 max-w-sm text-clip overflow-auto">
                    <strong className="text-purple-600">{props.nomination.timestamp}</strong><br />
                    <strong>Other</strong>
                  </p>
                  <p className="my-4 text-lg leading-relaxed my-3">
                    <strong className="text-md text-white">Nominator</strong><br/>
                    <small className="text-gray-500 my-0 text-md">..</small>
                  </p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default NominationModal;
