export default function HeaderGridSkeleton() {
  return (
    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
      <div className="mr-6 flex flex-col">
        <span className="w-80 h-10 rounded-md bg-gray-300 animate-pulse mb-2"></span>
        <span className="w-64 h-6 rounded-md bg-gray-300 animate-pulse mb-2"></span>
      </div>
      <div className="flex flex-wrap items-start justify-end -mb-3">
        <div className="inline-flex px-5 py-3 text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-green-600 hover:to-blue-600 rounded-xl shadow-md ml-6 mb-3">
          <span className="w-32 h-4 rounded-md bg-gray-300 animate-pulse"></span>
        </div>
      </div>
    </div>
  )
}
