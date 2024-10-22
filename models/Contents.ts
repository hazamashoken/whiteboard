import mongoose, { Schema, model } from "mongoose";

export interface ContentDocument {
  _id: string;
  name: string;
  description: string;

  type: string;
  body: {
    type: string;
    content: any;
  };
  active: boolean;
  course: { type: mongoose.Types.ObjectId; ref: "Course" };
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<ContentDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: true },
    type: { type: String, require: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

const Content =
  mongoose.models?.Content || model<ContentDocument>("Content", ContentSchema);

export { Content };
