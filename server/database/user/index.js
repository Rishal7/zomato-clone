import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [{ details: { type: String }, for: { type: String } }],
    phoneNumber: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

// Statics and Methods

UserSchema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, "ZomatoAPP");
};

UserSchema.statics.findByEmailAndPassword = async ({ password, email }) => {
  // Check whether email exists
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User doesn't exist!");

  // Compare password
  const doesPasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesPasswordMatch) throw new Error("Incorrect Password");

  return user;
};

UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
  // Check whether email exists
  const checkUserByEmail = await UserModel.findOne({ email });
  const checkUserByPhone = await UserModel.findOne({ phoneNumber });

  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User already exists!");
  }

  return false;
};

UserSchema.pre("save", function (next) {
  const user = this;

  // Password is modified
  if (!user.isModified("password")) return next();

  // Password bcryt salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    // Hash password
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      // Assign hashed password
      user.password = hash;
      return next();
    });
  });
});

export const UserModel = mongoose.model("Users", UserSchema);
