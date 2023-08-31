import mongoose from "mongoose";

interface iPro {
  title?: string;
  description?: string;
  image?: string;
  imageID?: string;
  review?: any;
  user?: {};
}

export interface iProData extends iPro, mongoose.Document{}

const proModel = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
  imageID: { type: String },
  review: { type: String },
  user:{ type: String },
});


export default mongoose.model<iProData>("products", proModel)
