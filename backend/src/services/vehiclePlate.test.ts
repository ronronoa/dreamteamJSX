import { describe, expect, it } from "vitest";
import { CreateVehicleSchema, UpdateVehicleDetailsSchema } from "@/schemas/vehicle.schema";
import { isValidVehiclePlate, normalizeVehiclePlateInput } from "../../../frontend/src/utils/vehiclePlate";

describe("vehicle plate validation", () => {
  it.each(["ABC1234", "abc1234", "ABC 1234"])("saves %s in the standard format", (plateNumber) => {
    const input = { vehicleName: "Barangay Mobile", plateNumber };
    expect(CreateVehicleSchema.parse(input).plateNumber).toBe("ABC 1234");
    expect(UpdateVehicleDetailsSchema.parse(input).plateNumber).toBe("ABC 1234");
  });

  it.each(["", "123ABCD", "12A1234", "AB12345", "ABCD123", "ABC123", "ABC12345", "ABC-1234", "ABC!1234", "ABC  1234"])("rejects invalid plate %j", (plateNumber) => {
    const input = { vehicleName: "Barangay Mobile", plateNumber };
    expect(CreateVehicleSchema.safeParse(input).success).toBe(false);
    expect(UpdateVehicleDetailsSchema.safeParse(input).success).toBe(false);
    expect(isValidVehiclePlate(plateNumber)).toBe(false);
  });

  it("normalizes input to uppercase without spaces", () => {
    expect(normalizeVehiclePlateInput("abc 1234")).toBe("ABC1234");
    expect(isValidVehiclePlate(normalizeVehiclePlateInput("abc 1234"))).toBe(true);
    expect(isValidVehiclePlate(normalizeVehiclePlateInput("abc-1234"))).toBe(false);
  });
});
