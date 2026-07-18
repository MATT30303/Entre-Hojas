import ordenDetalleModel, { type OrdenDetalle } from "../models/orden-detalle.model.js";
import { HttpError } from "../utils/http-error.js";

class OrdenDetalleService {
  findAll() { return ordenDetalleModel.findAll(); }

  async findByIds(ordenId: number, plantaId: number) {
    const record = await ordenDetalleModel.findByIds(ordenId, plantaId);
    if (!record) throw new HttpError(404, "Order detail not found.");
    return record;
  }

  create(data: OrdenDetalle) { return ordenDetalleModel.create(data); }

  async update(ordenId: number, plantaId: number, data: Pick<OrdenDetalle, "cantidad" | "precio_unitario">) {
    const record = await ordenDetalleModel.update(ordenId, plantaId, data);
    if (!record) throw new HttpError(404, "Order detail not found.");
    return record;
  }

  async delete(ordenId: number, plantaId: number) {
    if (!(await ordenDetalleModel.delete(ordenId, plantaId))) throw new HttpError(404, "Order detail not found.");
  }
}

export default new OrdenDetalleService();
