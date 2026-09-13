declare const UserIdBrand: unique symbol;
export type UserId = string & {
    readonly [UserIdBrand]: true;
};
declare const EmailBrand: unique symbol;
export type Email = string & {
    readonly [EmailBrand]: true;
};
declare const TokenHashBrand: unique symbol;
export type TokenHash = string & {
    readonly [TokenHashBrand]: true;
};
export declare function validateUserId(input: string): UserId;
export declare function validateEmail(input: string): Email;
export declare function toTokenHash(input: string): TokenHash;
export {};
//# sourceMappingURL=branded.d.ts.map