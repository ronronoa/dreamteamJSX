import { z } from "zod";

const MAX_ADDRESS_PART_LENGTH = 4;
const MAX_ADDRESS_DIGITS = 2;
const MAX_ADDRESS_LETTERS = 2;

export const ReportAddressPartSchema = z.string().trim().max(MAX_ADDRESS_PART_LENGTH)
  .regex(/^[a-zA-Z0-9]*$/)
  .refine((value) => {
    const digits = value.match(/[0-9]/g) ?? [];
    const letters = value.match(/[a-zA-Z]/g) ?? [];
    return digits.length <= MAX_ADDRESS_DIGITS && letters.length <= MAX_ADDRESS_LETTERS;
  }, "Use at most two digits and two letters.");
