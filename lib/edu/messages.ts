"use server";
import { connectDB } from "@/db/mongoose";
import { Message, MessageDocument } from "@/models/Messages";
import { mongoToJSON } from "../utils";
import { Profile } from "@/models";
import { auth } from "@clerk/nextjs/server";

export async function getMessages(userId: string): Promise<{
  error: string | null;
  data: MessageDocument[];
}> {
  await connectDB();

  const profile = await Profile.findOne({ userId: userId });

  const messages = await Message.find<MessageDocument>({
    $or: [{ recipient: profile._id }],
  })
    .populate("sender")
    .populate("recipient");

  return {
    error: null,
    data: mongoToJSON(messages),
  };
}

export async function sendMessage(recipientId: string, message: string) {
  await connectDB();

  const { userId } = auth();

  const profile = await Profile.findOne({ userId });

  const messageObj = await Message.create({
    sender: profile._id,
    recipient: recipientId,
    body: message,
  });

  return {
    error: null,
    data: mongoToJSON(messageObj),
  };
}
