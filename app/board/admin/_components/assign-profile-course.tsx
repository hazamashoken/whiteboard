import { getAllCoursesAdmin } from "@/lib/edu/courses";
import { getAllProfile } from "@/lib/edu/profile";
import { PROFILE_TYPES } from "@/models";
import { AssignProfileCourse } from "./assign-profile-course-form";

export async function AssignProfileCourseForm() {
  const [
    { data: studentData, error: studentError },
    { data: teacherData, error: teacherError },
    { data: courseData, error: courseError },
  ] = await Promise.all([
    getAllProfile({
      type: PROFILE_TYPES.STUDENT,
    }),
    getAllProfile({
      type: PROFILE_TYPES.TEACHER,
    }),
    getAllCoursesAdmin(),
  ]);

  return (
    <>
      <AssignProfileCourse
        students={studentData!}
        teachers={teacherData!}
        courses={courseData!}
      />
    </>
  );
}
