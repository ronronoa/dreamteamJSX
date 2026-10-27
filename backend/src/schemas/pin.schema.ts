import { z } from "zod";

export const REPORT_PIN_PATTERN = /^\d{4}$/;
export const REPORT_PIN_MESSAGE = "Enter exactly four digits, for example 0482.";
export const ReportPinSchema = z.string().trim().regex(REPORT_PIN_PATTERN, REPORT_PIN_MESSAGE);

export const SetPinSchema = z.object({
  pin: ReportPinSchema,
});

export const VerifyPinSchema = z.object({
  pin: ReportPinSchema,
});
