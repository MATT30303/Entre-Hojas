import { HttpError } from "./http-error.js";

export const parseId = (value: string | string[] | undefined, name = "id"): number => {
  if (typeof value !== "string") {
    throw new HttpError(400, `${name} must be a single value.`);
  }
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) {
    throw new HttpError(400, `${name} must be a positive integer.`);
  }
  return id;
};

export const pickFields = <T extends object>(
  body: Record<string, unknown>,
  fields: readonly (keyof T & string)[],
  required = false,
): Partial<T> => {
  const data = Object.fromEntries(
    fields.filter((field) => body[field] !== undefined).map((field) => [field, body[field]]),
  ) as Partial<T>;

  if (required && Object.keys(data).length !== fields.length) {
    throw new HttpError(400, `Required fields: ${fields.join(", ")}.`);
  }
  if (!required && Object.keys(data).length === 0) {
    throw new HttpError(400, "Provide at least one field to update.");
  }
  return data;
};
