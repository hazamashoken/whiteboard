import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCourseById } from "@/lib/edu/courses";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import { checkRole } from "@/lib/auth/check-role";
import { PROFILE_TYPES } from "@/models";

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const { data, error } = await getCourseById(params.courseId);
  if (data === null) {
    notFound();
  }
  const isTeacher = checkRole([PROFILE_TYPES.TEACHER]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="flex justify-between">
          <h2 className="mb-4 text-2xl font-bold">Courses</h2>
          {isTeacher && (
            <Link href={`/board/courses/${data._id}/edit`}>
              <Button variant={"outline"}>
                <PenIcon className="h-3 w-3 mr-2" />
                Edit
              </Button>
            </Link>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Itemized Content and Assignments */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{data.name}</CardTitle>
                <CardDescription>{data.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="content">
                    <AccordionTrigger>Course Content</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-inside list-disc space-y-1">
                        <li>
                          <Link
                            href="/courses/cs101/week1"
                            className="text-blue-600 hover:underline"
                          >
                            Week 1: Introduction to Programming
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/courses/cs101/week2"
                            className="text-blue-600 hover:underline"
                          >
                            Week 2: Data Types and Variables
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/courses/cs101/week3"
                            className="text-blue-600 hover:underline"
                          >
                            Week 3: Control Structures
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/courses/cs101/week4"
                            className="text-blue-600 hover:underline"
                          >
                            Week 4: Functions and Modules
                          </Link>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="assignments">
                    <AccordionTrigger>Assignments</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-inside list-disc space-y-1">
                        <li>
                          <Link
                            href="/courses/cs101/assignment1"
                            className="text-blue-600 hover:underline"
                          >
                            Assignment 1: Hello World Program (Due: Week 1)
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/courses/cs101/assignment2"
                            className="text-blue-600 hover:underline"
                          >
                            Assignment 2: Calculator App (Due: Week 3)
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/courses/cs101/midterm"
                            className="text-blue-600 hover:underline"
                          >
                            Mid-term Project: Simple Game (Due: Week 6)
                          </Link>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Instructor</h3>
                  <p>Dr. Jane Smith</p>
                </div>
                <div>
                  <h3 className="font-semibold">Schedule</h3>
                  <p>Mon, Wed, Fri 10:00 AM - 11:30 AM</p>
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p>Room 101, Computer Science Building</p>
                </div>
                <div>
                  <h3 className="font-semibold">Office Hours</h3>
                  <p>Tuesdays 2:00 PM - 4:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
