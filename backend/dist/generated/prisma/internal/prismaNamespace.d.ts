import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.9.1
 * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * Resolved type of the argument passed to the `PrismaClient` constructor.
 *
 * When called without a narrower options type (the common case), this resolves
 * to `PrismaClientOptions` directly, which produces a clear TypeScript error
 * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
 * the argument is missing or incomplete. When the user supplies a narrower
 * options type (e.g. via a literal), it falls back to `Subset` to keep
 * filtering out unknown properties.
 */
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | ({
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O) : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: 'User';
    readonly RefreshToken: 'RefreshToken';
    readonly ResponseTeam: 'ResponseTeam';
    readonly OperationLog: 'OperationLog';
    readonly OperationResponder: 'OperationResponder';
    readonly PersonsInvolved: 'PersonsInvolved';
    readonly Vehicle: 'Vehicle';
    readonly InventoryItem: 'InventoryItem';
    readonly InventoryTransaction: 'InventoryTransaction';
    readonly OperationInventory: 'OperationInventory';
    readonly OperationLogEdit: 'OperationLogEdit';
    readonly OperationLogArchive: 'OperationLogArchive';
    readonly InventoryArchive: 'InventoryArchive';
    readonly Patient: 'Patient';
    readonly PatientLog: 'PatientLog';
    readonly PatientResponder: 'PatientResponder';
    readonly VehicularDispatch: 'VehicularDispatch';
    readonly VehicularDispatchResponder: 'VehicularDispatchResponder';
    readonly CivilianPassenger: 'CivilianPassenger';
    readonly OperationImageAttachment: 'OperationImageAttachment';
    readonly PatientImageAttachment: 'PatientImageAttachment';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "refreshToken" | "responseTeam" | "operationLog" | "operationResponder" | "personsInvolved" | "vehicle" | "inventoryItem" | "inventoryTransaction" | "operationInventory" | "operationLogEdit" | "operationLogArchive" | "inventoryArchive" | "patient" | "patientLog" | "patientResponder" | "vehicularDispatch" | "vehicularDispatchResponder" | "civilianPassenger" | "operationImageAttachment" | "patientImageAttachment";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        RefreshToken: {
            payload: Prisma.$RefreshTokenPayload<ExtArgs>;
            fields: Prisma.RefreshTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findFirst: {
                    args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findMany: {
                    args: Prisma.RefreshTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                create: {
                    args: Prisma.RefreshTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                createMany: {
                    args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                delete: {
                    args: Prisma.RefreshTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                update: {
                    args: Prisma.RefreshTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                upsert: {
                    args: Prisma.RefreshTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                aggregate: {
                    args: Prisma.RefreshTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRefreshToken>;
                };
                groupBy: {
                    args: Prisma.RefreshTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RefreshTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenCountAggregateOutputType> | number;
                };
            };
        };
        ResponseTeam: {
            payload: Prisma.$ResponseTeamPayload<ExtArgs>;
            fields: Prisma.ResponseTeamFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ResponseTeamFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResponseTeamPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ResponseTeamFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResponseTeamPayload>;
                };
                findFirst: {
                    args: Prisma.ResponseTeamFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResponseTeamPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ResponseTeamFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResponseTeamPayload>;
                };
                findMany: {
                    args: Prisma.ResponseTeamFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResponseTeamPayload>[];
                };
                create: {
                    args: Prisma.ResponseTeamCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResponseTeamPayload>;
                };
                createMany: {
                    args: Prisma.ResponseTeamCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ResponseTeamCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResponseTeamPayload>[];
                };
                delete: {
                    args: Prisma.ResponseTeamDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResponseTeamPayload>;
                };
                update: {
                    args: Prisma.ResponseTeamUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResponseTeamPayload>;
                };
                deleteMany: {
                    args: Prisma.ResponseTeamDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ResponseTeamUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ResponseTeamUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResponseTeamPayload>[];
                };
                upsert: {
                    args: Prisma.ResponseTeamUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResponseTeamPayload>;
                };
                aggregate: {
                    args: Prisma.ResponseTeamAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateResponseTeam>;
                };
                groupBy: {
                    args: Prisma.ResponseTeamGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResponseTeamGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ResponseTeamCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResponseTeamCountAggregateOutputType> | number;
                };
            };
        };
        OperationLog: {
            payload: Prisma.$OperationLogPayload<ExtArgs>;
            fields: Prisma.OperationLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OperationLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OperationLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogPayload>;
                };
                findFirst: {
                    args: Prisma.OperationLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OperationLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogPayload>;
                };
                findMany: {
                    args: Prisma.OperationLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogPayload>[];
                };
                create: {
                    args: Prisma.OperationLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogPayload>;
                };
                createMany: {
                    args: Prisma.OperationLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OperationLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogPayload>[];
                };
                delete: {
                    args: Prisma.OperationLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogPayload>;
                };
                update: {
                    args: Prisma.OperationLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogPayload>;
                };
                deleteMany: {
                    args: Prisma.OperationLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OperationLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OperationLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogPayload>[];
                };
                upsert: {
                    args: Prisma.OperationLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogPayload>;
                };
                aggregate: {
                    args: Prisma.OperationLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOperationLog>;
                };
                groupBy: {
                    args: Prisma.OperationLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OperationLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OperationLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OperationLogCountAggregateOutputType> | number;
                };
            };
        };
        OperationResponder: {
            payload: Prisma.$OperationResponderPayload<ExtArgs>;
            fields: Prisma.OperationResponderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OperationResponderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationResponderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OperationResponderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationResponderPayload>;
                };
                findFirst: {
                    args: Prisma.OperationResponderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationResponderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OperationResponderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationResponderPayload>;
                };
                findMany: {
                    args: Prisma.OperationResponderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationResponderPayload>[];
                };
                create: {
                    args: Prisma.OperationResponderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationResponderPayload>;
                };
                createMany: {
                    args: Prisma.OperationResponderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OperationResponderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationResponderPayload>[];
                };
                delete: {
                    args: Prisma.OperationResponderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationResponderPayload>;
                };
                update: {
                    args: Prisma.OperationResponderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationResponderPayload>;
                };
                deleteMany: {
                    args: Prisma.OperationResponderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OperationResponderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OperationResponderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationResponderPayload>[];
                };
                upsert: {
                    args: Prisma.OperationResponderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationResponderPayload>;
                };
                aggregate: {
                    args: Prisma.OperationResponderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOperationResponder>;
                };
                groupBy: {
                    args: Prisma.OperationResponderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OperationResponderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OperationResponderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OperationResponderCountAggregateOutputType> | number;
                };
            };
        };
        PersonsInvolved: {
            payload: Prisma.$PersonsInvolvedPayload<ExtArgs>;
            fields: Prisma.PersonsInvolvedFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PersonsInvolvedFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PersonsInvolvedPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PersonsInvolvedFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PersonsInvolvedPayload>;
                };
                findFirst: {
                    args: Prisma.PersonsInvolvedFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PersonsInvolvedPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PersonsInvolvedFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PersonsInvolvedPayload>;
                };
                findMany: {
                    args: Prisma.PersonsInvolvedFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PersonsInvolvedPayload>[];
                };
                create: {
                    args: Prisma.PersonsInvolvedCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PersonsInvolvedPayload>;
                };
                createMany: {
                    args: Prisma.PersonsInvolvedCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PersonsInvolvedCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PersonsInvolvedPayload>[];
                };
                delete: {
                    args: Prisma.PersonsInvolvedDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PersonsInvolvedPayload>;
                };
                update: {
                    args: Prisma.PersonsInvolvedUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PersonsInvolvedPayload>;
                };
                deleteMany: {
                    args: Prisma.PersonsInvolvedDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PersonsInvolvedUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PersonsInvolvedUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PersonsInvolvedPayload>[];
                };
                upsert: {
                    args: Prisma.PersonsInvolvedUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PersonsInvolvedPayload>;
                };
                aggregate: {
                    args: Prisma.PersonsInvolvedAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePersonsInvolved>;
                };
                groupBy: {
                    args: Prisma.PersonsInvolvedGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PersonsInvolvedGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PersonsInvolvedCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PersonsInvolvedCountAggregateOutputType> | number;
                };
            };
        };
        Vehicle: {
            payload: Prisma.$VehiclePayload<ExtArgs>;
            fields: Prisma.VehicleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VehicleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehiclePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehiclePayload>;
                };
                findFirst: {
                    args: Prisma.VehicleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehiclePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehiclePayload>;
                };
                findMany: {
                    args: Prisma.VehicleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehiclePayload>[];
                };
                create: {
                    args: Prisma.VehicleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehiclePayload>;
                };
                createMany: {
                    args: Prisma.VehicleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehiclePayload>[];
                };
                delete: {
                    args: Prisma.VehicleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehiclePayload>;
                };
                update: {
                    args: Prisma.VehicleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehiclePayload>;
                };
                deleteMany: {
                    args: Prisma.VehicleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VehicleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehiclePayload>[];
                };
                upsert: {
                    args: Prisma.VehicleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehiclePayload>;
                };
                aggregate: {
                    args: Prisma.VehicleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVehicle>;
                };
                groupBy: {
                    args: Prisma.VehicleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VehicleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VehicleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VehicleCountAggregateOutputType> | number;
                };
            };
        };
        InventoryItem: {
            payload: Prisma.$InventoryItemPayload<ExtArgs>;
            fields: Prisma.InventoryItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InventoryItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InventoryItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryItemPayload>;
                };
                findFirst: {
                    args: Prisma.InventoryItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InventoryItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryItemPayload>;
                };
                findMany: {
                    args: Prisma.InventoryItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryItemPayload>[];
                };
                create: {
                    args: Prisma.InventoryItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryItemPayload>;
                };
                createMany: {
                    args: Prisma.InventoryItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InventoryItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryItemPayload>[];
                };
                delete: {
                    args: Prisma.InventoryItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryItemPayload>;
                };
                update: {
                    args: Prisma.InventoryItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryItemPayload>;
                };
                deleteMany: {
                    args: Prisma.InventoryItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InventoryItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InventoryItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryItemPayload>[];
                };
                upsert: {
                    args: Prisma.InventoryItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryItemPayload>;
                };
                aggregate: {
                    args: Prisma.InventoryItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInventoryItem>;
                };
                groupBy: {
                    args: Prisma.InventoryItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InventoryItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryItemCountAggregateOutputType> | number;
                };
            };
        };
        InventoryTransaction: {
            payload: Prisma.$InventoryTransactionPayload<ExtArgs>;
            fields: Prisma.InventoryTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InventoryTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InventoryTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.InventoryTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InventoryTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryTransactionPayload>;
                };
                findMany: {
                    args: Prisma.InventoryTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryTransactionPayload>[];
                };
                create: {
                    args: Prisma.InventoryTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryTransactionPayload>;
                };
                createMany: {
                    args: Prisma.InventoryTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InventoryTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryTransactionPayload>[];
                };
                delete: {
                    args: Prisma.InventoryTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryTransactionPayload>;
                };
                update: {
                    args: Prisma.InventoryTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.InventoryTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InventoryTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InventoryTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.InventoryTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.InventoryTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInventoryTransaction>;
                };
                groupBy: {
                    args: Prisma.InventoryTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InventoryTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryTransactionCountAggregateOutputType> | number;
                };
            };
        };
        OperationInventory: {
            payload: Prisma.$OperationInventoryPayload<ExtArgs>;
            fields: Prisma.OperationInventoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OperationInventoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationInventoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OperationInventoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationInventoryPayload>;
                };
                findFirst: {
                    args: Prisma.OperationInventoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationInventoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OperationInventoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationInventoryPayload>;
                };
                findMany: {
                    args: Prisma.OperationInventoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationInventoryPayload>[];
                };
                create: {
                    args: Prisma.OperationInventoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationInventoryPayload>;
                };
                createMany: {
                    args: Prisma.OperationInventoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OperationInventoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationInventoryPayload>[];
                };
                delete: {
                    args: Prisma.OperationInventoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationInventoryPayload>;
                };
                update: {
                    args: Prisma.OperationInventoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationInventoryPayload>;
                };
                deleteMany: {
                    args: Prisma.OperationInventoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OperationInventoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OperationInventoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationInventoryPayload>[];
                };
                upsert: {
                    args: Prisma.OperationInventoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationInventoryPayload>;
                };
                aggregate: {
                    args: Prisma.OperationInventoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOperationInventory>;
                };
                groupBy: {
                    args: Prisma.OperationInventoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OperationInventoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OperationInventoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OperationInventoryCountAggregateOutputType> | number;
                };
            };
        };
        OperationLogEdit: {
            payload: Prisma.$OperationLogEditPayload<ExtArgs>;
            fields: Prisma.OperationLogEditFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OperationLogEditFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogEditPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OperationLogEditFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogEditPayload>;
                };
                findFirst: {
                    args: Prisma.OperationLogEditFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogEditPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OperationLogEditFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogEditPayload>;
                };
                findMany: {
                    args: Prisma.OperationLogEditFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogEditPayload>[];
                };
                create: {
                    args: Prisma.OperationLogEditCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogEditPayload>;
                };
                createMany: {
                    args: Prisma.OperationLogEditCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OperationLogEditCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogEditPayload>[];
                };
                delete: {
                    args: Prisma.OperationLogEditDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogEditPayload>;
                };
                update: {
                    args: Prisma.OperationLogEditUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogEditPayload>;
                };
                deleteMany: {
                    args: Prisma.OperationLogEditDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OperationLogEditUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OperationLogEditUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogEditPayload>[];
                };
                upsert: {
                    args: Prisma.OperationLogEditUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogEditPayload>;
                };
                aggregate: {
                    args: Prisma.OperationLogEditAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOperationLogEdit>;
                };
                groupBy: {
                    args: Prisma.OperationLogEditGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OperationLogEditGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OperationLogEditCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OperationLogEditCountAggregateOutputType> | number;
                };
            };
        };
        OperationLogArchive: {
            payload: Prisma.$OperationLogArchivePayload<ExtArgs>;
            fields: Prisma.OperationLogArchiveFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OperationLogArchiveFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogArchivePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OperationLogArchiveFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogArchivePayload>;
                };
                findFirst: {
                    args: Prisma.OperationLogArchiveFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogArchivePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OperationLogArchiveFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogArchivePayload>;
                };
                findMany: {
                    args: Prisma.OperationLogArchiveFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogArchivePayload>[];
                };
                create: {
                    args: Prisma.OperationLogArchiveCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogArchivePayload>;
                };
                createMany: {
                    args: Prisma.OperationLogArchiveCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OperationLogArchiveCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogArchivePayload>[];
                };
                delete: {
                    args: Prisma.OperationLogArchiveDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogArchivePayload>;
                };
                update: {
                    args: Prisma.OperationLogArchiveUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogArchivePayload>;
                };
                deleteMany: {
                    args: Prisma.OperationLogArchiveDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OperationLogArchiveUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OperationLogArchiveUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogArchivePayload>[];
                };
                upsert: {
                    args: Prisma.OperationLogArchiveUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationLogArchivePayload>;
                };
                aggregate: {
                    args: Prisma.OperationLogArchiveAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOperationLogArchive>;
                };
                groupBy: {
                    args: Prisma.OperationLogArchiveGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OperationLogArchiveGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OperationLogArchiveCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OperationLogArchiveCountAggregateOutputType> | number;
                };
            };
        };
        InventoryArchive: {
            payload: Prisma.$InventoryArchivePayload<ExtArgs>;
            fields: Prisma.InventoryArchiveFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InventoryArchiveFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryArchivePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InventoryArchiveFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryArchivePayload>;
                };
                findFirst: {
                    args: Prisma.InventoryArchiveFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryArchivePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InventoryArchiveFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryArchivePayload>;
                };
                findMany: {
                    args: Prisma.InventoryArchiveFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryArchivePayload>[];
                };
                create: {
                    args: Prisma.InventoryArchiveCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryArchivePayload>;
                };
                createMany: {
                    args: Prisma.InventoryArchiveCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InventoryArchiveCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryArchivePayload>[];
                };
                delete: {
                    args: Prisma.InventoryArchiveDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryArchivePayload>;
                };
                update: {
                    args: Prisma.InventoryArchiveUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryArchivePayload>;
                };
                deleteMany: {
                    args: Prisma.InventoryArchiveDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InventoryArchiveUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InventoryArchiveUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryArchivePayload>[];
                };
                upsert: {
                    args: Prisma.InventoryArchiveUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InventoryArchivePayload>;
                };
                aggregate: {
                    args: Prisma.InventoryArchiveAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInventoryArchive>;
                };
                groupBy: {
                    args: Prisma.InventoryArchiveGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryArchiveGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InventoryArchiveCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InventoryArchiveCountAggregateOutputType> | number;
                };
            };
        };
        Patient: {
            payload: Prisma.$PatientPayload<ExtArgs>;
            fields: Prisma.PatientFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PatientFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>;
                };
                findFirst: {
                    args: Prisma.PatientFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>;
                };
                findMany: {
                    args: Prisma.PatientFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>[];
                };
                create: {
                    args: Prisma.PatientCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>;
                };
                createMany: {
                    args: Prisma.PatientCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>[];
                };
                delete: {
                    args: Prisma.PatientDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>;
                };
                update: {
                    args: Prisma.PatientUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>;
                };
                deleteMany: {
                    args: Prisma.PatientDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PatientUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PatientUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>[];
                };
                upsert: {
                    args: Prisma.PatientUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>;
                };
                aggregate: {
                    args: Prisma.PatientAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePatient>;
                };
                groupBy: {
                    args: Prisma.PatientGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PatientCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientCountAggregateOutputType> | number;
                };
            };
        };
        PatientLog: {
            payload: Prisma.$PatientLogPayload<ExtArgs>;
            fields: Prisma.PatientLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PatientLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PatientLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientLogPayload>;
                };
                findFirst: {
                    args: Prisma.PatientLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PatientLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientLogPayload>;
                };
                findMany: {
                    args: Prisma.PatientLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientLogPayload>[];
                };
                create: {
                    args: Prisma.PatientLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientLogPayload>;
                };
                createMany: {
                    args: Prisma.PatientLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PatientLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientLogPayload>[];
                };
                delete: {
                    args: Prisma.PatientLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientLogPayload>;
                };
                update: {
                    args: Prisma.PatientLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientLogPayload>;
                };
                deleteMany: {
                    args: Prisma.PatientLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PatientLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PatientLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientLogPayload>[];
                };
                upsert: {
                    args: Prisma.PatientLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientLogPayload>;
                };
                aggregate: {
                    args: Prisma.PatientLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePatientLog>;
                };
                groupBy: {
                    args: Prisma.PatientLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PatientLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientLogCountAggregateOutputType> | number;
                };
            };
        };
        PatientResponder: {
            payload: Prisma.$PatientResponderPayload<ExtArgs>;
            fields: Prisma.PatientResponderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PatientResponderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientResponderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PatientResponderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientResponderPayload>;
                };
                findFirst: {
                    args: Prisma.PatientResponderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientResponderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PatientResponderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientResponderPayload>;
                };
                findMany: {
                    args: Prisma.PatientResponderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientResponderPayload>[];
                };
                create: {
                    args: Prisma.PatientResponderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientResponderPayload>;
                };
                createMany: {
                    args: Prisma.PatientResponderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PatientResponderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientResponderPayload>[];
                };
                delete: {
                    args: Prisma.PatientResponderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientResponderPayload>;
                };
                update: {
                    args: Prisma.PatientResponderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientResponderPayload>;
                };
                deleteMany: {
                    args: Prisma.PatientResponderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PatientResponderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PatientResponderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientResponderPayload>[];
                };
                upsert: {
                    args: Prisma.PatientResponderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientResponderPayload>;
                };
                aggregate: {
                    args: Prisma.PatientResponderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePatientResponder>;
                };
                groupBy: {
                    args: Prisma.PatientResponderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientResponderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PatientResponderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientResponderCountAggregateOutputType> | number;
                };
            };
        };
        VehicularDispatch: {
            payload: Prisma.$VehicularDispatchPayload<ExtArgs>;
            fields: Prisma.VehicularDispatchFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VehicularDispatchFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VehicularDispatchFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchPayload>;
                };
                findFirst: {
                    args: Prisma.VehicularDispatchFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VehicularDispatchFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchPayload>;
                };
                findMany: {
                    args: Prisma.VehicularDispatchFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchPayload>[];
                };
                create: {
                    args: Prisma.VehicularDispatchCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchPayload>;
                };
                createMany: {
                    args: Prisma.VehicularDispatchCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VehicularDispatchCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchPayload>[];
                };
                delete: {
                    args: Prisma.VehicularDispatchDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchPayload>;
                };
                update: {
                    args: Prisma.VehicularDispatchUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchPayload>;
                };
                deleteMany: {
                    args: Prisma.VehicularDispatchDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VehicularDispatchUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VehicularDispatchUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchPayload>[];
                };
                upsert: {
                    args: Prisma.VehicularDispatchUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchPayload>;
                };
                aggregate: {
                    args: Prisma.VehicularDispatchAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVehicularDispatch>;
                };
                groupBy: {
                    args: Prisma.VehicularDispatchGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VehicularDispatchGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VehicularDispatchCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VehicularDispatchCountAggregateOutputType> | number;
                };
            };
        };
        VehicularDispatchResponder: {
            payload: Prisma.$VehicularDispatchResponderPayload<ExtArgs>;
            fields: Prisma.VehicularDispatchResponderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VehicularDispatchResponderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchResponderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VehicularDispatchResponderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchResponderPayload>;
                };
                findFirst: {
                    args: Prisma.VehicularDispatchResponderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchResponderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VehicularDispatchResponderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchResponderPayload>;
                };
                findMany: {
                    args: Prisma.VehicularDispatchResponderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchResponderPayload>[];
                };
                create: {
                    args: Prisma.VehicularDispatchResponderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchResponderPayload>;
                };
                createMany: {
                    args: Prisma.VehicularDispatchResponderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VehicularDispatchResponderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchResponderPayload>[];
                };
                delete: {
                    args: Prisma.VehicularDispatchResponderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchResponderPayload>;
                };
                update: {
                    args: Prisma.VehicularDispatchResponderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchResponderPayload>;
                };
                deleteMany: {
                    args: Prisma.VehicularDispatchResponderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VehicularDispatchResponderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VehicularDispatchResponderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchResponderPayload>[];
                };
                upsert: {
                    args: Prisma.VehicularDispatchResponderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VehicularDispatchResponderPayload>;
                };
                aggregate: {
                    args: Prisma.VehicularDispatchResponderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVehicularDispatchResponder>;
                };
                groupBy: {
                    args: Prisma.VehicularDispatchResponderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VehicularDispatchResponderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VehicularDispatchResponderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VehicularDispatchResponderCountAggregateOutputType> | number;
                };
            };
        };
        CivilianPassenger: {
            payload: Prisma.$CivilianPassengerPayload<ExtArgs>;
            fields: Prisma.CivilianPassengerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CivilianPassengerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CivilianPassengerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CivilianPassengerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CivilianPassengerPayload>;
                };
                findFirst: {
                    args: Prisma.CivilianPassengerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CivilianPassengerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CivilianPassengerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CivilianPassengerPayload>;
                };
                findMany: {
                    args: Prisma.CivilianPassengerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CivilianPassengerPayload>[];
                };
                create: {
                    args: Prisma.CivilianPassengerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CivilianPassengerPayload>;
                };
                createMany: {
                    args: Prisma.CivilianPassengerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CivilianPassengerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CivilianPassengerPayload>[];
                };
                delete: {
                    args: Prisma.CivilianPassengerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CivilianPassengerPayload>;
                };
                update: {
                    args: Prisma.CivilianPassengerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CivilianPassengerPayload>;
                };
                deleteMany: {
                    args: Prisma.CivilianPassengerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CivilianPassengerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CivilianPassengerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CivilianPassengerPayload>[];
                };
                upsert: {
                    args: Prisma.CivilianPassengerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CivilianPassengerPayload>;
                };
                aggregate: {
                    args: Prisma.CivilianPassengerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCivilianPassenger>;
                };
                groupBy: {
                    args: Prisma.CivilianPassengerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CivilianPassengerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CivilianPassengerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CivilianPassengerCountAggregateOutputType> | number;
                };
            };
        };
        OperationImageAttachment: {
            payload: Prisma.$OperationImageAttachmentPayload<ExtArgs>;
            fields: Prisma.OperationImageAttachmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OperationImageAttachmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationImageAttachmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OperationImageAttachmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationImageAttachmentPayload>;
                };
                findFirst: {
                    args: Prisma.OperationImageAttachmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationImageAttachmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OperationImageAttachmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationImageAttachmentPayload>;
                };
                findMany: {
                    args: Prisma.OperationImageAttachmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationImageAttachmentPayload>[];
                };
                create: {
                    args: Prisma.OperationImageAttachmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationImageAttachmentPayload>;
                };
                createMany: {
                    args: Prisma.OperationImageAttachmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OperationImageAttachmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationImageAttachmentPayload>[];
                };
                delete: {
                    args: Prisma.OperationImageAttachmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationImageAttachmentPayload>;
                };
                update: {
                    args: Prisma.OperationImageAttachmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationImageAttachmentPayload>;
                };
                deleteMany: {
                    args: Prisma.OperationImageAttachmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OperationImageAttachmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OperationImageAttachmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationImageAttachmentPayload>[];
                };
                upsert: {
                    args: Prisma.OperationImageAttachmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OperationImageAttachmentPayload>;
                };
                aggregate: {
                    args: Prisma.OperationImageAttachmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOperationImageAttachment>;
                };
                groupBy: {
                    args: Prisma.OperationImageAttachmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OperationImageAttachmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OperationImageAttachmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OperationImageAttachmentCountAggregateOutputType> | number;
                };
            };
        };
        PatientImageAttachment: {
            payload: Prisma.$PatientImageAttachmentPayload<ExtArgs>;
            fields: Prisma.PatientImageAttachmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PatientImageAttachmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientImageAttachmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PatientImageAttachmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientImageAttachmentPayload>;
                };
                findFirst: {
                    args: Prisma.PatientImageAttachmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientImageAttachmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PatientImageAttachmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientImageAttachmentPayload>;
                };
                findMany: {
                    args: Prisma.PatientImageAttachmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientImageAttachmentPayload>[];
                };
                create: {
                    args: Prisma.PatientImageAttachmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientImageAttachmentPayload>;
                };
                createMany: {
                    args: Prisma.PatientImageAttachmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PatientImageAttachmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientImageAttachmentPayload>[];
                };
                delete: {
                    args: Prisma.PatientImageAttachmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientImageAttachmentPayload>;
                };
                update: {
                    args: Prisma.PatientImageAttachmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientImageAttachmentPayload>;
                };
                deleteMany: {
                    args: Prisma.PatientImageAttachmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PatientImageAttachmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PatientImageAttachmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientImageAttachmentPayload>[];
                };
                upsert: {
                    args: Prisma.PatientImageAttachmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientImageAttachmentPayload>;
                };
                aggregate: {
                    args: Prisma.PatientImageAttachmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePatientImageAttachment>;
                };
                groupBy: {
                    args: Prisma.PatientImageAttachmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientImageAttachmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PatientImageAttachmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientImageAttachmentCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly user_id: 'user_id';
    readonly name: 'name';
    readonly username: 'username';
    readonly passwordHash: 'passwordHash';
    readonly pinHash: 'pinHash';
    readonly pinFailedAttempts: 'pinFailedAttempts';
    readonly pinLockedUntil: 'pinLockedUntil';
    readonly role: 'role';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: 'id';
    readonly tokenHash: 'tokenHash';
    readonly userId: 'userId';
    readonly expiresAt: 'expiresAt';
    readonly createdAt: 'createdAt';
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const ResponseTeamScalarFieldEnum: {
    readonly team_id: 'team_id';
    readonly team_name: 'team_name';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ResponseTeamScalarFieldEnum = (typeof ResponseTeamScalarFieldEnum)[keyof typeof ResponseTeamScalarFieldEnum];
export declare const OperationLogScalarFieldEnum: {
    readonly operation_id: 'operation_id';
    readonly team_id: 'team_id';
    readonly operation_date: 'operation_date';
    readonly name_of_caller: 'name_of_caller';
    readonly nature_of_operation: 'nature_of_operation';
    readonly event_description: 'event_description';
    readonly submitted_by: 'submitted_by';
    readonly validated_by: 'validated_by';
    readonly status: 'status';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type OperationLogScalarFieldEnum = (typeof OperationLogScalarFieldEnum)[keyof typeof OperationLogScalarFieldEnum];
export declare const OperationResponderScalarFieldEnum: {
    readonly operation_id: 'operation_id';
    readonly user_id: 'user_id';
};
export type OperationResponderScalarFieldEnum = (typeof OperationResponderScalarFieldEnum)[keyof typeof OperationResponderScalarFieldEnum];
export declare const PersonsInvolvedScalarFieldEnum: {
    readonly person_id: 'person_id';
    readonly operation_id: 'operation_id';
    readonly full_name: 'full_name';
    readonly age: 'age';
    readonly sex: 'sex';
    readonly contact_no: 'contact_no';
    readonly address: 'address';
};
export type PersonsInvolvedScalarFieldEnum = (typeof PersonsInvolvedScalarFieldEnum)[keyof typeof PersonsInvolvedScalarFieldEnum];
export declare const VehicleScalarFieldEnum: {
    readonly vehicle_id: 'vehicle_id';
    readonly vehicle_name: 'vehicle_name';
    readonly plate_number: 'plate_number';
    readonly status: 'status';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum];
export declare const InventoryItemScalarFieldEnum: {
    readonly item_id: 'item_id';
    readonly item_name: 'item_name';
    readonly category: 'category';
    readonly unit: 'unit';
    readonly stock_quantity: 'stock_quantity';
    readonly stock_type: 'stock_type';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type InventoryItemScalarFieldEnum = (typeof InventoryItemScalarFieldEnum)[keyof typeof InventoryItemScalarFieldEnum];
export declare const InventoryTransactionScalarFieldEnum: {
    readonly transaction_id: 'transaction_id';
    readonly item_id: 'item_id';
    readonly user_id: 'user_id';
    readonly transaction_type: 'transaction_type';
    readonly quantity: 'quantity';
    readonly transaction_date: 'transaction_date';
};
export type InventoryTransactionScalarFieldEnum = (typeof InventoryTransactionScalarFieldEnum)[keyof typeof InventoryTransactionScalarFieldEnum];
export declare const OperationInventoryScalarFieldEnum: {
    readonly operation_id: 'operation_id';
    readonly item_id: 'item_id';
    readonly quantity: 'quantity';
};
export type OperationInventoryScalarFieldEnum = (typeof OperationInventoryScalarFieldEnum)[keyof typeof OperationInventoryScalarFieldEnum];
export declare const OperationLogEditScalarFieldEnum: {
    readonly edit_id: 'edit_id';
    readonly operation_id: 'operation_id';
    readonly admin_id: 'admin_id';
    readonly edit_notes: 'edit_notes';
    readonly editedAt: 'editedAt';
};
export type OperationLogEditScalarFieldEnum = (typeof OperationLogEditScalarFieldEnum)[keyof typeof OperationLogEditScalarFieldEnum];
export declare const OperationLogArchiveScalarFieldEnum: {
    readonly archive_id: 'archive_id';
    readonly operation_id: 'operation_id';
    readonly archived_by: 'archived_by';
    readonly archivedAt: 'archivedAt';
};
export type OperationLogArchiveScalarFieldEnum = (typeof OperationLogArchiveScalarFieldEnum)[keyof typeof OperationLogArchiveScalarFieldEnum];
export declare const InventoryArchiveScalarFieldEnum: {
    readonly archive_id: 'archive_id';
    readonly item_id: 'item_id';
    readonly archived_by: 'archived_by';
    readonly archivedAt: 'archivedAt';
};
export type InventoryArchiveScalarFieldEnum = (typeof InventoryArchiveScalarFieldEnum)[keyof typeof InventoryArchiveScalarFieldEnum];
export declare const PatientScalarFieldEnum: {
    readonly patient_id: 'patient_id';
    readonly full_name: 'full_name';
    readonly birthday: 'birthday';
    readonly sex: 'sex';
    readonly contact_person: 'contact_person';
    readonly contact_number: 'contact_number';
    readonly phase: 'phase';
    readonly package: 'package';
    readonly block: 'block';
    readonly lot: 'lot';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum];
export declare const PatientLogScalarFieldEnum: {
    readonly patient_log_id: 'patient_log_id';
    readonly patient_id: 'patient_id';
    readonly log_date: 'log_date';
    readonly type_of_request: 'type_of_request';
    readonly submitted_by: 'submitted_by';
    readonly name_of_caller: 'name_of_caller';
    readonly bp: 'bp';
    readonly pr: 'pr';
    readonly spo2: 'spo2';
    readonly temp: 'temp';
    readonly medical_assessment: 'medical_assessment';
    readonly hospital_name: 'hospital_name';
    readonly hospital_representative: 'hospital_representative';
    readonly hospital_in_time: 'hospital_in_time';
    readonly hospital_out_time: 'hospital_out_time';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type PatientLogScalarFieldEnum = (typeof PatientLogScalarFieldEnum)[keyof typeof PatientLogScalarFieldEnum];
export declare const PatientResponderScalarFieldEnum: {
    readonly patient_log_id: 'patient_log_id';
    readonly user_id: 'user_id';
};
export type PatientResponderScalarFieldEnum = (typeof PatientResponderScalarFieldEnum)[keyof typeof PatientResponderScalarFieldEnum];
export declare const VehicularDispatchScalarFieldEnum: {
    readonly dispatch_id: 'dispatch_id';
    readonly operation_id: 'operation_id';
    readonly patient_log_id: 'patient_log_id';
    readonly dispatch_date: 'dispatch_date';
    readonly submitted_by: 'submitted_by';
    readonly vehicle_id: 'vehicle_id';
    readonly driver_id: 'driver_id';
    readonly depart_time: 'depart_time';
    readonly arrival_time: 'arrival_time';
    readonly brgy_in_time: 'brgy_in_time';
    readonly brgy_out_time: 'brgy_out_time';
    readonly dispatch_type: 'dispatch_type';
    readonly from_location: 'from_location';
    readonly to_location: 'to_location';
    readonly odometer_in: 'odometer_in';
    readonly odometer_out: 'odometer_out';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type VehicularDispatchScalarFieldEnum = (typeof VehicularDispatchScalarFieldEnum)[keyof typeof VehicularDispatchScalarFieldEnum];
export declare const VehicularDispatchResponderScalarFieldEnum: {
    readonly dispatch_id: 'dispatch_id';
    readonly user_id: 'user_id';
};
export type VehicularDispatchResponderScalarFieldEnum = (typeof VehicularDispatchResponderScalarFieldEnum)[keyof typeof VehicularDispatchResponderScalarFieldEnum];
export declare const CivilianPassengerScalarFieldEnum: {
    readonly passenger_id: 'passenger_id';
    readonly dispatch_id: 'dispatch_id';
    readonly full_name: 'full_name';
    readonly age: 'age';
    readonly sex: 'sex';
    readonly contact_no: 'contact_no';
    readonly barangay: 'barangay';
    readonly address: 'address';
};
export type CivilianPassengerScalarFieldEnum = (typeof CivilianPassengerScalarFieldEnum)[keyof typeof CivilianPassengerScalarFieldEnum];
export declare const OperationImageAttachmentScalarFieldEnum: {
    readonly attachment_id: 'attachment_id';
    readonly operation_id: 'operation_id';
    readonly image_url: 'image_url';
    readonly file_type: 'file_type';
    readonly uploaded_by: 'uploaded_by';
    readonly uploadedAt: 'uploadedAt';
};
export type OperationImageAttachmentScalarFieldEnum = (typeof OperationImageAttachmentScalarFieldEnum)[keyof typeof OperationImageAttachmentScalarFieldEnum];
export declare const PatientImageAttachmentScalarFieldEnum: {
    readonly attachment_id: 'attachment_id';
    readonly patient_id: 'patient_id';
    readonly image_url: 'image_url';
    readonly file_type: 'file_type';
    readonly uploaded_by: 'uploaded_by';
    readonly uploadedAt: 'uploadedAt';
};
export type PatientImageAttachmentScalarFieldEnum = (typeof PatientImageAttachmentScalarFieldEnum)[keyof typeof PatientImageAttachmentScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Role'
 */
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
/**
 * Reference to a field of type 'Role[]'
 */
export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>;
/**
 * Reference to a field of type 'OperationStatus'
 */
export type EnumOperationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OperationStatus'>;
/**
 * Reference to a field of type 'OperationStatus[]'
 */
export type ListEnumOperationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OperationStatus[]'>;
/**
 * Reference to a field of type 'Gender'
 */
export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>;
/**
 * Reference to a field of type 'Gender[]'
 */
export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>;
/**
 * Reference to a field of type 'VehicleStatus'
 */
export type EnumVehicleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleStatus'>;
/**
 * Reference to a field of type 'VehicleStatus[]'
 */
export type ListEnumVehicleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleStatus[]'>;
/**
 * Reference to a field of type 'InventoryTransactionType'
 */
export type EnumInventoryTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InventoryTransactionType'>;
/**
 * Reference to a field of type 'InventoryTransactionType[]'
 */
export type ListEnumInventoryTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InventoryTransactionType[]'>;
/**
 * Reference to a field of type 'PatientRequestType'
 */
export type EnumPatientRequestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PatientRequestType'>;
/**
 * Reference to a field of type 'PatientRequestType[]'
 */
export type ListEnumPatientRequestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PatientRequestType[]'>;
/**
 * Reference to a field of type 'DispatchType'
 */
export type EnumDispatchTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DispatchType'>;
/**
 * Reference to a field of type 'DispatchType[]'
 */
export type ListEnumDispatchTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DispatchType[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
/**
 * Options common to all variants of `PrismaClientOptions`, regardless of whether you connect to your database through a driver adapter or through Prisma Accelerate.
 */
export interface PrismaClientBaseOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
    /**
     * Optional maximum size for the query plan cache. If not provided, a default size will be used.
     * A value of `0` can be used to disable the cache entirely. A higher cache size can improve
     * performance for applications that execute a large number of unique queries, while a smaller
     * cache size can reduce memory usage.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   queryPlanCacheMaxSize: 100,
     * })
     * ```
     */
    queryPlanCacheMaxSize?: number;
}
/**
 * `PrismaClient` options for connecting to your database through Prisma Accelerate instead of a driver adapter.
 *
 * Learn more: https://pris.ly/d/accelerate
 */
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     *
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl: string;
    adapter?: never;
}
/**
 * `PrismaClient` options for connecting to your database through a driver adapter. This is the common case in Prisma 7.
 *
 * Learn more: https://pris.ly/d/driver-adapters
 */
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     *
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     *
     * Learn more: https://pris.ly/d/driver-adapters
     *
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     *
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
/**
 * Options passed to the `PrismaClient` constructor.
 *
 * A driver adapter (or, alternatively, a Prisma Accelerate URL) is **required**. See {@link PrismaClientOptionsWithAdapter} and {@link PrismaClientOptionsWithAccelerateUrl} for the two variants. All other properties live in {@link PrismaClientBaseOptions} and are optional.
 *
 * Learn more about driver adapters: https://pris.ly/d/driver-adapters
 */
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    refreshToken?: Prisma.RefreshTokenOmit;
    responseTeam?: Prisma.ResponseTeamOmit;
    operationLog?: Prisma.OperationLogOmit;
    operationResponder?: Prisma.OperationResponderOmit;
    personsInvolved?: Prisma.PersonsInvolvedOmit;
    vehicle?: Prisma.VehicleOmit;
    inventoryItem?: Prisma.InventoryItemOmit;
    inventoryTransaction?: Prisma.InventoryTransactionOmit;
    operationInventory?: Prisma.OperationInventoryOmit;
    operationLogEdit?: Prisma.OperationLogEditOmit;
    operationLogArchive?: Prisma.OperationLogArchiveOmit;
    inventoryArchive?: Prisma.InventoryArchiveOmit;
    patient?: Prisma.PatientOmit;
    patientLog?: Prisma.PatientLogOmit;
    patientResponder?: Prisma.PatientResponderOmit;
    vehicularDispatch?: Prisma.VehicularDispatchOmit;
    vehicularDispatchResponder?: Prisma.VehicularDispatchResponderOmit;
    civilianPassenger?: Prisma.CivilianPassengerOmit;
    operationImageAttachment?: Prisma.OperationImageAttachmentOmit;
    patientImageAttachment?: Prisma.PatientImageAttachmentOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map