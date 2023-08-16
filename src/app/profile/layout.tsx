"use client";
import axios from "axios";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const logOut = async () => {
    try {
      await axios.get("api/users/logout");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Toaster />
      <nav className="bg-violet-600 flex items-center justify-between w-full h-16">
        <span className="ml-5 font-bold text-white">NAV</span>
        <button
          className="bg-slate-950 font-semibold text-sm text-white px-4 py-2 rounded mr-5"
          onClick={logOut}
        >
          Logout
        </button>
      </nav>
      <section className={inter.className}>{children}</section>
    </>
  );
}
