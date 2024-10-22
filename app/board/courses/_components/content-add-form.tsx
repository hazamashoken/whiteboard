"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { UploadButton } from "@/lib/utils";
import { toast } from "sonner";
import { UploadedFileData } from "uploadthing/types";
import { Button } from "@/components/ui/button";
import { removeFile } from "@/lib/edu/file";
import { addContentToCourse } from "@/lib/edu/contents";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addAssignmentToCourse } from "@/lib/edu/assignments";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
type CourseFormProp = {
  name: string;
  description: string;
  body: string;
  type: "content" | "assignment";
  file: UploadedFileData | null;
};

const courseFormSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  body: z.string(),
  type: z.string().min(1),
  file: z.object({ key: z.string(), name: z.string() }).nullable(),
});

export function CourseForm({ courseId }: { courseId: string }) {
  const [pending, setPending] = React.useState(false);
  const form = useForm<CourseFormProp>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: "",
      description: "",
      body: "",
      type: "content",
      file: null,
    },
  });
  const file = form.watch("file");

  async function handleRemoveFile() {
    if (!file) return;
    removeFile(file.key);
    form.setValue("file", null);
  }

  async function onSubmit(formData: CourseFormProp) {
    setPending(true);
    const payload = {
      name: formData.name,
      description: formData.description,
      body: formData.body,
      file: formData.file,
    };
    const addToCourse =
      formData.type === "content" ? addContentToCourse : addAssignmentToCourse;
    const { data, error } = await addToCourse(courseId, payload);

    if (error) {
      toast.error("Error adding content to course, please try again.");
    } else {
      toast.success("Content added to course successfully.");
      form.reset({ type: "content" });
    }
    setPending(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>File: {file?.name}</div>
        <UploadButton
          appearance={{
            button: "bg-primary w-24 text-sm",
            container: "w-fit",
            allowedContent: "",
          }}
          disabled={file !== null}
          endpoint="productPdf"
          onClientUploadComplete={(res) => {
            console.log("File: ", res[0]);
            form.setValue("file", res[0]);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error("Error uploading file, please try again.");
          }}
        />
        <Button
          type="button"
          onClick={handleRemoveFile}
          disabled={file === null}
        >
          Clear File
        </Button>
        <FormField
          name="body"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Content" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="content" />
                    </FormControl>
                    <FormLabel className="font-normal">Content</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="assignment" />
                    </FormControl>
                    <FormLabel className="font-normal">Assignment</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit" className="mt-2" disabled={pending}>
            Submit
          </Button>
          <Button variant={"outline"} asChild>
            <Link href={`/board/courses/${courseId}`}>Back</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
