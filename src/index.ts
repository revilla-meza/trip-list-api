import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import dbConfig from './ormconfig';
import http from 'http';
import express from 'express';
import { applyMiddleware, applyRoutes } from './utils';
import { createConnection } from 'typeorm';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';
import routes from './routes';
import validateEnv from './utils/validateEnv';

process.on('uncaughtException', (e) => {
  console.log(e);
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  console.log(e);
  process.exit(1);
});

validateEnv();

createConnection(dbConfig).then(() => {
  const router = express();
  applyMiddleware(middleware, router);
  applyRoutes(routes, router);
  applyMiddleware(errorHandlers, router);

  const { PORT = 3000 } = process.env;
  const server = http.createServer(router);
  server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
});
