import { Router } from "express";
import { middelware } from "./middelware";
import { getquery } from "./postquery";
import { test } from "./test";

export const TRouter = (router: any) => {
  router.get("/test/get", getquery);
  router.post("/test/post_data", middelware, test);
};
