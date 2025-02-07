import { Response } from "express";

export const handleSuccess = (res: Response, data: any, statusCode = 200) => {
  return res.status(statusCode).json({ success: true, data });
};

export const handleError = (res: Response, error: any) => {
  console.error(error);
  return res.status(500).json({ success: false, message: "Internal Server Error" });
};
