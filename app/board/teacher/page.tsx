"use client";

import { useState } from "react";
import Link from "next/link";
import { Book, FileEdit, GraduationCap, Plus, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TeacherDashboard() {
  const [contentTitle, setContentTitle] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [contentFile, setContentFile] = useState<File | null>(null);

  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentDueDate, setAssignmentDueDate] = useState("");

  const handleContentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting content:", {
      contentTitle,
      contentDescription,
      contentFile,
    });
    alert("Content created successfully!");
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting assignment:", {
      assignmentTitle,
      assignmentDescription,
      assignmentDueDate,
    });
    alert("Assignment created successfully!");
  };

  const handleGradeSubmit = (studentId: string, grade: string) => {
    console.log(`Submitting grade for student ${studentId}:`, grade);
    alert(`Grade submitted for student ${studentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">
          Teacher Dashboard - CS101: Introduction to Computer Science
        </h1>

        <Tabs defaultValue="content">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="submissions">Student Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Create/Edit Course Content</CardTitle>
                <CardDescription>
                  Add new content or edit existing materials for your course.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContentSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="contentTitle">Content Title</Label>
                      <Input
                        id="contentTitle"
                        placeholder="e.g., Week 1: Introduction to Programming"
                        value={contentTitle}
                        onChange={(e) => setContentTitle(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="contentDescription">
                        Content Description
                      </Label>
                      <Textarea
                        id="contentDescription"
                        placeholder="Briefly describe the content"
                        value={contentDescription}
                        onChange={(e) => setContentDescription(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="contentFile">
                        Upload Content (PDF, Video, etc.)
                      </Label>
                      <Input
                        id="contentFile"
                        type="file"
                        onChange={(e) =>
                          setContentFile(e.target.files?.[0] || null)
                        }
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save Draft</Button>
                <Button type="submit" onClick={handleContentSubmit}>
                  <Upload className="mr-2 h-4 w-4" />
                  Publish Content
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>Create/Edit Assignments</CardTitle>
                <CardDescription>
                  Create new assignments or edit existing ones for your course.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAssignmentSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="assignmentTitle">Assignment Title</Label>
                      <Input
                        id="assignmentTitle"
                        placeholder="e.g., Assignment 1: Hello World Program"
                        value={assignmentTitle}
                        onChange={(e) => setAssignmentTitle(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="assignmentDescription">
                        Assignment Description
                      </Label>
                      <Textarea
                        id="assignmentDescription"
                        placeholder="Describe the assignment requirements"
                        value={assignmentDescription}
                        onChange={(e) =>
                          setAssignmentDescription(e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="assignmentDueDate">Due Date</Label>
                      <Input
                        id="assignmentDueDate"
                        type="date"
                        value={assignmentDueDate}
                        onChange={(e) => setAssignmentDueDate(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save Draft</Button>
                <Button type="submit" onClick={handleAssignmentSubmit}>
                  <Upload className="mr-2 h-4 w-4" />
                  Publish Assignment
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>Student Submissions</CardTitle>
                <CardDescription>
                  View and grade student submissions for assignments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Submission Date</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        _id: "1",
                        name: "Alice Johnson",
                        assignment: "Hello World Program",
                        date: "2023-05-15",
                      },
                      {
                        _id: "2",
                        name: "Bob Smith",
                        assignment: "Hello World Program",
                        date: "2023-05-14",
                      },
                      {
                        _id: "3",
                        name: "Charlie Brown",
                        assignment: "Hello World Program",
                        date: "2023-05-16",
                      },
                    ].map((student) => (
                      <TableRow key={student._id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.assignment}</TableCell>
                        <TableCell>{student.date}</TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            placeholder="Enter grade"
                            className="w-20"
                            onChange={(e) =>
                              console.log(
                                `Grade for ${student._id}:`,
                                e.target.value
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleGradeSubmit(student._id, "A")}
                          >
                            Submit Grade
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
