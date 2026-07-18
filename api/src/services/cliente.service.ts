import clienteModel, { type Cliente } from "../models/cliente.model.js";
import { BaseService } from "./base.service.js";
export default new BaseService<Cliente>(clienteModel);
