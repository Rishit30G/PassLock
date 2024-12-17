"use client";

import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { verifySecret } from "@/actions/users.action";
import { toast } from "sonner";

const OTPForm = ({ accountId }) => {
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const sessionId = await verifySecret({ accountId, password });

      if (sessionId) {
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Incorrect OTP, please check again!");
    }
  };

  const handleResentOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <>
      <AlertDialog open={true}>
        <AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="flex justify-center items-center space-y-4">
              <AlertDialogTitle>OTP is shipped 🛳️</AlertDialogTitle>
              <AlertDialogDescription className="space-y-4 text-center">
                Please enter the OTP sent to your registered email
                <InputOTP maxLength={6} value={password} onChange={setPassword}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="!flex !flex-col justify-center items-center gap-4">
              <p className="text-xs text-center text-gray-400 cursor-pointer">
                {" "}
                Resend OTP{" "}
              </p>
              <AlertDialogAction type="submit" onClick={handleSubmit}>
                Submit
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
};

export default OTPForm;
