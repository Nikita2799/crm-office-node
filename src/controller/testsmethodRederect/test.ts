import { Request, Response, NextFunction } from "express";

export const test = (req: Request, res: Response, next: NextFunction) => {
  try {
    const x = req.middel;
    console.log(x);

    res.status(200).json(x);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
