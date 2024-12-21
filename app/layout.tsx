import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "PassLock",
  description: "A locking app for your passwords",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
    </head>
    <body className="">
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      {children}
        <Toaster position="top-right"/>
      </ThemeProvider>
    </body>
  </html>
  );
}
