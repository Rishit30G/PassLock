"use client";

import { FlipWords } from "@/components/ui/flip-words";
import { Input } from "@/components/ui/input";
import Particles from "@/components/ui/particles";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import DashboardCards from "./_components/Card";
import DialogComponent from "./_components/DialogComponent";
import Header from "./_components/Header";
import { getCurrentUser } from "@/actions/users.action";
import { generateCircles } from "@/lib/utils";
import FlipWordSkeleton from "./_components/FlipWordSkeleton";
import { toast } from "sonner";

const Dashboard = () => {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const [user, setUser] = useState("");
  const [dialogState, setDialogState] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  useEffect(() => {
    async function handleAddDetails() {
      try {
        const result = await getCurrentUser();
        setUser(result);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    handleAddDetails();
  }, []);

  return (
    <>
      <div className="relative">
        <Particles
          className="absolute inset-0"
          quantity={50}
          ease={80}
          color={color}
          refresh
        />
        <Header />
      </div>
      <div className="h-fit relative flex flex-col items-center justify-center gap-7 py-14">
        <h1 className="text-7xl poppins-medium text-center flex items-center justify-center gap-4 max-md:text-5xl max-md:flex-col max-md:gap-2">
          Welcome,
          {user?.firstName ? (
            <FlipWords
              words={[
                `${user?.firstName}!`,
                `${generateCircles(user?.firstName?.length - 1 || 0)}`,
              ]}
            />
          ) : (
            <FlipWordSkeleton />
          )}
        </h1>
        <Particles
          className="absolute inset-0"
          quantity={50}
          ease={80}
          color={color}
          refresh
        />
      </div>
      <div className="container max-w-7xl mx-auto min-h-screen py-20 max-2xl:px-4">
        <div className="flex items-center justify-between max-md:justify-center gap-5">
          <h2 className="text-xl poppins-light max-md:hidden">Password List</h2>
          <div className="flex items-center gap-5">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input
                placeholder="Search"
                className="pl-10 max-w-[280px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DialogComponent
              text="Add details"
              userId={user?.$id}
              accountId={user?.accountId}
              isOpen={dialogState}
              onOpenChange={setDialogState}
            >
              <Button
                className="inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-white transition-colors"
                onClick={() => setDialogState(true)}
              >
                Add New
              </Button>
            </DialogComponent>
          </div>
        </div>
        <DashboardCards
          userId={user?.$id}
          accountId={user?.accountId}
          searchTerm={searchTerm}
        />
      </div>
      <div className="container max-w-7xl mx-auto relative">
        <footer className="p-10">
          <h1 className="text-center text-lg">
            Made for {user?.lastName || "Guest"} Ji 🙌🏻
          </h1>
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
