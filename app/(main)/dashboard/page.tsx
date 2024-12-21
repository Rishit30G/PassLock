"use client";

import { FlipWords } from "@/components/ui/flip-words";
import Particles from "@/components/ui/particles";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { getCurrentUser } from "@/actions/users.action";
import { generateCircles } from "@/lib/utils";
import FlipWordSkeleton from "./_components/FlipWordSkeleton";
import { toast } from "sonner";
import DashboardCards from "./_components/Card";


interface User {
  firstName: string;
  $id: string;
  accountId: string;
  lastName: string,
}

const Dashboard = () => {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  useEffect(() => {
    async function getUserDetails() {
      try {
        const result = await getCurrentUser();
        setUser(result);
      } catch (error) {
        toast.error((error as Error)?.message || "User not found!");
      }
    }
    getUserDetails();
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
      <DashboardCards userId={user?.$id || ''} accountId={user?.accountId || ''} />
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
