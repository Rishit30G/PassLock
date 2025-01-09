import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PassLock - Maintenance",
  description:
    "We are currently working on our servers to provide you with the best experience. Please check back later.",
};

export default function MaintainanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}