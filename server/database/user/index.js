import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String },
    address: [{ details: { type: String }, for: { type: String } }],
    phonenumber: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

export const Usermodel = mongoose.model("Users", UserSchema);
screen;
