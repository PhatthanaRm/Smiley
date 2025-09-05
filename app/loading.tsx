export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-smiley-mango/5 via-smiley-strawberry/5 to-smiley-yuzu/5">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-smiley-mango to-smiley-strawberry rounded-full flex items-center justify-center animate-pulse">
          <span className="text-2xl">😊</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Loading...
        </h2>
        <p className="text-gray-600">
          Please wait while we prepare something amazing for you!
        </p>
      </div>
    </div>
  )
}
