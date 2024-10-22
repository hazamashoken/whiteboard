"use server";

import { connectDB } from "@/db/mongoose";
import { Content, ContentDocument, Course } from "@/models";

export type ContentPayload = Omit<
  ContentDocument,
  "_id" | "createdAt" | "updatedAt" | "course" | "active"
>;

// getContentsByCourse
// getContent
// getAllContent
// addContentToCourse
// removeContent

export async function getContentsByCourse(courseId: string, active = true) {
  await connectDB();
  const contents = await Content.find<ContentDocument>({
    course: courseId,
    active,
  });

  return {
    error: null,
    data: contents,
  };
}

export async function getContent(contentId: string) {
  await connectDB();
  const content = await Content.findById<ContentDocument>(contentId);

  return {
    error: null,
    data: content,
  };
}

export async function getAllContent() {
  await connectDB();
  const contents = await Content.find<ContentDocument>();

  return {
    error: null,
    data: contents,
  };
}

export async function addContentToCourse(
  courseId: string,
  payload: ContentPayload
) {
  const data = {
    ...payload,
    course: courseId,
  };
  await connectDB();

  const content = await Content.create<ContentDocument>(data);

  await Course.findByIdAndUpdate(courseId, {
    $addToSet: {
      contents: content._id,
    },
  });

  return {
    error: null,
    data: content,
  };
}

export async function removeContent(contentId: string) {
  await connectDB();
  const content = await Content.findById(contentId);

  if (!content) {
    return {
      error: "Content not found",
      data: null,
    };
  }

  await Course.findByIdAndUpdate(content.course, {
    $pull: {
      contents: contentId,
    },
  });

  await content.remove();

  return {
    error: null,
    data: true,
  };
}

export async function toggleContent(contentId: string) {
  await connectDB();
  const content = await Content.findByIdAndUpdate<ContentDocument>(contentId, {
    $set: {
      active: false,
    },
  });

  if (!content) {
    return {
      error: "Content not found",
      data: null,
    };
  }

  return {
    error: null,
    data: content,
  };
}
