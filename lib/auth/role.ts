"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { checkRole } from "./check-role";
import { PROFILE_TYPES } from "@/models";
export async function setRole(userId: string, role: PROFILE_TYPES) {
  // Check that the user trying to set the role is an admin
  // if (!checkRole(["admin"])) {
  //   return { message: "Not Authorized" };
  // }

  try {
    const res = await clerkClient().users.updateUser(userId, {
      publicMetadata: { role: role },
    });
    return { data: res.publicMetadata, error: null };
  } catch (err) {
    return { error: err as string, data: null };
  }
}

export async function removeRole(userId: string) {
  try {
    const res = await clerkClient().users.updateUser(userId, {
      publicMetadata: { role: null },
    });
    return { data: res.publicMetadata, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}
