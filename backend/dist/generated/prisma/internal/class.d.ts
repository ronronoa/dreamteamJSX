import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
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
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.PrismaClientConstructorArgs<Options>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
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
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = Prisma.PrismaClientOptions['omit'], in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RefreshTokens
      * const refreshTokens = await prisma.refreshToken.findMany()
      * ```
      */
    get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.responseTeam`: Exposes CRUD operations for the **ResponseTeam** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ResponseTeams
      * const responseTeams = await prisma.responseTeam.findMany()
      * ```
      */
    get responseTeam(): Prisma.ResponseTeamDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.operationLog`: Exposes CRUD operations for the **OperationLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OperationLogs
      * const operationLogs = await prisma.operationLog.findMany()
      * ```
      */
    get operationLog(): Prisma.OperationLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.operationResponder`: Exposes CRUD operations for the **OperationResponder** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OperationResponders
      * const operationResponders = await prisma.operationResponder.findMany()
      * ```
      */
    get operationResponder(): Prisma.OperationResponderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.personsInvolved`: Exposes CRUD operations for the **PersonsInvolved** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PersonsInvolveds
      * const personsInvolveds = await prisma.personsInvolved.findMany()
      * ```
      */
    get personsInvolved(): Prisma.PersonsInvolvedDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Vehicles
      * const vehicles = await prisma.vehicle.findMany()
      * ```
      */
    get vehicle(): Prisma.VehicleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.inventoryItem`: Exposes CRUD operations for the **InventoryItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more InventoryItems
      * const inventoryItems = await prisma.inventoryItem.findMany()
      * ```
      */
    get inventoryItem(): Prisma.InventoryItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.inventoryTransaction`: Exposes CRUD operations for the **InventoryTransaction** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more InventoryTransactions
      * const inventoryTransactions = await prisma.inventoryTransaction.findMany()
      * ```
      */
    get inventoryTransaction(): Prisma.InventoryTransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.operationInventory`: Exposes CRUD operations for the **OperationInventory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OperationInventories
      * const operationInventories = await prisma.operationInventory.findMany()
      * ```
      */
    get operationInventory(): Prisma.OperationInventoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.operationLogEdit`: Exposes CRUD operations for the **OperationLogEdit** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OperationLogEdits
      * const operationLogEdits = await prisma.operationLogEdit.findMany()
      * ```
      */
    get operationLogEdit(): Prisma.OperationLogEditDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.operationLogArchive`: Exposes CRUD operations for the **OperationLogArchive** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OperationLogArchives
      * const operationLogArchives = await prisma.operationLogArchive.findMany()
      * ```
      */
    get operationLogArchive(): Prisma.OperationLogArchiveDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.inventoryArchive`: Exposes CRUD operations for the **InventoryArchive** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more InventoryArchives
      * const inventoryArchives = await prisma.inventoryArchive.findMany()
      * ```
      */
    get inventoryArchive(): Prisma.InventoryArchiveDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Patients
      * const patients = await prisma.patient.findMany()
      * ```
      */
    get patient(): Prisma.PatientDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.patientLog`: Exposes CRUD operations for the **PatientLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PatientLogs
      * const patientLogs = await prisma.patientLog.findMany()
      * ```
      */
    get patientLog(): Prisma.PatientLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.patientResponder`: Exposes CRUD operations for the **PatientResponder** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PatientResponders
      * const patientResponders = await prisma.patientResponder.findMany()
      * ```
      */
    get patientResponder(): Prisma.PatientResponderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.vehicularDispatch`: Exposes CRUD operations for the **VehicularDispatch** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more VehicularDispatches
      * const vehicularDispatches = await prisma.vehicularDispatch.findMany()
      * ```
      */
    get vehicularDispatch(): Prisma.VehicularDispatchDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.vehicularDispatchResponder`: Exposes CRUD operations for the **VehicularDispatchResponder** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more VehicularDispatchResponders
      * const vehicularDispatchResponders = await prisma.vehicularDispatchResponder.findMany()
      * ```
      */
    get vehicularDispatchResponder(): Prisma.VehicularDispatchResponderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.civilianPassenger`: Exposes CRUD operations for the **CivilianPassenger** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CivilianPassengers
      * const civilianPassengers = await prisma.civilianPassenger.findMany()
      * ```
      */
    get civilianPassenger(): Prisma.CivilianPassengerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.operationImageAttachment`: Exposes CRUD operations for the **OperationImageAttachment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OperationImageAttachments
      * const operationImageAttachments = await prisma.operationImageAttachment.findMany()
      * ```
      */
    get operationImageAttachment(): Prisma.OperationImageAttachmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.patientImageAttachment`: Exposes CRUD operations for the **PatientImageAttachment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PatientImageAttachments
      * const patientImageAttachments = await prisma.patientImageAttachment.findMany()
      * ```
      */
    get patientImageAttachment(): Prisma.PatientImageAttachmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map