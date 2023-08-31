import mongoose from "mongoose";
interface iPro {
  title?: string;
  description?: string;
  image?: string;
  review?: any;
  user?: string;
}

export interface iProData extends iPro, mongoose.Document {}
const proModel = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
  review: { type: String },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "auths",
  },
});


export default mongoose.model<iProData>("products", proModel)
