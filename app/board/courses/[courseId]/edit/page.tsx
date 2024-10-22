import { getCourseById } from "@/lib/edu/courses";
import { notFound } from "next/navigation";

export default async function CourseEditPage({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await getCourseById(params.courseId);
  if (!course) {
    notFound();
  }
  return <>{params.courseId}</>;
}
