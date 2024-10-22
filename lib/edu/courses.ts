"use server";

import { connectDB } from "@/db/mongoose";
import { Course, CourseDocument, Profile } from "@/models";

// addStudentsToCourse
// addTeachersToCourse
// createCourse
// toggleCourse
// editCourse
// getCourseByProfile
// getAllCoursesAdmin
export async function addStudentsToCourse(courseId: string, userIds: string[]) {
  await connectDB();
  const course = await Course.findByIdAndUpdate<CourseDocument>(
    courseId,
    {
      $addToSet: {
        students: { $each: userIds },
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

  const profile = await Profile.updateMany(
    { _id: { $in: userIds } },
    {
      $addToSet: {
        courses: courseId,
      },
    }
  );

  return {
    error: null,
    data: JSON.parse(JSON.stringify(course)),
  };
}

export async function addTeachersToCourse(courseId: string, userIds: string[]) {
  await connectDB();
  const course = await Course.findByIdAndUpdate<CourseDocument>(
    courseId,
    {
      $addToSet: {
        teachers: { $each: userIds },
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

  const profile = await Profile.updateMany(
    { _id: { $in: userIds } },
    {
      $addToSet: {
        courses: courseId,
      },
    }
  );

  return {
    error: null,
    data: JSON.parse(JSON.stringify(course)),
  };
}

export type CourseCreationPayload = Omit<
  CourseDocument,
  | "_id"
  | "createdAt"
  | "updatedAt"
  | "students"
  | "teachers"
  | "contents"
  | "assignments"
>;

export type CourseEditPayload = Omit<
  CourseDocument,
  | "_id"
  | "createdAt"
  | "updatedAt"
  | "students"
  | "teachers"
  | "contents"
  | "assignments"
>;

export async function createCourse(payload: CourseCreationPayload): Promise<{
  error: string | null;
  data: CourseDocument | null;
}> {
  const data = {
    ...payload,
  };
  await connectDB();

  const course = await Course.create<CourseDocument>(data);

  if (!course) {
    return {
      error: "Course not created",
      data: null,
    };
  }

  return {
    error: null,
    data: JSON.parse(JSON.stringify(course)),
  };
}

export async function editCourse(
  courseId: string,
  payload: CourseCreationPayload
): Promise<{
  error: string | null;
  data: CourseDocument | null;
}> {
  const data = {
    ...payload,
  };
  await connectDB();

  const course = await Course.findByIdAndUpdate<CourseDocument>(
    courseId,
    {
      $set: data,
    },
    { new: true }
  );

  if (!course) {
    return {
      error: "Course not found",
      data: null,
    };
  }

  return {
    error: null,
    data: JSON.parse(JSON.stringify(course)),
  };
}

export async function toggleCourse(courseId: string): Promise<{
  error: string | null;
  data: CourseDocument | null;
}> {
  await connectDB();
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
    data: JSON.parse(JSON.stringify(course)),
  };
}

export async function getCourseByProfile(profileId: string): Promise<{
  error: string | null;
  data: CourseDocument[] | null;
}> {
  await connectDB();
  const profile = await Profile.findOne({ userId: profileId });
  const course = await Course.find<CourseDocument>({
    $or: [{ students: profile._id }, { teachers: profile._id }],
  })
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
    data: JSON.parse(JSON.stringify(course)),
  };
}

export async function getAllCoursesAdmin(): Promise<{
  error: string | null;
  data: CourseDocument[] | null;
}> {
  await connectDB();
  const courses = await Course.find<CourseDocument>()
    .populate("students")
    .populate("teachers");

  if (!courses) {
    return {
      error: "Courses not found",
      data: null,
    };
  }

  return {
    error: null,
    data: JSON.parse(JSON.stringify(courses)),
  };
}

export async function getCourseById(courseId: string): Promise<{
  error: string | null;
  data: CourseDocument | null;
}> {
  await connectDB();
  const course = await Course.findById<CourseDocument>(courseId)
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
    data: JSON.parse(JSON.stringify(course)),
  };
}
