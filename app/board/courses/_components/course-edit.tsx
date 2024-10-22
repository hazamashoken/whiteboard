"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, FileText, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ContentItem = {
  type: "file" | "text";
  content: string;
};

type Assignment = {
  title: string;
  description: string;
  content: ContentItem[];
};

type Submission = {
  studentName: string;
  content: ContentItem[];
};

export function CourseManagement({
  isTeacher = true,
}: {
  isTeacher?: boolean;
}) {
  const [courseContent, setCourseContent] = useState<ContentItem[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<{
    [key: string]: Submission[];
  }>({});

  const addContent = (content: ContentItem) => {
    setCourseContent([...courseContent, content]);
  };

  const addAssignment = (assignment: Assignment) => {
    setAssignments([...assignments, assignment]);
  };

  const submitAssignment = (
    assignmentTitle: string,
    submission: Submission
  ) => {
    setSubmissions({
      ...submissions,
      [assignmentTitle]: [...(submissions[assignmentTitle] || []), submission],
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          {isTeacher && (
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                Add files or text content to your course.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContentForm onSubmit={addContent} />
              <ContentList items={courseContent} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>
                Create and view assignments for your course.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isTeacher ? (
                <AssignmentForm onSubmit={addAssignment} />
              ) : (
                <StudentAssignmentView
                  assignments={assignments}
                  onSubmit={submitAssignment}
                />
              )}
              <AssignmentList assignments={assignments} />
            </CardContent>
          </Card>
        </TabsContent>
        {isTeacher && (
          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>Submissions</CardTitle>
                <CardDescription>
                  View student submissions for assignments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SubmissionList submissions={submissions} />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

function ContentForm({
  onSubmit,
}: {
  onSubmit: (content: ContentItem) => void;
}) {
  const [contentType, setContentType] = useState<"file" | "text">("text");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type: contentType, content });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <Button
          type="button"
          variant={contentType === "text" ? "default" : "outline"}
          onClick={() => setContentType("text")}
        >
          <FileText className="mr-2 h-4 w-4" />
          Text
        </Button>
        <Button
          type="button"
          variant={contentType === "file" ? "default" : "outline"}
          onClick={() => setContentType("file")}
        >
          <Upload className="mr-2 h-4 w-4" />
          File
        </Button>
      </div>
      {contentType === "text" ? (
        <Textarea
          placeholder="Enter text content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <Input
          type="file"
          onChange={(e) => setContent(e.target.files?.[0]?.name || "")}
        />
      )}
      <Button type="submit">Add Content</Button>
    </form>
  );
}

function ContentList({ items }: { items: ContentItem[] }) {
  return (
    <ScrollArea className="h-[200px] w-full border rounded-md p-4 mt-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          {item.type === "file" ? (
            <Upload className="h-4 w-4" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          <span>{item.content}</span>
        </div>
      ))}
    </ScrollArea>
  );
}

function AssignmentForm({
  onSubmit,
}: {
  onSubmit: (assignment: Assignment) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState<ContentItem[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, content });
    setTitle("");
    setDescription("");
    setContent([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Assignment Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Assignment Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <ContentForm onSubmit={(item) => setContent([...content, item])} />
      <Button type="submit">Create Assignment</Button>
    </form>
  );
}

function AssignmentList({ assignments }: { assignments: Assignment[] }) {
  return (
    <ScrollArea className="h-[200px] w-full border rounded-md p-4 mt-4">
      {assignments.map((assignment, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <CardTitle>{assignment.title}</CardTitle>
            <CardDescription>{assignment.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ContentList items={assignment.content} />
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
}

function StudentAssignmentView({
  assignments,
  onSubmit,
}: {
  assignments: Assignment[];
  onSubmit: (title: string, submission: Submission) => void;
}) {
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [studentName, setStudentName] = useState("");
  const [submissionContent, setSubmissionContent] = useState<ContentItem[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAssignment) {
      onSubmit(selectedAssignment.title, {
        studentName,
        content: submissionContent,
      });
      setStudentName("");
      setSubmissionContent([]);
      setSelectedAssignment(null);
    }
  };

  return (
    <div className="space-y-4">
      <Select
        value={selectedAssignment?.title || ""}
        onValueChange={(value) =>
          setSelectedAssignment(
            assignments.find((a) => a.title === value) || null
          )
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select an assignment" />
        </SelectTrigger>
        <SelectContent>
          {assignments.map((assignment, index) => (
            <SelectItem key={index} value={assignment.title}>
              {assignment.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedAssignment && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Your Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <ContentForm
            onSubmit={(item) =>
              setSubmissionContent([...submissionContent, item])
            }
          />
          <Button type="submit">Submit Assignment</Button>
        </form>
      )}
    </div>
  );
}

function SubmissionList({
  submissions,
}: {
  submissions: { [key: string]: Submission[] };
}) {
  return (
    <ScrollArea className="h-[400px] w-full border rounded-md p-4">
      {Object.entries(submissions).map(
        ([assignmentTitle, assignmentSubmissions]) => (
          <div key={assignmentTitle} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{assignmentTitle}</h3>
            {assignmentSubmissions.map((submission, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle>{submission.studentName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContentList items={submission.content} />
                </CardContent>
              </Card>
            ))}
          </div>
        )
      )}
    </ScrollArea>
  );
}
