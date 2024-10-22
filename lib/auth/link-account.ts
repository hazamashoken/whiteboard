"use server";

import { connectDB } from "@/db/mongoose";
import { Profile, ProfileDocument } from "@/models";
import { setRole } from "./role";

export async function linkAccount(
  userId: string,
  email: string
): Promise<{
  error: string | null;
  data: any;
}> {
  await connectDB();

  const profile = await Profile.findOneAndUpdate<ProfileDocument>(
    { email },
    {
      userId,
    },
    { new: true }
  );

  if (!profile) {
    return {
      error: "Profile not found",
      data: null,
    };
  }

  const { data, error } = await setRole(userId, profile.type);

  if (error) {
    return {
      error: error,
      data: null,
    };
  }

  return {
    error: null,
    data: JSON.parse(JSON.stringify(profile)),
  };
}
