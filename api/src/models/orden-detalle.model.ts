import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/database.js";

type SqlValue = string | number | bigint | boolean | Date | null | Buffer | Uint8Array;

export interface OrdenDetalle { plantas_id: number; ordenes_id: number; cantidad: number | null; precio_unitario: string | null; }

class OrdenDetalleModel {
  async findAll(): Promise<OrdenDetalle[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT `plantas_id`, `ordenes_id`, `cantidad`, `precio unitario` AS `precio_unitario` FROM `orden_detalle`");
    return rows as OrdenDetalle[];
  }

  async findByIds(ordenId: number, plantaId: number): Promise<OrdenDetalle | null> {
    const [rows] = await pool.execute<RowDataPacket[]>("SELECT `plantas_id`, `ordenes_id`, `cantidad`, `precio unitario` AS `precio_unitario` FROM `orden_detalle` WHERE `ordenes_id` = ? AND `plantas_id` = ?", [ordenId, plantaId]);
    return (rows[0] as OrdenDetalle | undefined) ?? null;
  }

  async create(data: OrdenDetalle): Promise<OrdenDetalle> {
    await pool.execute<ResultSetHeader>("INSERT INTO `orden_detalle` (`plantas_id`, `ordenes_id`, `cantidad`, `precio unitario`) VALUES (?, ?, ?, ?)", [data.plantas_id, data.ordenes_id, data.cantidad, data.precio_unitario]);
    return data;
  }

  async update(ordenId: number, plantaId: number, data: Pick<OrdenDetalle, "cantidad" | "precio_unitario">): Promise<OrdenDetalle | null> {
    const fields: [string, unknown][] = [];
    if (data.cantidad !== undefined) fields.push(["cantidad", data.cantidad]);
    if (data.precio_unitario !== undefined) fields.push(["precio unitario", data.precio_unitario]);
    await pool.execute<ResultSetHeader>(`UPDATE \`orden_detalle\` SET ${fields.map(([key]) => `\`${key}\` = ?`).join(", ")} WHERE \`ordenes_id\` = ? AND \`plantas_id\` = ?`, [...fields.map(([, value]) => value), ordenId, plantaId] as SqlValue[]);
    return this.findByIds(ordenId, plantaId);
  }

  async delete(ordenId: number, plantaId: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>("DELETE FROM `orden_detalle` WHERE `ordenes_id` = ? AND `plantas_id` = ?", [ordenId, plantaId]);
    return result.affectedRows > 0;
  }
}

export default new OrdenDetalleModel();
