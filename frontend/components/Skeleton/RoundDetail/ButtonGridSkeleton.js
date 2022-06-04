function CardSkeleton() {
  return (
    <div className="flex flex-col items-center align-center p-8 bg-white rounded-xl shadow-md">
      <span className="w-80 h-6 rounded-md bg-gray-300 animate-pulse mb-2"></span>
      <span className="w-80 h-4 rounded-md bg-gray-300 animate-pulse"></span>
    </div>
  )
}

export default function ButtonBar() {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      <CardSkeleton>
      </CardSkeleton>
      <CardSkeleton>
      </CardSkeleton>
      <CardSkeleton>
      </CardSkeleton>
      <CardSkeleton>
      </CardSkeleton>
    </section>
  )
}
