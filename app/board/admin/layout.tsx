import { checkRole } from "@/lib/auth/check-role";
import { PROFILE_TYPES } from "@/models";
import { redirect } from "next/navigation";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  if (!checkRole([PROFILE_TYPES.ADMIN])) {
    redirect("/");
  }
  return <div>{children}</div>;
}
