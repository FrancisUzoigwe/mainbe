import { Request, Response } from "express";
import proModel from "../model/proModel";
import { STATUS, errorFile } from "../error/errorFile";
import cloudinary from "../config/cloudinary";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, review } = req.body;
    const { secure_url } = await cloudinary.uploader.upload(req.file?.path!);
    const makeproduct = await proModel.create({
      title,
      description,
      review,
      image: secure_url,
    });
    return res.status(STATUS.CREATED).json({
      message: "Product created successfully",
      data: makeproduct,
    });
  } catch (error: any) {
    return res.status(STATUS.BAD).json({
      message: error,
    });
  }
};
