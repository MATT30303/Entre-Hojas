import { HttpError } from "../utils/http-error.js";

type CrudModel<T> = {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<boolean>;
};

export class BaseService<T extends object> {
  constructor(protected readonly model: CrudModel<T>) {}

  findAll() { return this.model.findAll(); }

  async findById(id: number) {
    const record = await this.model.findById(id);
    if (!record) throw new HttpError(404, "Resource not found.");
    return record;
  }

  create(data: Partial<T>) { return this.model.create(data); }

  async update(id: number, data: Partial<T>) {
    const record = await this.model.update(id, data);
    if (!record) throw new HttpError(404, "Resource not found.");
    return record;
  }

  async delete(id: number) {
    if (!(await this.model.delete(id))) throw new HttpError(404, "Resource not found.");
  }
}
