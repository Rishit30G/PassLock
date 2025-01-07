"use client";

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card , CardContent} from './ui/card';

const Testimonial = () => {
    return (
      <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}

    >
      <CarouselContent className='px-3 py-2'>
          <CarouselItem className='basis-1/2 max-lg:basis-full p-3'>
              <Card className='min-h-[160px] pt-6 shadow-lg'>
                <CardContent className='flex flex-col justify-between'>
                  <p className="text-md italic text-zinc-500 dark:text-gray-400">
                    PassLock has made managing my passwords so much easier. I love how secure it feels with end-to-end encryption.
                    </p>
                  <div className="flex items-center justify-end gap-2 mt-4">
                  <Avatar>
                    <AvatarImage src="/user/1.png" alt="avatar" className='object-contain w-full h-full'  />
                    <AvatarFallback>JC</AvatarFallback>
                  </Avatar>
                    <div>
                      <h1 className="text-md poppins-semibold">John Carter</h1>
                      <p className="text-sm text-zinc-500">Software Engineer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </CarouselItem>
          <CarouselItem className='basis-1/2 max-lg:basis-full p-3'>
              <Card className='min-h-[160px] pt-6 shadow-lg'>
                <CardContent className='flex flex-col justify-between'>
                  <p className="text-md italic text-zinc-500 dark:text-gray-400">
                  PassLock is exactly what I needed! Its straightforward, easy to use, and I can access my saved passwords without hassle.
                    </p>
                  <div className="flex items-center justify-end gap-2 mt-4">
                  <Avatar>
                    <AvatarImage src="/user/4.png" alt="avatar"  className='object-contain w-full h-full' />
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                 <div>
                  <h1 className="text-md poppins-semibold">Sophia Nguyen</h1>
                  <p className="text-sm text-zinc-500">Freelance Designer</p>
                </div>
                  </div>
                </CardContent>
              </Card>
          </CarouselItem>
          <CarouselItem className='basis-1/2 max-lg:basis-full p-3'>
              <Card className='min-h-[160px] pt-6 shadow-lg'>
                <CardContent className='flex flex-col justify-between'>
                  <p className="text-md italic text-zinc-500 dark:text-gray-400">
                  I appreciate the simplicity and security PassLock provides. Knowing my passwords are hashed and safe gives me peace of mind.
                    </p>
                  <div className="flex items-center justify-end gap-2 mt-4">
                  <Avatar>
                  <AvatarImage src="/user/2.png" alt="avatar"   className='object-contain w-full h-full' />
                  <AvatarFallback>DL</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-md poppins-semibold">David Lee</h1>
                  <p className="text-sm text-zinc-500">Director</p>
                </div>
                  </div>
                </CardContent>
              </Card>
          </CarouselItem>
          <CarouselItem className='basis-1/2 max-lg:basis-full p-3'>
              <Card className='min-h-[160px] pt-6 shadow-lg'>
                <CardContent className='flex flex-col justify-between'>
                  <p className="text-md italic text-zinc-500 dark:text-gray-400">
                  As someone who handles multiple accounts daily, PassLock is a lifesaver. Its fast, reliable, and the search functionality is on point!
                    </p>
                  <div className="flex items-center justify-end gap-2 mt-4">
                  <Avatar>
                <AvatarImage src="/user/3.png" alt="avatar"  className='object-contain w-full h-full'/>
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
                <div>
                  <h1 className="text-md poppins-semibold">Priya Sharma</h1>
                  <p className="text-sm text-zinc-500"> Digital Marketer</p>
                </div>
                  </div>
                </CardContent>
              </Card>
          </CarouselItem>
        
      </CarouselContent>
      <CarouselPrevious className='max-lg:hidden' />
      <CarouselNext className='max-lg:hidden'/>
      
    </Carousel>
    )
}

export default Testimonial