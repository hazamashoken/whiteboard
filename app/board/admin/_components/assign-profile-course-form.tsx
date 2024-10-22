"use client";

import { CourseDocument } from "@/models/Courses";
import { ProfileDocument } from "@/models/Profiles";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { addStudentsToCourse, addTeachersToCourse } from "@/lib/edu/courses";
import { Plus } from "lucide-react";
import React from "react";

type Role = "student" | "teacher";
type Assignment = {
  id: number;
  user: string;
  role: Role;
  course: string;
};

type FormData = {
  role: Role;
  user: string;
  course: string;
};

export type AssignProfileCourseFormProps = {
  students: ProfileDocument[];
  teachers: ProfileDocument[];
  courses: CourseDocument[];
};
export function AssignProfileCourse(props: AssignProfileCourseFormProps) {
  const { students, teachers, courses } = props;
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [userOptions, setUserOptions] = React.useState(students);

  const form = useForm<FormData>({
    defaultValues: {
      role: "student",
      user: "",
      course: "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    setPending(true);
    const addUserToCourse =
      formData.role === "student" ? addStudentsToCourse : addTeachersToCourse;
    const { data, error } = await addUserToCourse(formData.course, [
      formData.user,
    ]);
    if (error) {
      console.error(error);
      return toast.error(error);
    } else {
      toast.success(`${data.user} (${data.role}) assigned to ${data.course}`);
      form.reset();
    }
    setPending(false);
    router.refresh();
  };

  const role = form.watch("role");

  useEffect(() => {
    if (role === "student") {
      setUserOptions(students);
    } else {
      setUserOptions(teachers);
    }
    form.setValue("user", "");
  }, [role, students, teachers, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <FormField
              control={form.control}
              name="role"
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user">User</Label>
            <FormField
              name="user"
              control={form.control}
              rules={{ required: "User is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="user">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {userOptions.map((u) => (
                      <SelectItem key={u._id} value={u._id}>
                        {u.firstName} {u.lastName} ({u.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="course">Course</Label>
          <FormField
            name="course"
            control={form.control}
            rules={{ required: "Course is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <Button type="submit" disabled={pending}>
          <Plus className="mr-2 h-4 w-4" />
          Submit
        </Button>
      </form>
    </Form>
  );
}
