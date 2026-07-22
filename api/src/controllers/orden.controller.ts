import { createCrudController } from "./crud.controller.js";
import ordenService from "../services/orden.service.js";
export default createCrudController(ordenService, ["fecha", "estado", "total", "clientes_id"], ["total", "clientes_id"]);
