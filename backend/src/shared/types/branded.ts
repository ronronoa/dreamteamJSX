declare const UserIdBrand: unique symbol;
export type UserId = string & { readonly [UserIdBrand]: true };

declare const EmailBrand: unique symbol;
export type Email = string & { readonly [EmailBrand]: true };

declare const TokenHashBrand: unique symbol;
export type TokenHash = string & { readonly [TokenHashBrand]: true };

export function validateUserId(input: string): UserId {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(input)) {
    throw new Error("Invalid user ID: must be a valid UUID");
  }
  return input as UserId;
}

export function validateEmail(input: string): Email {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input)) {
    throw new Error("Invalid email format");
  }
  return input as Email;
}

export function toTokenHash(input: string): TokenHash {
  return input as TokenHash;
}