import { Router } from "express";
import type { RequestHandler } from "express";

type CrudController = {
  findAll: RequestHandler;
  findById: RequestHandler;
  create: RequestHandler;
  update: RequestHandler;
  delete: RequestHandler;
};

export const createCrudRouter = (controller: CrudController) => {
  const router = Router();
  router.route("/").get(controller.findAll).post(controller.create);
  router.route("/:id").get(controller.findById).patch(controller.update).delete(controller.delete);
  return router;
};
