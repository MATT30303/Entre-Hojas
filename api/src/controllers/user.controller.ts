import { createCrudController } from "./crud.controller.js";
import userService from "../services/user.service.js";
export default createCrudController(userService, ["usuario", "contraseña"], ["id"], ["id", "usuario", "contraseña"]);
