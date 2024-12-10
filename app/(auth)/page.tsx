"use client"

import { usePathname } from "next/navigation";
import React from "react";
import SignUpForm from "./sign-up/page";
import SignInForm from "./sign-in/page";

const Page = () => {
  const router = usePathname();
  const isSignUp = router === "/sign-up";
  return <>{isSignUp ? <SignUpForm /> : <SignInForm />}</>;
};

export default Page;
