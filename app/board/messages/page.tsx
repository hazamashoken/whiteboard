import { getMessages } from "@/lib/edu/messages";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SendMessageForm } from "./_components/send-message-form";
import { getAllProfile } from "@/lib/edu/profile";

export default async function MessagePage() {
  const { userId } = auth();
  const { data: userData, error: userError } = await getAllProfile();
  const { data, error } = await getMessages(userId!);

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Send Message</CardTitle>
        </CardHeader>
        <CardContent>
          <SendMessageForm userOptions={userData} />
        </CardContent>
      </Card>

      <Card className="h-[400px] flex flex-col">
        <CardHeader>
          <CardTitle>Received Messages</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto">
          <ul className="space-y-2">
            {data.map((msg: any) => (
              <li key={msg._id} className="bg-primary/10 p-2 rounded">
                <div className="flex justify-between">
                  <p className="font-semibold">
                    From: {msg.sender.firstName} {msg.sender.lastName}
                  </p>
                  <p>{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
                <p>{msg.body}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
