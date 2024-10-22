"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOutIcon, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SignOutButton } from "@clerk/nextjs";
import {
  Book,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const pathName = usePathname();
  const navItems = [
    { href: "/board/", label: "Home", icon: Home },
    { href: "/board/courses", label: "Courses", icon: Book },
    { href: "/board/assignments", label: "Assignments", icon: GraduationCap },
    { href: "/board/messages", label: "Messages", icon: MessageSquare },
    { href: "/board/admin", label: "Admin", icon: Settings },
    { href: "/board/profile", label: "Profile", icon: User },
  ];
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-20 items-center justify-between px-4">
            <h2 className="text-2xl font-bold">WhiteBoard</h2>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-2">
            {" "}
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-100",
                    pathName === item.href && "bg-gray-200"
                  )}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="flex items-center rounded-lg px-6 py-4 text-gray-900 hover:bg-gray-100">
            <LogOutIcon className="mr-3 h-6 w-6" />
            <SignOutButton />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open sidebar</span>
          </Button>
          <div className="ml-auto flex items-center space-x-4">
            {/* Add user menu or other top bar items here */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
