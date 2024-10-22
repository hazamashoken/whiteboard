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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import React from "react";
import { createProfile } from "@/lib/edu/profile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { PROFILE_TYPES } from "@/models";
import { useRouter } from "next/navigation";

enum ProfileType {
  Student = "STUDENT",
  Teacher = "TEACHER",
  Admin = "ADMIN",
}

const profileFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  type: z.nativeEnum(ProfileType),
});

type ProfileForm = Omit<z.infer<typeof profileFormSchema>, "userId">;

export default function ProfileForm() {
  const [pending, setPending] = React.useState(false);
  const router = useRouter();
  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      type: ProfileType.Student,
    },
  });
  async function onSubmit(values: ProfileForm) {
    setPending(true);
    function convertType(type: ProfileType) {
      switch (type) {
        case ProfileType.Student:
          return PROFILE_TYPES.STUDENT;
        case ProfileType.Teacher:
          return PROFILE_TYPES.TEACHER;
        case ProfileType.Admin:
          return PROFILE_TYPES.ADMIN;
      }
    }
    const { data, error } = await createProfile(
      values,
      convertType(values.type)
    );

    setPending(false);
    if (error) {
      console.error(error);
      toast.error(error);
    } else {
      toast.success("Profile created successfully");
      form.reset();
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Profile Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ProfileType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={pending} className="mt-3">
          <Plus className="mr-2 h-4 w-4" />
          Submit
        </Button>
      </form>
    </Form>
  );
}
