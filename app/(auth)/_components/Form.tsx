// AuthForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema } from "@/lib/zodSchema/schemas";
import { z } from "zod";
import { toast } from "sonner";
import {
  createAccount,
  getAccount, 
} from "@/actions/users.action";
import { useRouter } from "next/navigation";
import OTPForm from "./OTPForm";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import InputDemo from "@/app/(main)/dashboard/_components/PasswordInput";

interface FormProps {
  formType: string;
}

const AuthForm = ({ formType }: FormProps) => {
  const [showModal, setShowModal] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [loading, setLoading] = useState(false);
  const schema = authFormSchema(formType);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const email = watch("email");

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    if (formType === "sign-up") {
      try {
        const result = await createAccount(values);
        toast.success(result.message);
        router.push("/sign-in");
      } catch (error) {
        toast.error((error as Error)?.message || "Failed to create account");
      } finally {
        setLoading(false);
      }
    } else if (formType === "sign-in") {
      try {
        const { message, accountId } = await getAccount(values);
        toast.success(message);
        setShowModal(true);
        setAccountId(accountId);
      } catch (error) {
        toast.error((error as Error)?.message || "Failed to sign in");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <form
        className="space-y-4 !mt-8 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formType === "sign-up" && (
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
                autoComplete="off"
              />
                {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <Input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
                autoComplete="off"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
        )}
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          autoComplete="off"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <InputDemo
          register={{ ...register("password") }}
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        {formType === "sign-in" && (
          <Link
            className="text-sm dark:text-gray-400 text-gray-500 text-right !mt-3"
            href="/forgot-password"
          >
            Forgot Password ?
          </Link>
        )}

        {formType === "sign-up" && (
          <>
            <InputDemo
              register={{ ...register("confirmPassword") }}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </>
        )}
        <Button
          className={`w-full flex items-center ${loading && "text-gray-400"}`}
          disabled={loading}
        >
          {formType === "sign-up" ? "Sign Up" : "Sign In"}
          {loading && <Loader2 className="w-6 h-6 ml-2 animate-spin" />}
        </Button>
        {formType === "sign-up" ? (
          <p className="text-center text-sm dark:text-gray-500 text-gray-400">
            Already have an account?{" "}
            <Link href="/sign-in" className="dark:text-gray-400 text-gray-500">
              Sign In
            </Link>
          </p>
        ) : (
          <p className="text-center text-sm text-gray-500">
            Don't have an account ?{" "}
            <Link href="/sign-up" className="dark:text-gray-400 text-gray-500">
              Sign Up
            </Link>
          </p>
        )}
      </form>
      {showModal && <OTPForm accountId={accountId} email={email} />}
    </>
  );
};

export default AuthForm;
