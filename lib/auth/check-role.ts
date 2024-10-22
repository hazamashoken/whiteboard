import { PROFILE_TYPES } from "@/models";
import { auth } from "@clerk/nextjs/server";

export const checkRole = (roles: PROFILE_TYPES[]) => {
  const { sessionClaims } = auth();
  if (!sessionClaims?.metadata?.role && sessionClaims?.metadata?.role !== 0)
    return false;

  return roles.includes(sessionClaims?.metadata.role);
};
