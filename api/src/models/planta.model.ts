import { BaseModel } from "./base.model.js";
import type { RowDataPacket } from "mysql2";
import pool from "../config/database.js";

export interface Planta {
  id: number; nombre: string; familia: string | null; precio: number; discount: number; stock: number;
  etiqueta: string | null; origen: string | null; tipo: string | null; iluminacion: string | null;
  resistencia: string | null; tamano: string | null; cuidado: string | null; descripcion: string | null;
}

export interface ImagenDePlanta {
  id: number;
  url: string;
  tipo: string;
}

export interface PlantaDetalle extends Planta {
  imagenes: ImagenDePlanta[];
}

export interface PlantaResumen {
  id: number;
  name: string;
  price: number;
  image: string | null;
  discount: number;
  label: string;
}

class PlantaModel extends BaseModel<Planta> {
  async findDetailById(id: number): Promise<PlantaDetalle | null> {
    const [plantas] = await pool.execute<RowDataPacket[]>("SELECT * FROM `plantas` WHERE `id` = ?", [id]);
    const planta = plantas[0] as Planta | undefined;
    if (!planta) return null;

    const [imagenes] = await pool.execute<RowDataPacket[]>(
      "SELECT `id`, `url`, `tipo` FROM `imagenes` WHERE `plantas_id` = ? ORDER BY `id`",
      [id],
    );

    return { ...planta, imagenes: imagenes as ImagenDePlanta[] };
  }

  async findByFamily(familia: string): Promise<PlantaResumen[]> {
    const [plantas] = await pool.execute<RowDataPacket[]>(
      `SELECT
        p.\`id\`,
        p.\`nombre\` AS \`name\`,
        p.\`precio\` AS \`price\`,
        (
          SELECT i.\`url\`
          FROM \`imagenes\` AS i
          WHERE i.\`plantas_id\` = p.\`id\`
          ORDER BY i.\`id\`
          LIMIT 1
        ) AS \`image\`,
        COALESCE(p.\`discount\`, 0) AS \`discount\`,
        COALESCE(p.\`etiqueta\`, '') AS \`label\`
      FROM \`plantas\` AS p
      WHERE (? = 'AllPlants' OR p.\`familia\` = ?)
      ORDER BY p.\`nombre\``,
      [familia, familia],
    );
    return plantas as PlantaResumen[];
  }

  protected readonly table = "plantas";
  protected readonly fields = ["nombre", "familia", "precio", "discount", "stock", "etiqueta", "origen", "tipo", "iluminacion", "resistencia", "tamano", "cuidado", "descripcion"] as const;
}

export default new PlantaModel();
