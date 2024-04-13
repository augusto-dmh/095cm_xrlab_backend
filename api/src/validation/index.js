// only pure functions - handle the logic around send toasts outside.
import { z } from "zod";

export const isLengthValid = (value, min, max) => {
  const schema = z.string().min(min).max(max);
  return schema.safeParse(value).success;
};

export const isEmailValid = (email) => {
  const schema = z.string().email();
  return schema.safeParse(email).success;
};

export const isNumber = (value) => {
  const schema = z.number();
  return schema.safeParse(value).success;
};

export const isInteger = (value) => {
  const schema = z.number().int();
  return schema.safeParse(value).success;
};

// that's applied to non-string-type columns too - like 'age', because when they're not informed on creating/updating row routes where they should,
// they get during instantiation "" as value and are checkable with this validation. Then a "'field' is required" is thrown.
export const isNotEmpty = (value) => {
  if (typeof value !== "string") return true;

  const schema = z.string().trim().min(1);
  return schema.safeParse(value).success;
};

export const itExists = (value, row, Model) =>
  Model.findOne({
    where: {
      [row]: value,
    },
  });
