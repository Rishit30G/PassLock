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
import { createAccount, getAccount } from "@/actions/users.action";
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
        //@ts-expect-error - password is not undefined
        const result = await createAccount(values);
        if (typeof result === "object" && "error" in result) {
          toast.error(result.error);
          return;
        }
        toast.success(result.message);
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    } else if (formType === "sign-in") {
      try {
        const result = await getAccount(values);
        if (typeof result === "object" && "error" in result) {
          toast.error(result.error);
          return;
        }
        const { message, accountId } = result;
        toast.success(message);
        setShowModal(true);
        //@ts-expect-error - accountId is not undefined
        setAccountId(accountId);
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
              {/* @ts-expect-error: Suppressing error for dynamic error message rendering */}
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {/* @ts-expect-error: Suppressing error for dynamic error message rendering */}
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
              {/* @ts-expect-error: Suppressing error for dynamic error message rendering */}
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {/* @ts-expect-error: Suppressing error for dynamic error message rendering */}
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
            className="text-sm dark:text-white/60 text-black/60 text-right !mt-3"
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
            {/* @ts-expect-error: Suppressing error for dynamic error message rendering */}
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {/* @ts-expect-error: Suppressing error for dynamic error message rendering */}
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
          <p className="text-center text-sm dark:text-white/50 text-black/50">
            Already have an account ?{" "}
            <Link href="/sign-in" className="dark:text-white/70 text-black/70">
              Sign In
            </Link>
          </p>
        ) : (
          <p className="text-center text-sm dark:text-white/50 text-black/50">
            Don&lsquo;t have an account ?{" "}
            <Link href="/sign-up" className="dark:text-white/70 text-black/70">
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
