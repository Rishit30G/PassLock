"use client";

import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function InputDemo({ setMonkeyState, register}: { setMonkeyState: (state: boolean) => void, register: ReturnType<typeof useForm>['register']; } ) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    const newState = !isVisible;
    setIsVisible(newState);
    setMonkeyState(!newState); 
  };
  const handleFocus = () => setMonkeyState(true); 
  const handleBlur = () => setMonkeyState(false); 

  return (
    <div className="space-y-4">
      <span className="relative">
        <Input
          {...register('password')}
          className="pe-9"
          placeholder="Password"
          type={isVisible ? "text" : "password"}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeIcon className="w-4 h-4" />
          ) : (
            <EyeOff className="w-4 h-4" />
          )}
        </button>
      </span>
    </div>
  );
}