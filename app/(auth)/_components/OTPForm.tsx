"use client";

import React, { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { sendEmailOTP, verifySecret } from "@/actions/users.action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const OTPForm = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(120);

  const router = useRouter();

  // Countdown Timer Effect
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (isResendDisabled && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setIsResendDisabled(false);
    }

    return () => clearInterval(countdown); // Clean up on unmount
  }, [timer, isResendDisabled]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const sessionId = await verifySecret({ accountId, password });
      if (typeof sessionId === "object" && "error" in sessionId) {
        toast.error(sessionId.error);
        return;
      }
      if (sessionId) {
        router.push("/dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!isResendDisabled) {
      try {
        const result = await sendEmailOTP(email);
        if (typeof result === "object" && "error" in result) {
          toast.error(result.error);
          return;
        }
        toast.success("OTP resent successfully");
        setIsResendDisabled(true);
        setTimer(120);
      } catch {
        toast.error("Failed to resend OTP. Please try again.");
      }
    }
  };

  return (
    <>
      <AlertDialog open={true}>
        <AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="flex justify-center items-center space-y-4">
              <AlertDialogTitle>OTP is shipped 🛳️</AlertDialogTitle>
              <AlertDialogDescription className="space-y-4 text-center">
                Please enter the OTP sent to your registered email
              </AlertDialogDescription>
              <InputOTP
                maxLength={6}
                value={password}
                onChange={setPassword}
                autoFocus
              >
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
            </AlertDialogHeader>
            <AlertDialogFooter className="!flex !flex-col justify-center items-center gap-4">
              <div
                className={`text-xs text-center ${
                  isResendDisabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 cursor-pointer"
                }`}
                onClick={handleResendOTP}
              >
                {isResendDisabled
                  ? `Resend OTP in ${formatTime(timer)}`
                  : "Resend OTP"}
              </div>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-30 flex items-center"
                disabled={loading}
              >
                Submit
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogTrigger>
      </AlertDialog>
    </>
  );
};

export default OTPForm;
