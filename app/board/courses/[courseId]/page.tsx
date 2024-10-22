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
import { Textarea } from "@/components/ui/textarea";

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

  console.log(data);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="flex justify-between">
          <h2 className="mb-4 text-2xl font-bold">{data.name}</h2>
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
                <CardTitle>Content</CardTitle>
                <CardDescription>course content</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  {data.contents.map((item: any, index) => {
                    return (
                      <AccordionItem key={index} value={item._id!}>
                        <AccordionTrigger className="font-bold">
                          {item.name!}
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.body && (
                            <div>
                              <h2 className="font-bold text-xs">Body</h2>
                              <Textarea
                                readOnly
                                className="my-4 mt-2"
                                value={item?.body}
                              ></Textarea>
                            </div>
                          )}
                          {item?.file && (
                            <div>
                              <h2 className="font-bold text-xs">
                                Attachments:
                              </h2>
                              <ul>
                                <li>
                                  <Link
                                    href={`https://utfs.io/f/${item?.file?.key}`}
                                    className="text-blue-600 hover:underline"
                                  >
                                    {item?.file?.name}
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>{" "}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>course assignment</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  {data.assignments.map((item: any, index) => {
                    return (
                      <AccordionItem key={index} value={item._id!}>
                        <AccordionTrigger>{item.name!}</AccordionTrigger>
                        <AccordionContent>
                          {item.body && (
                            <Textarea
                              readOnly
                              className="my-4 mt-2"
                              value={item?.body}
                            ></Textarea>
                          )}
                          {item?.file && (
                            <div>
                              Attachments:{" "}
                              <Link
                                href={`https://utfs.io/f/${item?.file?.key}`}
                              ></Link>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
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
                  <h3 className="font-semibold">Instructors</h3>
                  {data.teachers.map((item: any, index: number) => (
                    <p key={index} className="mr-2">
                      {item.firstName} {item.lastName}
                    </p>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold">Students</h3>
                  {data.students.map((item: any, index: number) => (
                    <p key={index} className="mr-2">
                      {item.firstName} {item.lastName}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
