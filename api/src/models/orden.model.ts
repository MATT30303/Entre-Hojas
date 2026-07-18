import { BaseModel } from "./base.model.js";

export interface Orden { id: number; fecha: string | null; estado: string | null; total: number; clientes_id: number; }

class OrdenModel extends BaseModel<Orden> {
  protected readonly table = "ordenes";
  protected readonly fields = ["fecha", "estado", "total", "clientes_id"] as const;
}

export default new OrdenModel();
