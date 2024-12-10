import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const SignUpForm = () => {
  return (
    <div className="space-y-4 !mt-8 flex flex-col">
        <div className="flex gap-4">
            <Input type="text" placeholder="First Name" />
            <Input type="text" placeholder="Last Name" />
        </div>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder='Password' />
            <Input type="password" placeholder='Confirm Password' />
            <Button className="w-full">Sign Up</Button>
            <p className='text-center text-sm text-gray-500'>Already have an account? <a href="/sign-in">Sign In</a></p>
    </div>
  )
}

export default SignUpForm