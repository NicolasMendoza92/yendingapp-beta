import React from 'react'
import Spinner from './spinner'
import Image from 'next/image'

export default function Loader() {
  return (
    <div className="relative flex h-full w-full items-center justify-center m-auto min-h-screen animate-pulse">
      {/* Spinner */}
{/*       <Spinner />
 */}      <div className="absolute flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-secondary_b border-t-transparent"></div>
      </div>
      {/* Image */}
      <div className="absolute">
        <Image
          src="/images/logo.png"
          alt="Loading"
          width={48}
          height={48}
          className="w-12 h-12 ="
        />
      </div>
    </div>
  )
}


