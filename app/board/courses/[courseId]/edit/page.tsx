import { getCourseById } from "@/lib/edu/courses";
import { notFound } from "next/navigation";
import { CourseManagement } from "../../_components/course-edit";
import { CourseForm } from "../../_components/content-add-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CourseEditPage({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await getCourseById(params.courseId);
  if (!course) {
    notFound();
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Edit Course</CardTitle>
          <CardDescription>Add Content/Assignment to Course</CardDescription>
        </CardHeader>
        <CardContent>
          <CourseForm courseId={params.courseId} />
        </CardContent>
      </Card>
    </>
  );
}
