import { describe, expect, it } from "vitest";
import { CreateUserSchema, UpdateUserSchema } from "./user.schema";

const newUser = {
  name: "Jan Aryan Bebania",
  firstName: "Jan Aryan",
  lastName: "Bebania",
  username: "j.bebania",
  team_id: "00000000-0000-4000-8000-000000000001",
};

describe("account name and mobile validation", () => {
  it.each(["09171234567", "639171234567"])("accepts a valid digits-only mobile number: %s", (phone) => {
    const result = CreateUserSchema.parse({ ...newUser, phone });
    expect(result.phone).toBe("+639171234567");
  });

  it.each(["0917abc4567", "+639171234567", "0917-123-4567", "0917 123 4567", "0917123456", "12345678901"])("rejects invalid mobile input: %s", (phone) => {
    expect(CreateUserSchema.safeParse({ ...newUser, phone }).success).toBe(false);
  });

  it.each([undefined, null, ""])("allows an omitted mobile number: %s", (phone) => {
    expect(CreateUserSchema.safeParse({ ...newUser, phone }).success).toBe(true);
  });

  it.each(["Jan Aryan", "De la Cruz", "Peña", "José", "Jose\u0301"])("accepts letters and spaces in names: %s", (name) => {
    expect(CreateUserSchema.safeParse({ ...newUser, firstName: name, lastName: name }).success).toBe(true);
  });

  it.each(["Name123", "Name!", "Name-Name", "O'Name", "Name@", "   "])("rejects digits and special characters in names: %s", (name) => {
    expect(CreateUserSchema.safeParse({ ...newUser, firstName: name }).success).toBe(false);
    expect(CreateUserSchema.safeParse({ ...newUser, lastName: name }).success).toBe(false);
    expect(UpdateUserSchema.safeParse({ firstName: name }).success).toBe(false);
    expect(UpdateUserSchema.safeParse({ lastName: name }).success).toBe(false);
  });
});
