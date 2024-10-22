import mongoose, { Schema, model } from "mongoose";

export enum PROFILE_TYPES {
  ADMIN,
  STUDENT,
  TEACHER,
}

export interface ProfileDocument {
  _id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  type: PROFILE_TYPES;
  active: boolean;
  courses: [{ type: mongoose.Types.ObjectId; ref: "Course" }];
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<ProfileDocument>(
  {
    userId: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    type: {
      type: Number,
      enum: [0, 1, 2],
      default: 1,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
  }
);

const Profile =
  mongoose.models?.Profile || model<ProfileDocument>("Profile", ProfileSchema);

export { Profile };
