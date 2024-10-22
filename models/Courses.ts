import mongoose, { Schema, model } from "mongoose";

export interface CourseDocument {
  _id: string;
  name: string;
  description: string;
  students: [{ type: mongoose.Types.ObjectId; ref: "Profile" }];
  teachers: [{ type: mongoose.Types.ObjectId; ref: "Profile" }];
  createdAt: Date;
  updatedAt: Date;
  contents: [{ type: mongoose.Types.ObjectId; ref: "Content" }];
  assignments: [{ type: mongoose.Types.ObjectId; ref: "Assignment" }];
}

const CourseSchema = new Schema<CourseDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
    contents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
  },
  { timestamps: true }
);

const Course =
  mongoose.models?.Course || model<CourseDocument>("Course", CourseSchema);

export { Course };
