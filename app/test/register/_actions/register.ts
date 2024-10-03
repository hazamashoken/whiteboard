"use server";
import { connectDB } from "@/db/mongoose";
import { Profile } from "@/models/Profile";

export const register = async (values: any) => {
  const { email, firstName, lastName } = values;

  try {
    await connectDB();
    const userFound = await Profile.findOne({ email });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }

    const user = new Profile({
      firstName,
      lastName,
      email,
    });
    const savedUser = await user.save();
  } catch (e) {
    console.log(e);
  }
};
