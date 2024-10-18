"use client";
import Sidebar from "@/components/layout/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  console.log(children);
  return (
    <div className="flex gap-2">
      <Sidebar />
      {children}
    </div>
  );
}
