"use client";

import { ModeToggle } from '@/components/ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FlipWords } from '@/components/ui/flip-words';
import { Input } from '@/components/ui/input';
import Particles from '@/components/ui/particles';
import { Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button';
import DashboardCards from './_components/Card';
import DialogComponent from './_components/DialogComponent';


const Dashboard = () => {

  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
 
  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <>
    <div className='relative'>
    <Particles
        className="absolute inset-0"
        quantity={50}
        ease={80}
        color={color}
        refresh
      />
    <div className='container max-w-7xl mx-auto'>
      <div className='flex justify-between items-center pt-5 pb-14'>
        <h4 className='poppins-regulat text-2xl'>
          PassLock
        </h4>
        <div className='flex items-center justify-center gap-5'>
        <ModeToggle/>
        <Avatar className='h-10 w-10'>
          <AvatarImage src="https://uttrakhandcoldandcuttings.co.in/images/sticker-memoji-iphone.jpg" className='object-cover cursor-pointer'/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        </div>
      </div>
     

    </div>

    </div>
    <div className="h-fit relative flex flex-col items-center justify-center gap-7 py-14">
                   
      <h1 className="text-7xl poppins-medium text-center">Welcome, 
      {/* Rishit! */}
      <FlipWords words={["●●●●●", "Rishit!"]} />
      </h1>
      <Particles
        className="absolute inset-0"
        quantity={50}
        ease={80}
        color={color}
        refresh
      />
    </div>
    <div className='container max-w-7xl mx-auto min-h-screen py-20'>
      <div className='flex items-center justify-between gap-5'>
        <h1 className='text-xl poppins-light'>E lo fado password 🤡</h1>
        <div className='flex items-center gap-5 '>
          <div className='relative w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500' />
              <Input placeholder='Search' className='pl-10 w-[280px]'/>
          </div>
          <DialogComponent text="Add details">
            <Button className="inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-white transition-colors">
              Add New
            </Button>
          </DialogComponent>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-x-10 gap-10'>
        <DashboardCards />
      </div>
    </div>
    <div className='container max-w-7xl mx-auto relative'>
      <footer className='p-10'>
        <h1 className='text-center text-lg'>Made by Rishit 🧑🏻‍💻</h1>
      </footer>
    </div>


    </>
  )
}

export default Dashboard;