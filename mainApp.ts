import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { STATUS, errorFile } from "./error/errorFile";
import { errorHandler } from "./error/errorHandler";
import auth from "./router/authRouter"

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );
  app.all(
    "*",
    (error: errorFile, req: Request, res: Response, next: NextFunction) => {
      next(
        new errorFile({
          errorMessage: `This error is coming up as a result${req.originalUrl}`,
          errorName: "route Error",
          errorStatus: STATUS.BAD,
          errorSuccess: false,
        })
      );
    }
  );
  app.use(errorHandler);
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(STATUS.OK).json({
        message: "Viewing Mr Francis's Api",
      });
    } catch (error) {
      return res.status(STATUS.BAD).json({
        message: "Unable to retrieve and consume this endpoint",
      });
    }
  });
  app.get("/api/v1", (req: Request, res: Response) => {
    try {
      return res.status(STATUS.OK).json({
        message: "Viewing Mr Francis's Api",
      });
    } catch (error) {
      return res.status(STATUS.BAD).json({
        message: "Unable to retrieve and consume this endpoint",
      });
    }
  });
  app.use("/api/v1", auth)
};
