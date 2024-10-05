import Link from "next/link";
import {
  Bell,
  Book,
  Calendar,
  ChevronDown,
  GraduationCap,
  Mail,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Page() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Navbar */}
      <aside className="hidden w-64 flex-shrink-0 bg-white p-4 shadow-md md:block">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">WhiteBoard</h1>
        </div>
        <nav className="space-y-2">
          <Link
            href="#"
            className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Bell className="mr-3 h-5 w-5" />
            Announcements
          </Link>
          <Link
            href="#"
            className="flex items-center rounded-lg bg-gray-200 px-4 py-2 text-gray-700"
          >
            <Book className="mr-3 h-5 w-5" />
            Courses
          </Link>
          <Link
            href="#"
            className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Mail className="mr-3 h-5 w-5" />
            Messages
          </Link>
          <Link
            href="#"
            className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <GraduationCap className="mr-3 h-5 w-5" />
            Grades
          </Link>
        </nav>
      </aside>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="fixed left-4 top-4 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Acme Institute</SheetTitle>
            <SheetDescription>E-Learning System</SheetDescription>
          </SheetHeader>
          <nav className="mt-6 space-y-2">
            <Link
              href="#"
              className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <Bell className="mr-3 h-5 w-5" />
              Announcements
            </Link>
            <Link
              href="#"
              className="flex items-center rounded-lg bg-gray-200 px-4 py-2 text-gray-700"
            >
              <Book className="mr-3 h-5 w-5" />
              Courses
            </Link>
            <Link
              href="#"
              className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <Mail className="mr-3 h-5 w-5" />
              Messages
            </Link>
            <Link
              href="#"
              className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <GraduationCap className="mr-3 h-5 w-5" />
              Grades
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="mb-4 text-2xl font-bold">Courses</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Itemized Content and Assignments */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Introduction to Computer Science</CardTitle>
                <CardDescription>CS101</CardDescription>
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
