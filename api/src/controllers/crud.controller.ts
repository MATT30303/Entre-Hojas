import type { RequestHandler } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { HttpError } from "../utils/http-error.js";
import { pickFields, parseId } from "../utils/request.js";

type CrudService<T extends object> = {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
};

export const createCrudController = <T extends object>(
  service: CrudService<T>,
  fields: readonly (keyof T & string)[],
  requiredOnCreate: readonly (keyof T & string)[],
  createFields = fields,
) => ({
  findAll: asyncHandler(async (_request, response) => response.json(await service.findAll())),
  findById: asyncHandler(async (request, response) => response.json(await service.findById(parseId(request.params.id)))),
  create: asyncHandler(async (request, response) => {
    const data = pickFields<T>(request.body, createFields);
    for (const field of requiredOnCreate) if (data[field] === undefined) throw new HttpError(400, `Required field: ${field}.`);
    response.status(201).json(await service.create(data));
  }),
  update: asyncHandler(async (request, response) => response.json(await service.update(parseId(request.params.id), pickFields<T>(request.body, fields)))),
  delete: asyncHandler(async (request, response) => {
    await service.delete(parseId(request.params.id));
    response.status(204).send();
  }),
} satisfies Record<string, RequestHandler>);
