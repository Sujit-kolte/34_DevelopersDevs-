"use client";
import Sidebar from "./SiderBar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <Sidebar />
      {children}
    </div>
  );
}
