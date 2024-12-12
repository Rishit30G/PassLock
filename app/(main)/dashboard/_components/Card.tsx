"use client";

import { CardContent, Card } from "@/components/ui/card";
import { ArrowRight, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputDemo from "./PasswordInput";
import Image from "next/image";
import DialogComponent from "./DialogComponent";

const DashboardCards = () => {
  return (
    <Card className="min-h-[180px] w-full rounded-lg border shadow-2xl shadow-blue-500/20 dark:shadow-blue-500/10 relative">
      <span className="absolute w-[40%] -top-px -left-px h-[2px] dark:h-[3px] bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0"></span>
      <CardContent className="flex flex-col justify-between h-full p-5">
        <div className="flex justify-end mr-1">
            <Copy className="w-5 h-5 text-zinc-200 cursor-pointer dark:text-slate-600" />
        </div>
        <div className="flex items-center justify-between gap-5 w-full">
          <div className="flex items-start flex-col gap-2">
            <h1 className="text-xl poppins-light">Google</h1>
            <p className="text-sm poppins-light"> ****** </p>
          </div>
          <DialogComponent text="Edit details">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black dark:bg-white">
              <ArrowRight className="w-5 h-5 text-white dark:text-black cursor-pointer" />
            </div>
          </DialogComponent>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCards;
