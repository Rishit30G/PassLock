"use client";

import InputDemo from "@/app/(main)/dashboard/_components/PasswordInput";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/zodSchema/schemas";
import { resetPassword, updateUserPassword } from "@/actions/users.action";
import { usePathname, useRouter} from "next/navigation";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const schema = resetPasswordSchema;
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    const password = values.password; 
    const userId = searchParams.get("userId") as string;
    const secret = searchParams.get("secret") as string;
    try{
      await resetPassword(userId, secret, password);
      await updateUserPassword(userId, password);
      toast.success("Password reset successfully");
      router.push("/sign-in");
    }catch(error){
      toast.error((error as Error)?.message || "Password not reset, try again!");
    }finally{
      setLoading(false);
    }

  }

  return (
    <>
      <form
        className="space-y-4 flex !mt-8 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputDemo
          register={{ ...register("password") }}
          placeholder="New Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <InputDemo
          register={{ ...register("confirmPassword") }}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
        <Button
          className={`w-full flex items-center ${loading && "text-gray-400"}`}
          disabled={loading}
        >
          Reset Password
          {loading && <Loader2 className="w-6 h-6 ml-2 animate-spin" />}
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
