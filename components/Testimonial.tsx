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

const Testimonial = () => {
    return (
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className='px-5'
      >
        <CarouselContent className='p-7 gap-6'>
            <CarouselItem className='basis-1/2 shadow-lg p-8 max-lg:basis-full'>
              <p className="text-md italic text-zinc-500">
              PassLock has made managing my passwords so much easier. The UI is intuitive, and I love how secure it feels with end-to-end encryption.
              </p>
              <div className="flex items-center justify-end gap-2 mt-4">
              <Avatar>
                <AvatarImage src="/user/youngman.png" alt="avatar"  className='object-contain w-12 h-12'  />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
                <div>
                  <h1 className="text-md poppins-semibold">John Carter</h1>
                  <p className="text-sm text-zinc-500">Software Engineer</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className='basis-1/2 shadow-lg p-8 max-lg:basis-full'>
              <p className="text-md italic text-zinc-500">
              PassLock is exactly what I needed! Its straightforward, easy to use, and I can access my saved passwords without hassle.
              </p>
              <div className="flex items-center justify-end gap-2 mt-4">
              <Avatar>
                <AvatarImage src="/user/officewomen.png" alt="avatar"   className='object-contain w-12 h-12' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
                <div>
                  <h1 className="text-md poppins-semibold">Sophia Nguyen</h1>
                  <p className="text-sm text-zinc-500">Freelance Designer</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className='basis-1/2 shadow-lg p-8 max-lg:basis-full'>
              <p className="text-md italic text-zinc-500">
              I appreciate the simplicity and security PassLock provides. Knowing my passwords are hashed and safe gives me peace of mind.
              </p>
              <div className="flex items-center justify-end gap-2 mt-4">
                <Avatar>
                  <AvatarImage src="/user/oldman.png" alt="avatar"   className='object-contain w-12 h-12' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-md poppins-semibold">David Lee</h1>
                  <p className="text-sm text-zinc-500">Director</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className='basis-1/2 shadow-lg p-8 max-lg:basis-full'>
              <p className="text-md italic text-zinc-500">
              As someone who handles multiple accounts daily, PassLock is a lifesaver. Its fast, reliable, and the search functionality is on point!
              </p>
              <div className="flex items-center justify-end gap-2 mt-4">
              <Avatar>
                <AvatarImage src="/user/youngwomen.png" alt="avatar"  className='object-contain w-12 h-12'/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
                <div>
                  <h1 className="text-md poppins-semibold">Priya Sharma</h1>
                  <p className="text-sm text-zinc-500"> Digital Marketer</p>
                </div>
              </div>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
}

export default Testimonial