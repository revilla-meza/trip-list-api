
import { Request, Response } from "express";

export default [
  {
    path: "/lists",
    method: "get",
    handler: async (req: Request, res: Response) => {
      res.send("Hello world!");
    }
  }
];