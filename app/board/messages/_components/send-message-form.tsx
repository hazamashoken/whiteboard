"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { sendMessage } from "@/lib/edu/messages";
import { ProfileDocument } from "@/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const SendMessageFormSchema = z.object({
  recipient: z.string().min(1),
  message: z.string().min(1),
});

type SendMessageFormProps = z.infer<typeof SendMessageFormSchema>;

export function SendMessageForm({
  userOptions,
}: {
  userOptions: ProfileDocument[];
}) {
  const form = useForm({
    resolver: zodResolver(SendMessageFormSchema),
    defaultValues: {
      recipient: "",
      message: "",
    },
  });

  async function onSubmit(formData: SendMessageFormProps) {
    const { data, error } = await sendMessage(
      formData.recipient,
      formData.message
    );
    toast.success("Message sent");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="recipient"
          control={form.control}
          rules={{ required: "Recipient is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="recipient">
                <SelectValue placeholder="Select recipient" />
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
        <FormField
          name="message"
          control={form.control}
          rules={{ required: "Message is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <Textarea
                {...field}
                className="w-full p-2 border rounded"
                placeholder="Message"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Send Message</Button>
      </form>
    </Form>
  );
}
