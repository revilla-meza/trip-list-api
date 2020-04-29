import { Router, Request, Response, NextFunction } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  user: any;
}
export enum TravelMethod {
  airplane = "airplane",
  train = "train",
  car = "car",
  other = "other",
}


export type Wrapper = (router: Router) => void;

export type Handler = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => Promise<void> | void;

export type Route = {
  path: string;
  method: string;
  handler: Handler | Handler[];
};
