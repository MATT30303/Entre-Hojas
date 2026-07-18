import { BaseModel } from "./base.model.js";

export interface Cliente { id: number; nombre: string; apellido: string | null; telefono: string | null; direccion: string | null; }

class ClienteModel extends BaseModel<Cliente> {
  protected readonly table = "clientes";
  protected readonly fields = ["nombre", "apellido", "telefono", "direccion"] as const;
}

export default new ClienteModel();
