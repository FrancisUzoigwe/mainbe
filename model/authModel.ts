import mongoose from "mongoose";
interface iAuth {
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  avatar?: string;
  avatarID?: string;
  product?: [];
}

export interface iAuthData extends iAuth, mongoose.Document {}
const authModel = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    address: { type: String },
    avatar: { type: String },
    avatarID: { type: String },
    product: [
      {
        type: mongoose.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<iAuthData>("auths", authModel);
