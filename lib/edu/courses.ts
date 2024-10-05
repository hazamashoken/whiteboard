"use server";

import { Course, CourseDocument } from "@/models/Courses";

// addStudentsToCourse
// addTeachersToCourse
// createCourse
export async function addStudentsToCourse(
  courseId: string,
  studentIds: string[]
) {
  const course = await Course.findByIdAndUpdate<CourseDocument>(
    courseId,
    {
      $addToSet: {
        students: { $each: studentIds },
      },
    },
    { new: true }
  )
    .populate("students")
    .populate("teachers");

  if (!course) {
    return {
      error: "Course not found",
      data: null,
    };
  }

  return {
    error: null,
    data: course,
  };
}

export async function addTeachersToCourse(
  courseId: string,
  teacherIds: string[]
) {
  const course = await Course.findByIdAndUpdate<CourseDocument>(
    courseId,
    {
      $addToSet: {
        teachers: { $each: teacherIds },
      },
    },
    { new: true }
  )
    .populate("students")
    .populate("teachers");

  if (!course) {
    return {
      error: "Course not found",
      data: null,
    };
  }

  return {
    error: null,
    data: course,
  };
}

export type CoursePayload = Omit<
  CourseDocument,
  "_id" | "createdAt" | "updatedAt" | "students" | "teachers"
>;

export async function createCourse(payload: CoursePayload) {
  const data = {
    ...payload,
  };

  const course = await Course.create<CourseDocument>(data);

  return {
    error: null,
    data: course,
  };
}

export async function toggleCourse(courseId: string) {
  const course = await Course.findByIdAndUpdate<CourseDocument>(courseId, {
    $set: {
      active: true,
    },
  });

  if (!course) {
    return {
      error: "Course not found",
      data: null,
    };
  }

  return {
    error: null,
    data: course,
  };
}
