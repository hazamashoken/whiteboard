import mongoose, { Schema, model } from "mongoose";
import { UploadedFileData } from "uploadthing/types";

export interface ContentDocument {
  _id: string;
  name: string;
  description: string;

  body: string;
  active: boolean;
  course: { type: mongoose.Types.ObjectId; ref: "Course" };
  createdAt: Date;
  updatedAt: Date;
  file: UploadedFileData | null;
}

const ContentSchema = new Schema<ContentDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    body: { type: String },
    file: { type: Object },
  },
  { timestamps: true }
);

const Content =
  mongoose.models?.Content || model<ContentDocument>("Content", ContentSchema);

export { Content };
