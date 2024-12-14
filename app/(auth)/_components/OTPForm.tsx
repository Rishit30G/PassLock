"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { verifySecret } from "@/actions/users.action";
import { toast } from "sonner";

const OTPForm = ({ accountId }) => {

 const [isOpen, setIsOpen] = useState(true);
 const [password, setPassword] = useState("");
 const router = useRouter();

 const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const sessionId = await verifySecret({accountId, password}); 
     
      if(sessionId){
        router.push("/dashboard");
      }
    } catch (error) {
        toast.error("Failed to verify OTP");
    } 
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader className="flex justify-center items-center">
            <DialogDescription className="space-y-4 text-center">
                Please enter the OTP sent to your email
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
              </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center items-center">
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OTPForm;
