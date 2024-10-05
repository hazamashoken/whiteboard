import mongoose, { Schema, model } from "mongoose";

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
  active: boolean;
  type: string;
  body: {
    type: string;
    content: any;
  };
  course: { type: mongoose.Types.ObjectId; ref: "Course" };
  createdAt: Date;
  updatedAt: Date;
}
const AssignmentSchema = new Schema<AssignmentDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: true },
    type: { type: String, require: true },
    course: { type: mongoose.Types.ObjectId, ref: "Course", required: true },
  },
  { timestamps: true }
);
const Assignment =
  mongoose.models?.Assignment ||
  model<AssignmentDocument>("Assignment", AssignmentSchema);

export { Assignment };
