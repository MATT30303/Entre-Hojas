import { createCrudController } from "./crud.controller.js";
import clienteService from "../services/cliente.service.js";
export default createCrudController(clienteService, ["nombre", "apellido", "telefono", "direccion"], ["nombre"]);
