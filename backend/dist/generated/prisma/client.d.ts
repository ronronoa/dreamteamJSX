import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model RefreshToken
 *
 */
export type RefreshToken = Prisma.RefreshTokenModel;
/**
 * Model ResponseTeam
 *
 */
export type ResponseTeam = Prisma.ResponseTeamModel;
/**
 * Model OperationLog
 *
 */
export type OperationLog = Prisma.OperationLogModel;
/**
 * Model OperationResponder
 *
 */
export type OperationResponder = Prisma.OperationResponderModel;
/**
 * Model PersonsInvolved
 *
 */
export type PersonsInvolved = Prisma.PersonsInvolvedModel;
/**
 * Model Vehicle
 *
 */
export type Vehicle = Prisma.VehicleModel;
/**
 * Model InventoryItem
 *
 */
export type InventoryItem = Prisma.InventoryItemModel;
/**
 * Model InventoryTransaction
 *
 */
export type InventoryTransaction = Prisma.InventoryTransactionModel;
/**
 * Model OperationInventory
 *
 */
export type OperationInventory = Prisma.OperationInventoryModel;
/**
 * Model OperationLogEdit
 *
 */
export type OperationLogEdit = Prisma.OperationLogEditModel;
/**
 * Model OperationLogArchive
 *
 */
export type OperationLogArchive = Prisma.OperationLogArchiveModel;
/**
 * Model InventoryArchive
 *
 */
export type InventoryArchive = Prisma.InventoryArchiveModel;
/**
 * Model Patient
 *
 */
export type Patient = Prisma.PatientModel;
/**
 * Model PatientLog
 *
 */
export type PatientLog = Prisma.PatientLogModel;
/**
 * Model PatientResponder
 *
 */
export type PatientResponder = Prisma.PatientResponderModel;
/**
 * Model VehicularDispatch
 *
 */
export type VehicularDispatch = Prisma.VehicularDispatchModel;
/**
 * Model VehicularDispatchResponder
 *
 */
export type VehicularDispatchResponder = Prisma.VehicularDispatchResponderModel;
/**
 * Model CivilianPassenger
 *
 */
export type CivilianPassenger = Prisma.CivilianPassengerModel;
/**
 * Model OperationImageAttachment
 *
 */
export type OperationImageAttachment = Prisma.OperationImageAttachmentModel;
/**
 * Model PatientImageAttachment
 *
 */
export type PatientImageAttachment = Prisma.PatientImageAttachmentModel;
//# sourceMappingURL=client.d.ts.map