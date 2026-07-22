import { createCrudController } from "./crud.controller.js";
import imagenService from "../services/imagen.service.js";
export default createCrudController(imagenService, ["url", "plantas_id", "tipo"], ["url", "plantas_id", "tipo"]);
