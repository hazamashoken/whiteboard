import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getCourseByProfile } from "@/lib/edu/courses";

export default async function Page() {
  const { userId } = auth();
  const { error, data: courses } = await getCourseByProfile(userId!);

  if (error) {
    // You are not enrolled in any courses
    return (
      <>
        <h1 className="text-2xl font-semibold">No Courses Found</h1>
        <p>You are not enrolled in any courses.</p>
      </>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="mb-4 text-2xl font-bold">Courses</h2>
        <div className="grid gap-4">
          {/* Itemized Content and Assignments */}
          <div className="space-x-2">
            {courses!.map((course, index) => (
              <Link href={`/board/courses/${course._id}`} key={index}>
                <Card>
                  <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
