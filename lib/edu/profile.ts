"use server";

import { connectDB } from "@/db/mongoose";
import { Profile, PROFILE_TYPES, ProfileDocument } from "@/models";

export type ProfilePayload = Omit<
  ProfileDocument,
  | "createdAt"
  | "updatedAt"
  | "active"
  | "_id"
  | "courses"
  | "type"
  | "image"
  | "userId"
>;

// getProfile
// createStudentProfile
// createTeacherProfile
// createAdminProfile

export async function getProfile(email: string) {
  await connectDB();
  const profile = await Profile.findOne<ProfileDocument>({
    email,
  }).populate("courses");

  return JSON.parse(JSON.stringify(profile));
}

export async function createProfile(
  payload: ProfilePayload,
  type: PROFILE_TYPES
) {
  await connectDB();
  const existingProfile = await Profile.findOne<ProfileDocument>({
    email: payload.email,
  });

  if (existingProfile) {
    return {
      error: "Profile already exists",
      data: null,
    };
  }

  const data = {
    ...payload,
    type,
  };

  const profile = await Profile.create<ProfileDocument>(data);

  return {
    error: null,
    data: JSON.parse(JSON.stringify(profile)),
  };
}

export async function getAllProfile(options?: { type?: PROFILE_TYPES }) {
  await connectDB();
  const profiles = await Profile.find<ProfileDocument>({
    ...(options?.type && { type: options.type }),
  }).populate("courses");

  return {
    error: null,
    data: JSON.parse(JSON.stringify(profiles)),
  };
}
