"use client";

import { useState, useEffect } from "react";
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

type Message = {
  id: number;
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
};

export default function Component() {
  const recipients = ["Alice", "Bob", "Charlie", "David", "Eve"];
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipient && message) {
      console.log("Sending message:", { recipient, message });
      setMessage("");
    }
  };

  useEffect(() => {
    // Simulate receiving messages
    const receiveMessage = () => {
      const newMessage: Message = {
        id: Date.now(),
        sender: "John Doe",
        recipient: "You",
        content: `Hello! This is a simulated message. (${Date.now()})`,
        timestamp: new Date(),
      };
      setReceivedMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const intervalId = setInterval(receiveMessage, 5000); // Receive a new message every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Send Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSend} className="space-y-4">
            <Select onValueChange={setRecipient} value={recipient}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select recipient" />
              </SelectTrigger>
              <SelectContent>
                {recipients.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Type your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button type="submit">Send Message</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="h-[400px] flex flex-col">
        <CardHeader>
          <CardTitle>Received Messages</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto">
          <ul className="space-y-2">
            {receivedMessages.map((msg) => (
              <li key={msg.id} className="bg-primary/10 p-2 rounded">
                <p className="font-semibold">From: {msg.sender}</p>
                <p>{msg.content}</p>
                <p className="text-xs text-muted-foreground">
                  {msg.timestamp.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
