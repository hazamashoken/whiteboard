"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCourse } from "@/lib/edu/courses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import React from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const courseFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});

type CourseForm = z.infer<typeof courseFormSchema>;

export default function CourseForm() {
  const [pending, setPending] = React.useState(false);
  const router = useRouter();
  const form = useForm<CourseForm>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  async function onSubmit(values: CourseForm) {
    setPending(true);
    const { error } = await createCourse(values);
    setPending(false);
    if (error) {
      console.error(error);
      toast.error(error);
    } else {
      toast.success("Course created successfully");
      form.reset();
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>The name of the course</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>The description of the course</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={pending} className="mt-2">
          <Plus className="mr-2 h-4 w-4" />
          Submit
        </Button>
      </form>
    </Form>
  );
}
