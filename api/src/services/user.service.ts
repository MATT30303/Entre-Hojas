import userModel, { type User } from "../models/user.model.js";
import { BaseService } from "./base.service.js";
export default new BaseService<User>(userModel);
