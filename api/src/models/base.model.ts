import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/database.js";

type SqlValue = string | number | bigint | boolean | Date | null | Buffer | Uint8Array;

export abstract class BaseModel<T extends object> {
  protected abstract readonly table: string;
  protected abstract readonly fields: readonly (keyof T & string)[];

  async findAll(): Promise<T[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM \`${this.table}\``);
    return rows as T[];
  }

  async findById(id: number): Promise<T | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT * FROM \`${this.table}\` WHERE \`id\` = ?`,
      [id],
    );
    return (rows[0] as T | undefined) ?? null;
  }

  async create(data: Partial<T>): Promise<T> {
    const entries = this.entries(data);
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO \`${this.table}\` (${entries.map(([key]) => `\`${key}\``).join(", ")}) VALUES (${entries.map(() => "?").join(", ")})`,
      entries.map(([, value]) => value) as SqlValue[],
    );
    const created = await this.findById(result.insertId);
    if (!created) throw new Error(`Unable to retrieve newly created ${this.table} record.`);
    return created;
  }

  async update(id: number, data: Partial<T>): Promise<T | null> {
    const entries = this.entries(data);
    await pool.execute<ResultSetHeader>(
      `UPDATE \`${this.table}\` SET ${entries.map(([key]) => `\`${key}\` = ?`).join(", ")} WHERE \`id\` = ?`,
      [...entries.map(([, value]) => value), id] as SqlValue[],
    );
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `DELETE FROM \`${this.table}\` WHERE \`id\` = ?`,
      [id],
    );
    return result.affectedRows > 0;
  }

  private entries(data: Partial<T>): [string, unknown][] {
    return this.fields
      .filter((field) => data[field] !== undefined)
      .map((field) => [field, data[field]]);
  }
}
