"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import maintenanceConfig from "@/maintenance.json";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Maintainance = () => {
  useEffect(() => {
    if (!maintenanceConfig.enabled) {
      redirect("/dashboard");
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-[86vh] flex justify-center items-center flex-col gap-10 px-4">
        <h1 className="poppins-extralight text-6xl text-center max-lg:text-3xl">
          Sorry, We are unavailable right now!
        </h1>
        <h2 className="poppins-light text-center text-neutral-600 dark:text-neutral-200 max-lg:text-sm">
          We are currently working on our servers to provide you with the best
          experience. Please check back later.
        </h2>
        <Image
          src="/unavailable.jpg"
          width={300}
          height={300}
          alt="lock"
          loading="eager"
          className="animate-bounce-slow mt-10"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Maintainance;