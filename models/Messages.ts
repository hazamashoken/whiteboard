import mongoose, { Schema, model } from "mongoose";
export interface MessageDocument {
  _id: string;

  sender: { type: mongoose.Types.ObjectId; ref: "Profile" };
  recipient: { type: mongoose.Types.ObjectId; ref: "Profile" };

  body: string;

  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<MessageDocument>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    body: { type: String },
  },
  { timestamps: true }
);

const Message =
  mongoose.models?.Message || model<MessageDocument>("Message", MessageSchema);

export { Message };
