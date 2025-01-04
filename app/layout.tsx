import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "PassLock",
  description: "A locking app for your passwords, providing secure storage and easy access to all your credentials. Keep your passwords safe and organized with advanced encryption and user-friendly features.",
  openGraph: {
    title: "PassLock", 
    description: "PassLock is a secure password manager that keeps your passwords safe and organized. It provides secure storage and easy access to all your credentials.",
    type: "website",
    images: [
      {
        url: "https://i.postimg.cc/pL7NvWBw/Suspended-Golden-Key.jpg",
        width: 1800,
        height: 830,
        alt: "PassLock",
      },
    ],
    url: "https://passlock.vercel.app",
    locale: "en_US",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
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
