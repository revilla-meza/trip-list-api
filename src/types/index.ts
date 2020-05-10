import { Router, Request, Response, NextFunction } from 'express';

export interface GetUserAuthInfoRequest extends Request {
  user: any;
  query: any;
  headers: any;
}
export enum TravelMethod {
  airplane = "airplane",
  train = "train",
  car = "car",
  other = "other",
}


export type Wrapper = (router: Router) => void;

export type Handler = (req: GetUserAuthInfoRequest, res: Response, next: NextFunction) => Promise<void> | void;

export type Route = {
  path: string;
  method: string;
  getHandler: (instance:any) => Handler | Handler[];
  root: string;
  controller: any;
};
