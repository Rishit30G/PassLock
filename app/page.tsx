import { AnimatedShinyTextDemo } from "@/components/AnimateShinyText";
import { ModeToggle } from "@/components/ModeToggle";
import { RainbowButton } from "@/components/ui/rainbow-button";
import ShinyButton from "@/components/ui/shiny-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HyperText from "@/components/ui/hyper-text";
import {
  KeyRoundIcon,
  LockKeyholeIcon,
  Search,
  ShieldCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Testimonial from "@/components/Testimonial";

const LandingPage = () => {

  return (
    <div className="container max-w-7xl mx-auto px-4 my-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl poppins-regular">PassLock</h1>
        <div className="flex items-center gap-4">
          <RainbowButton className="cursor-pointer px-8 py-2">
            <Link href="/sign-up">Get Started</Link>
          </RainbowButton>
          <ModeToggle />
        </div>
      </div>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-4 min-h-screen">
        <AnimatedShinyTextDemo />
        <h1 className="text-8xl poppins-bold max-lg:text-6xl">PassLock</h1>
        <p className="text-xl poppins-regular text-zinc-700 dark:text-zinc-400 text-center">
          Simplest way to store your passwords.
        </p>
        <Image
          src="/lock.jpg"
          width={500}
          height={500}
          alt="lock"
          className="animate-bounce-slow"
        />
        <Link href="#trust">
          <ShinyButton className="px-8 py-3">Learn More</ShinyButton>
        </Link>
      </section>

      {/* Why Trust Us */}
      <section
        className="flex items-start justify-between pt-10 max-lg:flex-col"
        id="trust"
      >
        <div className="flex flex-col gap-4 w-[60%] max-lg:w-[100%]">
          <h2 className="poppins-semibold text-5xl">Why trust us ?</h2>
          <p className="poppins-light text-xl text-zinc-500 leading-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur
          </p>
        </div>
        <div className="w-[30%] text-center max-lg:w-[100%] max-lg: mt-20">
          <HyperText className="text-6xl text-zinc-800 uppercase"> Password </HyperText>
        </div>
      </section>

      {/* Keep it secure */}
      <section className="flex flex-col mt-40">
        <h1 className="poppins-semibold text-5xl mb-10">Keep it secure</h1>
        <div className="grid grid-cols-2 items-center gap-8 max-lg:grid-cols-1">
          <div className="p-8 rounded-lg flex flex-col gap-3 shadow-[1px_6px_17px_-1px_rgba(128,_223,_255,_0.53)]">
            <div className="flex justify-between items-end">
              <h1 className="text-4xl poppins-regular">Simple</h1>
              <LockKeyholeIcon
                className="h-[8rem] w-[8rem] text-zinc-500"
                strokeWidth={0.6}
              />
            </div>
            <p className="text-lg poppins-regular text-zinc-500">
              PassLock uses the latest encryption technology to ensure your
              passwords are safe and secure.
            </p>
          </div>
          <div className="p-8 rounded-lg shadow-[1px_6px_17px_-1px_rgba(128,_255,_200,_0.53)] flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <h1 className="text-4xl poppins-regular">Safe</h1>
              <ShieldCheckIcon
                className="h-[8rem] w-[8rem] text-zinc-500"
                strokeWidth={0.6}
              />
            </div>
            <p className="text-lg poppins-regular text-zinc-500">
              PassLock uses the latest encryption technology to ensure your
              passwords are safe and secure.
            </p>
          </div>
          <div className="p-8 rounded-lg shadow-[1px_6px_17px_-1px_rgba(255,_221,_128,_0.53)] flex flex-col gap-3">
            <div className="flex justify-between items-end ">
              <h1 className="text-4xl poppins-regular">Secure</h1>
              <KeyRoundIcon
                className="h-[8rem] w-[8rem] text-zinc-500"
                strokeWidth={0.6}
              />
            </div>
            <p className="text-lg poppins-regular text-zinc-500">
              PassLock uses the latest encryption technology to ensure your
              passwords are safe and secure.
            </p>
          </div>
          <div className="p-8 rounded-lg shadow-[1px_6px_17px_-1px_rgba(253,_180,_180,_0.53)] flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <h1 className="text-4xl poppins-regular">Search</h1>
              <Search
                className="h-[8rem] w-[8rem] text-zinc-500"
                strokeWidth={0.6}
              />
            </div>
            <p className="text-lg poppins-regular text-zinc-500">
              PassLock uses the latest encryption technology to ensure your
              passwords are safe and secure.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Section  */}

      <section className="mt-40">
        <h1 className="text-5xl poppins-semibold mb-4">Testimonials</h1>
        <Testimonial />
      </section>

      {/* FAQ Section  */}
      <section className="flex flex-col mt-40">
        <h1 className="text-5xl poppins-semibold mb-4">FAQs</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">
              Is PassLock free to use ?
            </AccordionTrigger>
            <AccordionContent className="text-lg text-zinc-600">
              🔐 Yes, PassLock is free to use for a limited time, allowing users
              to store up to 50 passwords.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg">
              What happens if I forget my PassLock account password ?
            </AccordionTrigger>
            <AccordionContent className="text-lg text-zinc-600">
              🔐 If you forget your password, you can use the Forgot Password
              option to reset it. A magic link will be sent to your registered
              email, allowing you to securely set a new password.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg">
              Can PassLock access my passwords ?
            </AccordionTrigger>
            <AccordionContent className="text-lg text-zinc-600">
              🔐 No, PassLock cannot access your passwords. All passwords are
              encrypted and stored securely. Only you, with your valid session,
              can decrypt and view them.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Get Started - Sign Up Today */}
      <section className="flex flex-col items-center mt-40">
        <h1 className="text-5xl poppins-semibold mb-4">Get Started</h1>
        <p className="text-lg poppins-regular text-zinc-500 text-center">
          Sign up today and start securing your passwords with PassLock.
        </p>
        <Button className="mt-10 text-lg poppins-regular px-8 py-6 shadow-[0px_0px_40px_0px_#75daf6]">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
        <Image
          src="/key.jpg"
          width={180}
          height={180}
          alt="sign-up"
          className="animate-bounce-slow mt-6"
        />
      </section>

      {/* Footer */}
      <footer className="mt-20 mb-10 flex justify-center max-lg:justify-center">
        <h3 className="text-center text-lg poppins-extralight text-zinc-600">
          © {new Date().getFullYear()} PassLock
        </h3>
      </footer>
    </div>
  );
};

export default LandingPage;
