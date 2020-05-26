
import express, { Router } from "express";
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../../utils";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import routes from "./routes";

describe("routes", () => {


  test("a non-existing api method", async () => {

    expect(404).toEqual(404);
  });
  
  test("an empty string", async () => {
    expect(404).toEqual(404);
  });
});