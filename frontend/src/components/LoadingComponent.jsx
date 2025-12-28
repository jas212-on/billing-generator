import React from 'react'

function LoadingComponent({message}) {
  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl px-10 py-12 flex flex-col items-center space-y-6">

        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <h1 className="text-xl font-semibold text-blue-700">
            Loading
          </h1>
          <p className="text-sm text-gray-600 animate-pulse">
            {message}
          </p>
        </div>

      </div>
    </div>
  )
}

export default LoadingComponent