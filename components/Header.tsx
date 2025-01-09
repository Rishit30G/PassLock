import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ModeToggle'

const Header = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 my-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl poppins-regular">
            <Link href="/" className="cursor-pointer">
              PassLock
            </Link>
          </h1>
            <ModeToggle />
        </div>
      </div>
  )
}

export default Header