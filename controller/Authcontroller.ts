import express, { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import multer from "../config/multer";
import authModel from "../model/authModel";
import bcrypt from "bcrypt";
import { STATUS, errorFile } from "../error/errorFile";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file?.path!
    );
    const user = await authModel.create({
      email,
      password: hashed,
      name,
      avatar: public_id,
      avatarID: secure_url,
      
    });
    return res.status(STATUS.CREATED).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    new errorFile({
      errorMessage: `Registration error ${req.originalUrl}`,
      errorName: "RegistrationError",
      errorStatus: STATUS.BAD,
      errorSuccess: false,
    });
    return res.status(STATUS.BAD).json({
      message: `Registration error ${req.originalUrl}`,
    });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email });
    if (user) {
      const check = await bcrypt.compare(password, user.password!);
      if (check) {
        return res.status(STATUS.OK).json({
          message: "User signed in successfully",
          data: user?._id,
        });
      } else {
        return res.status(STATUS.BAD).json({
          message:
            "Please you've to be registered first, or check your credentials and try again",
        });
      }
    }
  } catch (error) {
    return res.status(STATUS.BAD).json({
      message: "Error occured while signing in",
    });
  }
};

export const viewOne = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await authModel.findById(userID);
    return res.status(STATUS.OK).json({
      message: "Viewing user...",
      data: user,
    });
  } catch (error: any) {
    return res.status(STATUS.BAD).json({
      message: error,
    });
  }
};

export const viewAll = async (req: Request, res: Response) => {
  try {
    const user = await authModel.find();
    return res.status(STATUS.OK).json({
      message: "Viewing all users active on our platform",
      data: user,
    });
  } catch (error) {
    return res.status(STATUS.BAD).json({
      message: "Unable to get all users currently logged in",
    });
  }
};
