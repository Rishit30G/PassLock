"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9  border transition-colors duration-300"
      aria-label="Toggle theme"
      variant="ghost"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" /> 
      ) : (
        <Sun className="w-5 h-5" /> 
      )}
    </Button>
  );
}