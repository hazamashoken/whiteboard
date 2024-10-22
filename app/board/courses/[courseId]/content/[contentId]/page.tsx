import Link from "next/link";
import { ArrowLeft, Download, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CourseContent() {
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
          Week 1: Introduction to Programming
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Lecture Slides</CardTitle>
              <CardDescription>
                Download the PDF slides for this week&apos;s lecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="/path/to/slides.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Slides (PDF)
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lecture Video</CardTitle>
              <CardDescription>
                Watch the recorded lecture for this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video overflow-hidden rounded-lg bg-gray-200">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
                  title="Week 1 Lecture Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <Button
                className="mt-4 w-full"
                onClick={() => alert("Opening video player...")}
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Watch Video
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Week Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>In this week&apos;s content, we cover the following topics:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>What is programming?</li>
              <li>Basic concepts of algorithms</li>
              <li>Introduction to Python programming language</li>
              <li>Writing your first &qout;Hello, World!&qout; program</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  Python Official Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  &qout;Think Python&qout; free online book
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  Codecademy Python Course
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
