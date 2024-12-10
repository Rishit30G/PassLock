import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ConfettiButton } from '@/components/ui/confetti'

const SignInForm = () => {
  return (
    <div className="space-y-4 !mt-8 flex flex-col">
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder='Password' />
            <Button className="w-full">Sign In</Button>
            <p className='text-center text-sm text-gray-500'>Don't have an account? <a href="/sign-up">Sign Up</a></p>
    </div>
  )
}

export default SignInForm