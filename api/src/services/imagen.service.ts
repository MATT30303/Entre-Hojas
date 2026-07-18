import imagenModel, { type Imagen } from "../models/imagen.model.js";
import { BaseService } from "./base.service.js";
export default new BaseService<Imagen>(imagenModel);
