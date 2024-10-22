import mongoose, { Schema, model } from "mongoose";
import { UploadedFileData } from "uploadthing/types";

/**
 * Assignment is for teacher to create for all student as work to be graded
 *
 * score is from 0 - 100
 *
 * type is can be limited or unlimited
 *
 * body is either text or url to pdf file
 */
export interface AssignmentDocument {
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
const AssignmentSchema = new Schema<AssignmentDocument>(
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

const Assignment =
  mongoose.models?.Assignment ||
  model<AssignmentDocument>("Assignment", AssignmentSchema);

export { Assignment };
