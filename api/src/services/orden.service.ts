import ordenModel, { type Orden } from "../models/orden.model.js";
import { BaseService } from "./base.service.js";
export default new BaseService<Orden>(ordenModel);
