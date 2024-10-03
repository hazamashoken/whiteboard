import mongoose, { Schema, model } from "mongoose";

export interface CourseDocument {
  _id: string;
  name: string;
  description: string;
  students: [{ type: mongoose.Types.ObjectId; ref: "Profile" }];
  teachers: [{ type: mongoose.Types.ObjectId; ref: "Profile" }];
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<CourseDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    students: [{ type: mongoose.Types.ObjectId, ref: "Profile" }],
    teachers: [{ type: mongoose.Types.ObjectId, ref: "Profile" }],
  },
  { timestamps: true }
);

const Course =
  mongoose.models?.Course || model<CourseDocument>("Course", CourseSchema);

export { Course };
