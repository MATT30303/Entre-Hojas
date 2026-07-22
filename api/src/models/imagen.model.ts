import { BaseModel } from "./base.model.js";

export interface Imagen { id: number; url: string; plantas_id: number; tipo: string; }

class ImagenModel extends BaseModel<Imagen> {
  protected readonly table = "imagenes";
  protected readonly fields = ["url", "plantas_id", "tipo"] as const;
}

export default new ImagenModel();
