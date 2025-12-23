import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: { 
      type: String, 
      required: true,
      minlength: [6, 'Password must be at least 6 characters long']
    },
    name: { 
      type: String,
      trim: true,
      maxlength: [100, 'Name must be less than 100 characters']
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
    collection: "users" // store users in collection named "users"
  }
);

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;