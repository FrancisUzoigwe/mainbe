import { errorFile, STATUS } from "./errorFile";
import express, { Request, Response, NextFunction } from "express";

export const handleError = (
  error: errorFile,
  res: Response
) => {
  return res.status(STATUS.OK).json({
    errorName: error.errorName,
    errorMessage: error.errorMessage,
    errorStatus: error.errorStatus,
    errorSuccess: error.errorSuccess,
    errorStack: error.stack,
    error,
  });
};

export const errorHandler = (
  error: errorFile,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleError(error, res);
};
