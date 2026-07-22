import { asyncHandler } from "../utils/async-handler.js";
import { HttpError } from "../utils/http-error.js";
import { parseId } from "../utils/request.js";
import ordenDetalleService from "../services/orden-detalle.service.js";

const ids = (params: Record<string, string | string[] | undefined>) => ({
  ordenId: parseId(params.ordenId, "ordenId"),
  plantaId: parseId(params.plantaId, "plantaId"),
});

export default {
  findAll: asyncHandler(async (_request, response) => response.json(await ordenDetalleService.findAll())),
  findByIds: asyncHandler(async (request, response) => {
    const { ordenId, plantaId } = ids(request.params);
    response.json(await ordenDetalleService.findByIds(ordenId, plantaId));
  }),
  create: asyncHandler(async (request, response) => {
    const { plantas_id, ordenes_id, cantidad = null, precio_unitario = null } = request.body;
    if (!Number.isInteger(plantas_id) || !Number.isInteger(ordenes_id)) throw new HttpError(400, "plantas_id and ordenes_id must be integers.");
    response.status(201).json(await ordenDetalleService.create({ plantas_id, ordenes_id, cantidad: cantidad as number | null, precio_unitario: precio_unitario as string | null }));
  }),
  update: asyncHandler(async (request, response) => {
    const { ordenId, plantaId } = ids(request.params);
    const { cantidad, precio_unitario } = request.body;
    if (cantidad === undefined && precio_unitario === undefined) throw new HttpError(400, "Provide cantidad or precio_unitario to update.");
    response.json(await ordenDetalleService.update(ordenId, plantaId, { cantidad, precio_unitario }));
  }),
  delete: asyncHandler(async (request, response) => {
    const { ordenId, plantaId } = ids(request.params);
    await ordenDetalleService.delete(ordenId, plantaId);
    response.status(204).send();
  }),
};
