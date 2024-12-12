"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InputDemo from "./PasswordInput";
import { Input } from "@/components/ui/input";
import Confetti, { ConfettiButton } from "@/components/ui/confetti";

const DialogComponent = ({ children, text }) => {
  const [monkeyState, setMonkeyState] = useState(false); // Tracks emoji state

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[525px] p-6">
          <DialogHeader>
            <DialogTitle>{text}</DialogTitle>
            <DialogDescription className="flex justify-center relative">
                {monkeyState ? (
                    <Image
                    src="/see_no_evil.png"
                    alt="isNotVisibleMonkey"
                    className="object-contain py-3 transition-transform duration-500 ease-in-out scale-90 transform opacity-100 "
                    width={80}
                    height={80}
                   
                    />
                ) : (
                      <Image
                        src="/monkey_face.png"
                        alt="isVisibleMonkey"
                        className="object-contain py-3 transition-transform duration-500 ease-in-out transform opacity-100 cursor-pointer hover:animate-shake"
                        width={80}
                        height={80}
                        />
                )}
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input placeholder="Organisation Name" />
          </div>
          <InputDemo setMonkeyState={setMonkeyState} />
          <DialogFooter>
            <Button className="shadow-lg w-30 dark:bg-white dark:text-black">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogComponent;
