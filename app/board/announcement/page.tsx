"use client";

import { useState } from "react";
import { Bell, Book, Mail, GraduationCap, Menu } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function AnnouncementItem({
  title,
  date,
  content,
}: {
  title: string;
  date: string;
  content: string;
}) {
  return (
    <div className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{date}</p>
      <p className="mt-2 text-gray-700">{content}</p>
    </div>
  );
}
export default function Page() {
  const [activeTab, setActiveTab] = useState("announcements");

  const menuItems = [
    { _id: "announcements", label: "Announcements", icon: Bell },
    { _id: "courses", label: "Courses", icon: Book },
    { _id: "messages", label: "Messages", icon: Mail },
    { _id: "grades", label: "Grades", icon: GraduationCap },
  ];

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Annoucement</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item._id}
                  variant={activeTab === item._id ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab(item._id)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <div className="grid gap-6">
        <main>
          {activeTab === "announcements" && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
                <CardDescription>
                  Stay updated with the latest news and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnnouncementItem
                    title="New Course Available"
                    date="2023-05-15"
                    content="We're excited to announce a new course on Artificial Intelligence starting next month."
                  />
                  <AnnouncementItem
                    title="System Maintenance"
                    date="2023-05-10"
                    content="The e-learning platform will be undergoing maintenance on May 20th from 2 AM to 4 AM EST."
                  />
                  <AnnouncementItem
                    title="Summer Break Schedule"
                    date="2023-05-05"
                    content="Please note that the summer break will be from July 1st to July 15th. All courses will resume on July 16th."
                  />
                </div>
              </CardContent>
            </Card>
          )}
          {activeTab === "courses" && (
            <Card>
              <CardHeader>
                <CardTitle>Courses</CardTitle>
              </CardHeader>
              <CardContent>Course content goes here</CardContent>
            </Card>
          )}
          {activeTab === "messages" && (
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>Message content goes here</CardContent>
            </Card>
          )}
          {activeTab === "grades" && (
            <Card>
              <CardHeader>
                <CardTitle>Grades</CardTitle>
              </CardHeader>
              <CardContent>Grade content goes here</CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
