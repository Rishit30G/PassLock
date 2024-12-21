"use client"

import { recoveryPassword } from '@/actions/users.action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { forgotPasswordSchema } from '@/lib/zodSchema/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const ForgotPasswordForm = () => {

    const [loading, setLoading] = useState(false);
    const schema = forgotPasswordSchema;
    const router = useRouter();

    const {
        register,
         handleSubmit, 
         formState: {errors},
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof schema>) {
        setLoading(true);
        const userEmail = values.email;
        try{
          await recoveryPassword(userEmail);
          toast.success('Email sent successfully');
          router.push('/reset-password');
        }catch(error){
          toast.error((error as Error)?.message || 'Email not sent, try again!');
        }
        finally{
          setLoading(false);
        }
    }

  return (
    <form className='space-y-4 flex !mt-8 flex-col' onSubmit={handleSubmit(onSubmit)}>
        <p className='text-sm text-gray-500'>Enter your registerd email address and we'll send you a link to reset your password.</p>
      <Input placeholder='Email' {...register('email')} />
        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
        <Button className={`w-full flex items-center ${loading && 'text-gray-400'}`} disabled={loading}>
           Send Email
           {
             loading && <Loader2 className="w-6 h-6 ml-2 animate-spin" />
           }
      </Button>
    </form>
  )
}

export default ForgotPasswordForm