import mongoose, { Schema, model } from "mongoose";

export interface ProfileDocument {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  type: string;
  active: boolean;
  courses: [{ type: mongoose.Types.ObjectId; ref: "Course" }];
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<ProfileDocument>(
  {
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
      default: true,
    },
    type: {
      type: String,
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

const Profile =
  mongoose.models?.Profile || model<ProfileDocument>("Profile", ProfileSchema);

export { Profile };
