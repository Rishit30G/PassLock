"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { FlipWords } from "@/components/ui/flip-words";
import Image from "next/image";
import { ConfettiButton } from "@/components/ui/confetti";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [imageSrc, setImageSrc] = useState("/sign-up/sign-up.jpeg");

  useEffect(() => {
    const images = [
      "/sign-up/sign-up-1.jpeg",
      "/sign-up/sign-up-2.jpeg",
      "/sign-up/sign-up-3.jpeg",
      "/sign-up/sign-up-4.jpeg",
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setImageSrc(randomImage);
  }, []);
  return (
    <div className="min-h-screen flex relative">
      <div className="absolute top-[10px] right-[10px] z-10">
        <ModeToggle />
      </div>
      <Image
        src={imageSrc}
        alt="logo"
        loading="eager"
        className="h-[100vh] basis-1/2 object-cover max-2xl:hidden"
        height={1200}
        width={1200}
      />
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="w-[500px] max-lg:max-w-[400px] space-y-2 px-3">
          <h1 className="text-4xl text-semibold poppins-medium">PassLock</h1>
          <h2 className="text-2xl poppins-light">
            Save passwords
            <FlipWords words={["at ease.", "with security. ", "in speed. "]} />
          </h2>
          {children}
        </div>
      </div>
      <div className="absolute top-0 right-0 h-[100px] w-[45%] rounded-t-full bg-[rgba(122,246,250,0.5)] opacity-80 blur-[120px]"></div>
      <div className="absolute bottom-[10px] right-[10px] z-10">
        <ConfettiButton>🎉</ConfettiButton>
      </div>
    </div>
  );
}
