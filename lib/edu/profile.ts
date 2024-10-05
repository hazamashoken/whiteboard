"use server";

import { Profile, ProfileDocument } from "@/models/Profiles";

export enum PROFILE_TYPES {
  ADMIN,
  STUDENT,
  TEACHER,
}

export type ProfilePayload = Omit<
  ProfileDocument,
  "createdAt" | "updatedAt" | "active" | "_id" | "courses" | "type"
>;

// getProfile
// createStudentProfile
// createTeacherProfile
// createAdminProfile

export async function getProfile(id: string) {
  const profile = await Profile.findById<ProfileDocument>(id);
  return profile;
}

async function createProfile(payload: ProfilePayload, type: PROFILE_TYPES) {
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
    data: profile,
  };
}

export async function createStudentProfile(payload: ProfilePayload) {
  return await createProfile(payload, PROFILE_TYPES.STUDENT);
}

export async function createTeacherProfile(payload: ProfilePayload) {
  return await createProfile(payload, PROFILE_TYPES.TEACHER);
}

export async function createAdminProfile(payload: ProfilePayload) {
  return await createProfile(payload, PROFILE_TYPES.ADMIN);
}
