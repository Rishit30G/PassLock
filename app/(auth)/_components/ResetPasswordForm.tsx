"use client";

import InputDemo from "@/app/(main)/dashboard/_components/PasswordInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/zodSchema/schemas";
import { resetPassword, updateUserPassword } from "@/actions/users.action";
import { useRouter } from "next/navigation";
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
    try {
      const result = await resetPassword(userId, secret, password);
      if (typeof result === "object" && "error" in result) {
        toast.error(result.error);
        return;
      }
      const updateResult = await updateUserPassword(userId, password);
      if (typeof updateResult === "object" && "error" in updateResult) {
        toast.error(updateResult.error);
        return;
      }
      toast.success("Password reset successfully");
      router.push("/sign-in");
    } finally {
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
