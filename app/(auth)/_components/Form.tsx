// AuthForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema } from "@/lib/zodSchema/schemas";
import { z } from "zod";

interface FormProps {
  formType: string;
}

const AuthForm = ({ formType }: FormProps) => {
  const schema = authFormSchema(formType);

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema), 
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
  }

  return (
    <form className="space-y-4 !mt-8 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {formType === "sign-up" && (
        <div className="flex gap-4">
          <div className="flex-1 space-y-4">
            <Input type="text" placeholder="First Name" {...register("firstName")} autoComplete="off"/>
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>
          <div className="flex-1 space-y-4">
            <Input type="text" placeholder="Last Name" {...register("lastName")}  autoComplete="off"/>
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
        </div>
      )}
      <Input type="email" placeholder="Email" {...register("email")}  autoComplete="off"/>
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      {formType === "sign-up" && (
        <>
          <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </>
      )}
      <Button className="w-full">{formType === "sign-up" ? "Sign Up" : "Sign In"}</Button>
      {formType === "sign-up" ? (
        <p className="text-center text-sm text-gray-500">
          Already have an account? <a href="/sign-in">Sign In</a>
        </p>
      ) : (
        <p className="text-center text-sm text-gray-500">
          Don't have an account? <a href="/sign-up">Sign Up</a>
        </p>
      )}
    </form>
  );
};

export default AuthForm;