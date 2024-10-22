import mongoose, { Schema, model } from "mongoose";

export interface SubmissionDocument {
  _id: string;
  name: string;
  student: { type: mongoose.Types.ObjectId; ref: "Profile" };
  type: string;
  body: {
    type: string;
    content: any;
  };
  score: number;
  active: boolean;
  course: { type: mongoose.Types.ObjectId; ref: "Course" };
  createdAt: Date;
  updatedAt: Date;
}
const SubmissionSchema = new Schema<SubmissionDocument>(
  {
    name: { type: String, required: true },
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
const Submission =
  mongoose.models?.Submission ||
  model<SubmissionDocument>("Submission", SubmissionSchema);

export { Submission };
