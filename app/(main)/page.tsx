import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-1">
        <img src="/sign-in.jpeg" alt="logo" className="w-auto h-[100vh]"/>
        <h1 className="text-4xl font-bold text-center">Welcome to your dashboard</h1>
    </div>
  );
}