import { Router } from 'express';
import { Wrapper, Route } from '../types';

export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};


export const applyRoutes = (routes: Route[], router: Router) => {
  const controllerInstances:any = {};
  for (const route of routes) {
    const { method, path, getHandler, root, controller } = route;

    if (!controllerInstances[root]) {
      controllerInstances[root] = new controller;
    }
    

    (router as any)[method](path, getHandler(controllerInstances[root]));
  }
  router.get('/', (req, res, next)=>{ return res.send("ok health check for real");})
};
