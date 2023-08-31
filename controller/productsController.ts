import { Request, Response } from "express";
import proModel from "../model/proModel";
import { STATUS } from "../error/errorFile";
import cloudinary from "../config/cloudinary";
import authModel from "../model/authModel";
import mongoose from "mongoose";

export const createProduct = async (req: any, res: Response) => {
  try {
    const {userID} = req.params
    const { title, description, review } = req.body;
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path!
    );
    const user = await authModel.findById(userID)
    const makeproduct = await proModel.create({
      title,
      description,
      review,
      image: secure_url,
      imageID: public_id,
      user: user?.name
    });

    user?.product?.push(new mongoose.Types.ObjectId(makeproduct?._id))
    user?.save()

    return res.status(STATUS.CREATED).json({
      message: "Product created successfully",
      data: makeproduct,
    });
  } catch (error: any) {
    return res.status(STATUS.BAD).json({
      message: error.message,
      error
    });
  }
};

export const viewProducts = async (req: Request, res: Response) => {
  try {
    const makeproduct = await proModel.find();
    return res.status(STATUS.CREATED).json({
      message: "Veiwing all product ",
      data: makeproduct,
    });
  } catch (error: any) {
    return res.status(STATUS.BAD).json({
      message: error,
    });
  }
};

export const viewOneProducts = async (req: Request, res: Response) => {
  try {
    const { userID, productID } = req.params;
    const product = await proModel.findById(userID, productID);
    return res.status(STATUS.CREATED).json({
      message: "Viewing one product ",
      data: product,
    });
  } catch (error: any) {
    return res.status(STATUS.BAD).json({
      message: error,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { proID } = req.params;
    const product = await proModel.findByIdAndDelete(proID);
    return res.status(STATUS.CREATED).json({
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error: any) {
    return res.status(STATUS.BAD).json({
      message: error,
    });
  }
};
