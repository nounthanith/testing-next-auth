import mongoose, { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name?: string;
  image?: string;
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    image: { type: String },
    emailVerified: { type: Date },
  },
  { timestamps: true }
);

const User = (models.User as mongoose.Model<IUser>) || model<IUser>("User", UserSchema);

export default User;
