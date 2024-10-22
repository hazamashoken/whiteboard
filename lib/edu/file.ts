"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

export async function removeFile(key: string) {
  await utapi.deleteFiles(key);
  return { data: true, error: null };
}
