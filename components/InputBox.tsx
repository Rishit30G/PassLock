"use client";

import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react"; // Icons for copy and success
import { useState } from "react";

type InputCopiedProps = {
  register: ReturnType<typeof Object>; // Accepts register props
  value: string; // Dynamically passed value (e.g., `watch("orgUrl")`)
  placeholder: string; // Placeholder for the input
};

export default function InputCopied({ register, value, placeholder }: InputCopiedProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value); 
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 500);
    }
  };

  return (
    <div className="space-y-4">
      <span className="relative">
        <Input
          {...register} 
          value={value} 
          className="pe-9"
          placeholder={placeholder}
          autoComplete="off"
        />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={handleCopy}
          aria-label={isCopied ? "Copied" : "Copy text"}
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-green-500" /> // Green check icon
          ) : (
            <Copy className="w-4 h-4" /> // Clipboard icon
          )}
        </button>
      </span>
    </div>
  );
}