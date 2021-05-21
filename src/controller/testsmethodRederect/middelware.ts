import { NextFunction, Request, Response } from "express";

export const middelware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { x } = req.body;
    req.middel = x;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "worng some" });
  }
};
