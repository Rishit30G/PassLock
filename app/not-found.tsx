import { ConfettiButton } from '@/components/ui/confetti'
import Image from 'next/image'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PassLock - Not Found",
  description: "Page not found",
}

const page = () => {
  return (
    <>
    <div className='min-h-screen flex justify-center items-center flex-col gap-4'>
        <h1 className="poppins-extralight text-6xl text-center">Not Found: 404</h1>
        <Image src="/404.jpg" width={500} height={500} alt="404" />
        <h2 className='poppins-light'>You are here faster than we could build it 🥹</h2>
        <ConfettiButton>🎊</ConfettiButton> 
    </div>
    </>
  )
}

export default page