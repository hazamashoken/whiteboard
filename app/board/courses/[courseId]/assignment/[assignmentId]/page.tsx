"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Upload } from "lucide-react";

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

export default function AssignmentPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the file upload to your backend
    console.log("Submitting file:", file);
    alert("Assignment submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href="/courses/cs101"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
        </div>
        <h1 className="mb-4 text-3xl font-bold">
          CS101: Introduction to Computer Science
        </h1>
        <h2 className="mb-6 text-2xl font-semibold">
          Assignment 1: Hello World Program
        </h2>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
            <CardDescription>Due: Week 1 - Friday, 11:59 PM</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              In this assignment, you will write your first Python program. The
              goal is to create a simple &qout;Hello, World!&qout; program and
              demonstrate your understanding of basic Python syntax.
            </p>
            <h3 className="mb-2 text-lg font-semibold">Requirements:</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>Create a Python file named &qout;hello_world.py&qout;</li>
              <li>
                Write a program that prints &qout;Hello, World!&qout; to the
                console
              </li>
              <li>
                Add a comment with your name and student ID at the top of the
                file
              </li>
              <li>Submit your files through the form below</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href="/path/to/assignment1_details.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download Assignment PDF
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submit Your Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your full name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input id="studentId" placeholder="Your student ID" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="file">Upload Your Python File</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".py"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="comments">Comments (Optional)</Label>
                  <Textarea
                    id="comments"
                    placeholder="Any additional comments about your submission"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Save Draft</Button>
            <Button type="submit" onClick={handleSubmit}>
              <Upload className="mr-2 h-4 w-4" />
              Submit Assignment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
