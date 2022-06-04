export default function NominationsGridSkeleton() {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
      <div className="flex flex-col md:col-span-1 md:row-span-2 bg-white rounded-xl shadow-md">
        <div className="flex flex-row justify-between">
          <div className="px-10 py-5 font-semibold border-b border-gray-100 flex">
            <span className="w-64 h-8 rounded-md bg-gray-300 animate-pulse"></span>
          </div>
        </div>
        <div className="p-4 flex-grow">
        <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
          <ul className="p-3">
            <li className="flex items-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-700 p-2 rounded-xl hover:text-white group">
              <div className="flex flex-col">
              <span className="w-80 h-6 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              </div>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
            </li>
            <li className="flex items-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-700 p-2 rounded-xl hover:text-white group">
              <div className="flex flex-col">
              <span className="w-80 h-6 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              </div>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
            </li>
            <li className="flex items-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-700 p-2 rounded-xl hover:text-white group">
              <div className="flex flex-col">
              <span className="w-80 h-6 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              </div>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
            </li>
            <li className="flex items-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-700 p-2 rounded-xl hover:text-white group">
              <div className="flex flex-col">
              <span className="w-80 h-6 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              </div>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
            </li>
          </ul>
        </div>
        </div>
      </div>
      <div className="row-span-3 bg-white rounded-xl shadow-md md:col-span-3" style={{ maxHeight: "30rem" }}>
        <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100 text-xl">
          <span className="w-80 h-8 rounded-md bg-gray-300 animate-pulse"></span>
        </div>
        <div className="overflow-y-auto p-5" style={{ maxHeight: "24rem" }}>
            <div className="grid grid-rows-8 grid-cols-3 mb-2">
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
              <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
            </div>
          <span className="w-80 h-6 rounded-md bg-gray-300 animate-pulse mb-2"></span>
          <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></span>
        </div>
      </div>
    </section>
  )
}
