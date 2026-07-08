
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Address
 * 
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model Item
 * 
 */
export type Item = $Result.DefaultSelection<Prisma.$ItemPayload>
/**
 * Model StockReservation
 * 
 */
export type StockReservation = $Result.DefaultSelection<Prisma.$StockReservationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OrderStatus: {
  CREADO: 'CREADO',
  PROCESANDO: 'PROCESANDO',
  CONFIRMADO: 'CONFIRMADO',
  PAGADO: 'PAGADO',
  ENVIADO: 'ENVIADO',
  ENTREGADO: 'ENTREGADO',
  CANCELADO: 'CANCELADO',
  ERROR: 'ERROR'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const OrderPriority: {
  BAJA: 'BAJA',
  MEDIA: 'MEDIA',
  ALTA: 'ALTA',
  URGENTE: 'URGENTE'
};

export type OrderPriority = (typeof OrderPriority)[keyof typeof OrderPriority]


export const OrderChannel: {
  WEB: 'WEB',
  MOBILE: 'MOBILE',
  CALLCENTER: 'CALLCENTER'
};

export type OrderChannel = (typeof OrderChannel)[keyof typeof OrderChannel]

}

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type OrderPriority = $Enums.OrderPriority

export const OrderPriority: typeof $Enums.OrderPriority

export type OrderChannel = $Enums.OrderChannel

export const OrderChannel: typeof $Enums.OrderChannel

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Clients
 * const clients = await prisma.client.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Clients
   * const clients = await prisma.client.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): Prisma.AddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.item`: Exposes CRUD operations for the **Item** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Items
    * const items = await prisma.item.findMany()
    * ```
    */
  get item(): Prisma.ItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stockReservation`: Exposes CRUD operations for the **StockReservation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockReservations
    * const stockReservations = await prisma.stockReservation.findMany()
    * ```
    */
  get stockReservation(): Prisma.StockReservationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
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

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Client: 'Client',
    Address: 'Address',
    Order: 'Order',
    Item: 'Item',
    StockReservation: 'StockReservation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "client" | "address" | "order" | "item" | "stockReservation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Address: {
        payload: Prisma.$AddressPayload<ExtArgs>
        fields: Prisma.AddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findFirst: {
            args: Prisma.AddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findMany: {
            args: Prisma.AddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          create: {
            args: Prisma.AddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          createMany: {
            args: Prisma.AddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AddressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          delete: {
            args: Prisma.AddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          update: {
            args: Prisma.AddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          deleteMany: {
            args: Prisma.AddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AddressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          upsert: {
            args: Prisma.AddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          aggregate: {
            args: Prisma.AddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddress>
          }
          groupBy: {
            args: Prisma.AddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressCountArgs<ExtArgs>
            result: $Utils.Optional<AddressCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      Item: {
        payload: Prisma.$ItemPayload<ExtArgs>
        fields: Prisma.ItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findFirst: {
            args: Prisma.ItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findMany: {
            args: Prisma.ItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          create: {
            args: Prisma.ItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          createMany: {
            args: Prisma.ItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          delete: {
            args: Prisma.ItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          update: {
            args: Prisma.ItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          deleteMany: {
            args: Prisma.ItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          upsert: {
            args: Prisma.ItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          aggregate: {
            args: Prisma.ItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem>
          }
          groupBy: {
            args: Prisma.ItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemCountArgs<ExtArgs>
            result: $Utils.Optional<ItemCountAggregateOutputType> | number
          }
        }
      }
      StockReservation: {
        payload: Prisma.$StockReservationPayload<ExtArgs>
        fields: Prisma.StockReservationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockReservationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockReservationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>
          }
          findFirst: {
            args: Prisma.StockReservationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockReservationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>
          }
          findMany: {
            args: Prisma.StockReservationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>[]
          }
          create: {
            args: Prisma.StockReservationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>
          }
          createMany: {
            args: Prisma.StockReservationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockReservationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>[]
          }
          delete: {
            args: Prisma.StockReservationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>
          }
          update: {
            args: Prisma.StockReservationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>
          }
          deleteMany: {
            args: Prisma.StockReservationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockReservationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockReservationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>[]
          }
          upsert: {
            args: Prisma.StockReservationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockReservationPayload>
          }
          aggregate: {
            args: Prisma.StockReservationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockReservation>
          }
          groupBy: {
            args: Prisma.StockReservationGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockReservationGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockReservationCountArgs<ExtArgs>
            result: $Utils.Optional<StockReservationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
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
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    omit?: Prisma.GlobalOmitConfig
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
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    client?: ClientOmit
    address?: AddressOmit
    order?: OrderOmit
    item?: ItemOmit
    stockReservation?: StockReservationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    orders: number
    addresses: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | ClientCountOutputTypeCountOrdersArgs
    addresses?: boolean | ClientCountOutputTypeCountAddressesArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }


  /**
   * Count Type AddressCountOutputType
   */

  export type AddressCountOutputType = {
    ordenes: number
  }

  export type AddressCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ordenes?: boolean | AddressCountOutputTypeCountOrdenesArgs
  }

  // Custom InputTypes
  /**
   * AddressCountOutputType without action
   */
  export type AddressCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressCountOutputType
     */
    select?: AddressCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AddressCountOutputType without action
   */
  export type AddressCountOutputTypeCountOrdenesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
    stockReservations: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
    stockReservations?: boolean | OrderCountOutputTypeCountStockReservationsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountStockReservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockReservationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    email: string | null
    telefono: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    email: string | null
    telefono: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    nombre: number
    email: number
    telefono: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    telefono?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    telefono?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    telefono?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    nombre: string
    email: string
    telefono: string | null
    createdAt: Date
    updatedAt: Date
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    orders?: boolean | Client$ordersArgs<ExtArgs>
    addresses?: boolean | Client$addressesArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "email" | "telefono" | "createdAt" | "updatedAt", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | Client$ordersArgs<ExtArgs>
    addresses?: boolean | Client$addressesArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[]
      addresses: Prisma.$AddressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      email: string
      telefono: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orders<T extends Client$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Client$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    addresses<T extends Client$addressesArgs<ExtArgs> = {}>(args?: Subset<T, Client$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly nombre: FieldRef<"Client", 'String'>
    readonly email: FieldRef<"Client", 'String'>
    readonly telefono: FieldRef<"Client", 'String'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly updatedAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.orders
   */
  export type Client$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Client.addresses
   */
  export type Client$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model Address
   */

  export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  export type AddressMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    calle: string | null
    numero: string | null
    ciudad: string | null
    region: string | null
    codigoPostal: string | null
    pais: string | null
    notasAdicionales: string | null
    esDirectionPrincipal: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AddressMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    calle: string | null
    numero: string | null
    ciudad: string | null
    region: string | null
    codigoPostal: string | null
    pais: string | null
    notasAdicionales: string | null
    esDirectionPrincipal: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AddressCountAggregateOutputType = {
    id: number
    clientId: number
    calle: number
    numero: number
    ciudad: number
    region: number
    codigoPostal: number
    pais: number
    notasAdicionales: number
    esDirectionPrincipal: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AddressMinAggregateInputType = {
    id?: true
    clientId?: true
    calle?: true
    numero?: true
    ciudad?: true
    region?: true
    codigoPostal?: true
    pais?: true
    notasAdicionales?: true
    esDirectionPrincipal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AddressMaxAggregateInputType = {
    id?: true
    clientId?: true
    calle?: true
    numero?: true
    ciudad?: true
    region?: true
    codigoPostal?: true
    pais?: true
    notasAdicionales?: true
    esDirectionPrincipal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AddressCountAggregateInputType = {
    id?: true
    clientId?: true
    calle?: true
    numero?: true
    ciudad?: true
    region?: true
    codigoPostal?: true
    pais?: true
    notasAdicionales?: true
    esDirectionPrincipal?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Address to aggregate.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Addresses
    **/
    _count?: true | AddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressMaxAggregateInputType
  }

  export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
        [P in keyof T & keyof AggregateAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddress[P]>
      : GetScalarType<T[P], AggregateAddress[P]>
  }




  export type AddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithAggregationInput | AddressOrderByWithAggregationInput[]
    by: AddressScalarFieldEnum[] | AddressScalarFieldEnum
    having?: AddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressCountAggregateInputType | true
    _min?: AddressMinAggregateInputType
    _max?: AddressMaxAggregateInputType
  }

  export type AddressGroupByOutputType = {
    id: string
    clientId: string
    calle: string
    numero: string
    ciudad: string
    region: string | null
    codigoPostal: string | null
    pais: string
    notasAdicionales: string | null
    esDirectionPrincipal: boolean
    createdAt: Date
    updatedAt: Date
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  type GetAddressGroupByPayload<T extends AddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressGroupByOutputType[P]>
            : GetScalarType<T[P], AddressGroupByOutputType[P]>
        }
      >
    >


  export type AddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    calle?: boolean
    numero?: boolean
    ciudad?: boolean
    region?: boolean
    codigoPostal?: boolean
    pais?: boolean
    notasAdicionales?: boolean
    esDirectionPrincipal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClientDefaultArgs<ExtArgs>
    ordenes?: boolean | Address$ordenesArgs<ExtArgs>
    _count?: boolean | AddressCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    calle?: boolean
    numero?: boolean
    ciudad?: boolean
    region?: boolean
    codigoPostal?: boolean
    pais?: boolean
    notasAdicionales?: boolean
    esDirectionPrincipal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    calle?: boolean
    numero?: boolean
    ciudad?: boolean
    region?: boolean
    codigoPostal?: boolean
    pais?: boolean
    notasAdicionales?: boolean
    esDirectionPrincipal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectScalar = {
    id?: boolean
    clientId?: boolean
    calle?: boolean
    numero?: boolean
    ciudad?: boolean
    region?: boolean
    codigoPostal?: boolean
    pais?: boolean
    notasAdicionales?: boolean
    esDirectionPrincipal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "calle" | "numero" | "ciudad" | "region" | "codigoPostal" | "pais" | "notasAdicionales" | "esDirectionPrincipal" | "createdAt" | "updatedAt", ExtArgs["result"]["address"]>
  export type AddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClientDefaultArgs<ExtArgs>
    ordenes?: boolean | Address$ordenesArgs<ExtArgs>
    _count?: boolean | AddressCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AddressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type AddressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $AddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Address"
    objects: {
      cliente: Prisma.$ClientPayload<ExtArgs>
      ordenes: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      calle: string
      numero: string
      ciudad: string
      region: string | null
      codigoPostal: string | null
      pais: string
      notasAdicionales: string | null
      esDirectionPrincipal: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["address"]>
    composites: {}
  }

  type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = $Result.GetResult<Prisma.$AddressPayload, S>

  type AddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressCountAggregateInputType | true
    }

  export interface AddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Address'], meta: { name: 'Address' } }
    /**
     * Find zero or one Address that matches the filter.
     * @param {AddressFindUniqueArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressFindUniqueArgs>(args: SelectSubset<T, AddressFindUniqueArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Address that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressFindUniqueOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressFindFirstArgs>(args?: SelectSubset<T, AddressFindFirstArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Addresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addresses
     * const addresses = await prisma.address.findMany()
     * 
     * // Get first 10 Addresses
     * const addresses = await prisma.address.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressFindManyArgs>(args?: SelectSubset<T, AddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Address.
     * @param {AddressCreateArgs} args - Arguments to create a Address.
     * @example
     * // Create one Address
     * const Address = await prisma.address.create({
     *   data: {
     *     // ... data to create a Address
     *   }
     * })
     * 
     */
    create<T extends AddressCreateArgs>(args: SelectSubset<T, AddressCreateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Addresses.
     * @param {AddressCreateManyArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressCreateManyArgs>(args?: SelectSubset<T, AddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Addresses and returns the data saved in the database.
     * @param {AddressCreateManyAndReturnArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AddressCreateManyAndReturnArgs>(args?: SelectSubset<T, AddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Address.
     * @param {AddressDeleteArgs} args - Arguments to delete one Address.
     * @example
     * // Delete one Address
     * const Address = await prisma.address.delete({
     *   where: {
     *     // ... filter to delete one Address
     *   }
     * })
     * 
     */
    delete<T extends AddressDeleteArgs>(args: SelectSubset<T, AddressDeleteArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Address.
     * @param {AddressUpdateArgs} args - Arguments to update one Address.
     * @example
     * // Update one Address
     * const address = await prisma.address.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressUpdateArgs>(args: SelectSubset<T, AddressUpdateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Addresses.
     * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
     * @example
     * // Delete a few Addresses
     * const { count } = await prisma.address.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressDeleteManyArgs>(args?: SelectSubset<T, AddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressUpdateManyArgs>(args: SelectSubset<T, AddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses and returns the data updated in the database.
     * @param {AddressUpdateManyAndReturnArgs} args - Arguments to update many Addresses.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AddressUpdateManyAndReturnArgs>(args: SelectSubset<T, AddressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Address.
     * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
     * @example
     * // Update or create a Address
     * const address = await prisma.address.upsert({
     *   create: {
     *     // ... data to create a Address
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Address we want to update
     *   }
     * })
     */
    upsert<T extends AddressUpsertArgs>(args: SelectSubset<T, AddressUpsertArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressCountArgs} args - Arguments to filter Addresses to count.
     * @example
     * // Count the number of Addresses
     * const count = await prisma.address.count({
     *   where: {
     *     // ... the filter for the Addresses we want to count
     *   }
     * })
    **/
    count<T extends AddressCountArgs>(
      args?: Subset<T, AddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressAggregateArgs>(args: Subset<T, AddressAggregateArgs>): Prisma.PrismaPromise<GetAddressAggregateType<T>>

    /**
     * Group by Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressGroupByArgs['orderBy'] }
        : { orderBy?: AddressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Address model
   */
  readonly fields: AddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Address.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ordenes<T extends Address$ordenesArgs<ExtArgs> = {}>(args?: Subset<T, Address$ordenesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Address model
   */
  interface AddressFieldRefs {
    readonly id: FieldRef<"Address", 'String'>
    readonly clientId: FieldRef<"Address", 'String'>
    readonly calle: FieldRef<"Address", 'String'>
    readonly numero: FieldRef<"Address", 'String'>
    readonly ciudad: FieldRef<"Address", 'String'>
    readonly region: FieldRef<"Address", 'String'>
    readonly codigoPostal: FieldRef<"Address", 'String'>
    readonly pais: FieldRef<"Address", 'String'>
    readonly notasAdicionales: FieldRef<"Address", 'String'>
    readonly esDirectionPrincipal: FieldRef<"Address", 'Boolean'>
    readonly createdAt: FieldRef<"Address", 'DateTime'>
    readonly updatedAt: FieldRef<"Address", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Address findUnique
   */
  export type AddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findUniqueOrThrow
   */
  export type AddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findFirst
   */
  export type AddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findFirstOrThrow
   */
  export type AddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findMany
   */
  export type AddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Addresses to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address create
   */
  export type AddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to create a Address.
     */
    data: XOR<AddressCreateInput, AddressUncheckedCreateInput>
  }

  /**
   * Address createMany
   */
  export type AddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Address createManyAndReturn
   */
  export type AddressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Address update
   */
  export type AddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to update a Address.
     */
    data: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
    /**
     * Choose, which Address to update.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address updateMany
   */
  export type AddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
  }

  /**
   * Address updateManyAndReturn
   */
  export type AddressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Address upsert
   */
  export type AddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The filter to search for the Address to update in case it exists.
     */
    where: AddressWhereUniqueInput
    /**
     * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
     */
    create: XOR<AddressCreateInput, AddressUncheckedCreateInput>
    /**
     * In case the Address was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
  }

  /**
   * Address delete
   */
  export type AddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter which Address to delete.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address deleteMany
   */
  export type AddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Addresses to delete
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to delete.
     */
    limit?: number
  }

  /**
   * Address.ordenes
   */
  export type Address$ordenesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Address without action
   */
  export type AddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    subtotal: number | null
    impuestos: number | null
    total: number | null
    intentosPago: number | null
  }

  export type OrderSumAggregateOutputType = {
    subtotal: number | null
    impuestos: number | null
    total: number | null
    intentosPago: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    idCanal: string | null
    tipoCanal: $Enums.OrderChannel | null
    clienteId: string | null
    direccionId: string | null
    subtotal: number | null
    impuestos: number | null
    total: number | null
    estado: $Enums.OrderStatus | null
    prioridad: $Enums.OrderPriority | null
    recibidoEn: Date | null
    procesadoEn: Date | null
    notas: string | null
    agenteId: string | null
    intentosPago: number | null
    motivoRechazo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    idCanal: string | null
    tipoCanal: $Enums.OrderChannel | null
    clienteId: string | null
    direccionId: string | null
    subtotal: number | null
    impuestos: number | null
    total: number | null
    estado: $Enums.OrderStatus | null
    prioridad: $Enums.OrderPriority | null
    recibidoEn: Date | null
    procesadoEn: Date | null
    notas: string | null
    agenteId: string | null
    intentosPago: number | null
    motivoRechazo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    idCanal: number
    tipoCanal: number
    clienteId: number
    direccionId: number
    subtotal: number
    impuestos: number
    total: number
    estado: number
    prioridad: number
    recibidoEn: number
    procesadoEn: number
    notas: number
    agenteId: number
    intentosPago: number
    motivoRechazo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    subtotal?: true
    impuestos?: true
    total?: true
    intentosPago?: true
  }

  export type OrderSumAggregateInputType = {
    subtotal?: true
    impuestos?: true
    total?: true
    intentosPago?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    idCanal?: true
    tipoCanal?: true
    clienteId?: true
    direccionId?: true
    subtotal?: true
    impuestos?: true
    total?: true
    estado?: true
    prioridad?: true
    recibidoEn?: true
    procesadoEn?: true
    notas?: true
    agenteId?: true
    intentosPago?: true
    motivoRechazo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    idCanal?: true
    tipoCanal?: true
    clienteId?: true
    direccionId?: true
    subtotal?: true
    impuestos?: true
    total?: true
    estado?: true
    prioridad?: true
    recibidoEn?: true
    procesadoEn?: true
    notas?: true
    agenteId?: true
    intentosPago?: true
    motivoRechazo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    idCanal?: true
    tipoCanal?: true
    clienteId?: true
    direccionId?: true
    subtotal?: true
    impuestos?: true
    total?: true
    estado?: true
    prioridad?: true
    recibidoEn?: true
    procesadoEn?: true
    notas?: true
    agenteId?: true
    intentosPago?: true
    motivoRechazo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    clienteId: string
    direccionId: string
    subtotal: number
    impuestos: number
    total: number
    estado: $Enums.OrderStatus
    prioridad: $Enums.OrderPriority
    recibidoEn: Date
    procesadoEn: Date | null
    notas: string | null
    agenteId: string | null
    intentosPago: number
    motivoRechazo: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idCanal?: boolean
    tipoCanal?: boolean
    clienteId?: boolean
    direccionId?: boolean
    subtotal?: boolean
    impuestos?: boolean
    total?: boolean
    estado?: boolean
    prioridad?: boolean
    recibidoEn?: boolean
    procesadoEn?: boolean
    notas?: boolean
    agenteId?: boolean
    intentosPago?: boolean
    motivoRechazo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClientDefaultArgs<ExtArgs>
    direccionEnvio?: boolean | AddressDefaultArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    stockReservations?: boolean | Order$stockReservationsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idCanal?: boolean
    tipoCanal?: boolean
    clienteId?: boolean
    direccionId?: boolean
    subtotal?: boolean
    impuestos?: boolean
    total?: boolean
    estado?: boolean
    prioridad?: boolean
    recibidoEn?: boolean
    procesadoEn?: boolean
    notas?: boolean
    agenteId?: boolean
    intentosPago?: boolean
    motivoRechazo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClientDefaultArgs<ExtArgs>
    direccionEnvio?: boolean | AddressDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idCanal?: boolean
    tipoCanal?: boolean
    clienteId?: boolean
    direccionId?: boolean
    subtotal?: boolean
    impuestos?: boolean
    total?: boolean
    estado?: boolean
    prioridad?: boolean
    recibidoEn?: boolean
    procesadoEn?: boolean
    notas?: boolean
    agenteId?: boolean
    intentosPago?: boolean
    motivoRechazo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClientDefaultArgs<ExtArgs>
    direccionEnvio?: boolean | AddressDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    idCanal?: boolean
    tipoCanal?: boolean
    clienteId?: boolean
    direccionId?: boolean
    subtotal?: boolean
    impuestos?: boolean
    total?: boolean
    estado?: boolean
    prioridad?: boolean
    recibidoEn?: boolean
    procesadoEn?: boolean
    notas?: boolean
    agenteId?: boolean
    intentosPago?: boolean
    motivoRechazo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idCanal" | "tipoCanal" | "clienteId" | "direccionId" | "subtotal" | "impuestos" | "total" | "estado" | "prioridad" | "recibidoEn" | "procesadoEn" | "notas" | "agenteId" | "intentosPago" | "motivoRechazo" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClientDefaultArgs<ExtArgs>
    direccionEnvio?: boolean | AddressDefaultArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    stockReservations?: boolean | Order$stockReservationsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClientDefaultArgs<ExtArgs>
    direccionEnvio?: boolean | AddressDefaultArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClientDefaultArgs<ExtArgs>
    direccionEnvio?: boolean | AddressDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      cliente: Prisma.$ClientPayload<ExtArgs>
      direccionEnvio: Prisma.$AddressPayload<ExtArgs>
      items: Prisma.$ItemPayload<ExtArgs>[]
      stockReservations: Prisma.$StockReservationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idCanal: string
      tipoCanal: $Enums.OrderChannel
      clienteId: string
      direccionId: string
      subtotal: number
      impuestos: number
      total: number
      estado: $Enums.OrderStatus
      prioridad: $Enums.OrderPriority
      recibidoEn: Date
      procesadoEn: Date | null
      notas: string | null
      agenteId: string | null
      intentosPago: number
      motivoRechazo: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    direccionEnvio<T extends AddressDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AddressDefaultArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stockReservations<T extends Order$stockReservationsArgs<ExtArgs> = {}>(args?: Subset<T, Order$stockReservationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly idCanal: FieldRef<"Order", 'String'>
    readonly tipoCanal: FieldRef<"Order", 'OrderChannel'>
    readonly clienteId: FieldRef<"Order", 'String'>
    readonly direccionId: FieldRef<"Order", 'String'>
    readonly subtotal: FieldRef<"Order", 'Float'>
    readonly impuestos: FieldRef<"Order", 'Float'>
    readonly total: FieldRef<"Order", 'Float'>
    readonly estado: FieldRef<"Order", 'OrderStatus'>
    readonly prioridad: FieldRef<"Order", 'OrderPriority'>
    readonly recibidoEn: FieldRef<"Order", 'DateTime'>
    readonly procesadoEn: FieldRef<"Order", 'DateTime'>
    readonly notas: FieldRef<"Order", 'String'>
    readonly agenteId: FieldRef<"Order", 'String'>
    readonly intentosPago: FieldRef<"Order", 'Int'>
    readonly motivoRechazo: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Order.stockReservations
   */
  export type Order$stockReservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    where?: StockReservationWhereInput
    orderBy?: StockReservationOrderByWithRelationInput | StockReservationOrderByWithRelationInput[]
    cursor?: StockReservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockReservationScalarFieldEnum | StockReservationScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model Item
   */

  export type AggregateItem = {
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  export type ItemAvgAggregateOutputType = {
    cantidad: number | null
    precioUnitario: number | null
    descuento: number | null
    subtotal: number | null
  }

  export type ItemSumAggregateOutputType = {
    cantidad: number | null
    precioUnitario: number | null
    descuento: number | null
    subtotal: number | null
  }

  export type ItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    sku: string | null
    cantidad: number | null
    precioUnitario: number | null
    descuento: number | null
    subtotal: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    sku: string | null
    cantidad: number | null
    precioUnitario: number | null
    descuento: number | null
    subtotal: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemCountAggregateOutputType = {
    id: number
    orderId: number
    sku: number
    cantidad: number
    precioUnitario: number
    descuento: number
    subtotal: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ItemAvgAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    subtotal?: true
  }

  export type ItemSumAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    subtotal?: true
  }

  export type ItemMinAggregateInputType = {
    id?: true
    orderId?: true
    sku?: true
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    subtotal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    sku?: true
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    subtotal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemCountAggregateInputType = {
    id?: true
    orderId?: true
    sku?: true
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    subtotal?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Item to aggregate.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Items
    **/
    _count?: true | ItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemMaxAggregateInputType
  }

  export type GetItemAggregateType<T extends ItemAggregateArgs> = {
        [P in keyof T & keyof AggregateItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem[P]>
      : GetScalarType<T[P], AggregateItem[P]>
  }




  export type ItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithAggregationInput | ItemOrderByWithAggregationInput[]
    by: ItemScalarFieldEnum[] | ItemScalarFieldEnum
    having?: ItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemCountAggregateInputType | true
    _avg?: ItemAvgAggregateInputType
    _sum?: ItemSumAggregateInputType
    _min?: ItemMinAggregateInputType
    _max?: ItemMaxAggregateInputType
  }

  export type ItemGroupByOutputType = {
    id: string
    orderId: string
    sku: string
    cantidad: number
    precioUnitario: number
    descuento: number
    subtotal: number
    createdAt: Date
    updatedAt: Date
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  type GetItemGroupByPayload<T extends ItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemGroupByOutputType[P]>
            : GetScalarType<T[P], ItemGroupByOutputType[P]>
        }
      >
    >


  export type ItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    sku?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    descuento?: boolean
    subtotal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    sku?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    descuento?: boolean
    subtotal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    sku?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    descuento?: boolean
    subtotal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    sku?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    descuento?: boolean
    subtotal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "sku" | "cantidad" | "precioUnitario" | "descuento" | "subtotal" | "createdAt" | "updatedAt", ExtArgs["result"]["item"]>
  export type ItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type ItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type ItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $ItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Item"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      sku: string
      cantidad: number
      precioUnitario: number
      descuento: number
      subtotal: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["item"]>
    composites: {}
  }

  type ItemGetPayload<S extends boolean | null | undefined | ItemDefaultArgs> = $Result.GetResult<Prisma.$ItemPayload, S>

  type ItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemCountAggregateInputType | true
    }

  export interface ItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Item'], meta: { name: 'Item' } }
    /**
     * Find zero or one Item that matches the filter.
     * @param {ItemFindUniqueArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFindUniqueArgs>(args: SelectSubset<T, ItemFindUniqueArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemFindUniqueOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFindFirstArgs>(args?: SelectSubset<T, ItemFindFirstArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Items
     * const items = await prisma.item.findMany()
     * 
     * // Get first 10 Items
     * const items = await prisma.item.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemWithIdOnly = await prisma.item.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFindManyArgs>(args?: SelectSubset<T, ItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item.
     * @param {ItemCreateArgs} args - Arguments to create a Item.
     * @example
     * // Create one Item
     * const Item = await prisma.item.create({
     *   data: {
     *     // ... data to create a Item
     *   }
     * })
     * 
     */
    create<T extends ItemCreateArgs>(args: SelectSubset<T, ItemCreateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Items.
     * @param {ItemCreateManyArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemCreateManyArgs>(args?: SelectSubset<T, ItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Items and returns the data saved in the database.
     * @param {ItemCreateManyAndReturnArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Items and only return the `id`
     * const itemWithIdOnly = await prisma.item.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Item.
     * @param {ItemDeleteArgs} args - Arguments to delete one Item.
     * @example
     * // Delete one Item
     * const Item = await prisma.item.delete({
     *   where: {
     *     // ... filter to delete one Item
     *   }
     * })
     * 
     */
    delete<T extends ItemDeleteArgs>(args: SelectSubset<T, ItemDeleteArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item.
     * @param {ItemUpdateArgs} args - Arguments to update one Item.
     * @example
     * // Update one Item
     * const item = await prisma.item.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemUpdateArgs>(args: SelectSubset<T, ItemUpdateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Items.
     * @param {ItemDeleteManyArgs} args - Arguments to filter Items to delete.
     * @example
     * // Delete a few Items
     * const { count } = await prisma.item.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemDeleteManyArgs>(args?: SelectSubset<T, ItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemUpdateManyArgs>(args: SelectSubset<T, ItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items and returns the data updated in the database.
     * @param {ItemUpdateManyAndReturnArgs} args - Arguments to update many Items.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Items and only return the `id`
     * const itemWithIdOnly = await prisma.item.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Item.
     * @param {ItemUpsertArgs} args - Arguments to update or create a Item.
     * @example
     * // Update or create a Item
     * const item = await prisma.item.upsert({
     *   create: {
     *     // ... data to create a Item
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item we want to update
     *   }
     * })
     */
    upsert<T extends ItemUpsertArgs>(args: SelectSubset<T, ItemUpsertArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemCountArgs} args - Arguments to filter Items to count.
     * @example
     * // Count the number of Items
     * const count = await prisma.item.count({
     *   where: {
     *     // ... the filter for the Items we want to count
     *   }
     * })
    **/
    count<T extends ItemCountArgs>(
      args?: Subset<T, ItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemAggregateArgs>(args: Subset<T, ItemAggregateArgs>): Prisma.PrismaPromise<GetItemAggregateType<T>>

    /**
     * Group by Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemGroupByArgs['orderBy'] }
        : { orderBy?: ItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Item model
   */
  readonly fields: ItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Item.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Item model
   */
  interface ItemFieldRefs {
    readonly id: FieldRef<"Item", 'String'>
    readonly orderId: FieldRef<"Item", 'String'>
    readonly sku: FieldRef<"Item", 'String'>
    readonly cantidad: FieldRef<"Item", 'Int'>
    readonly precioUnitario: FieldRef<"Item", 'Float'>
    readonly descuento: FieldRef<"Item", 'Float'>
    readonly subtotal: FieldRef<"Item", 'Float'>
    readonly createdAt: FieldRef<"Item", 'DateTime'>
    readonly updatedAt: FieldRef<"Item", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Item findUnique
   */
  export type ItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findUniqueOrThrow
   */
  export type ItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findFirst
   */
  export type ItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findFirstOrThrow
   */
  export type ItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findMany
   */
  export type ItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item create
   */
  export type ItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to create a Item.
     */
    data: XOR<ItemCreateInput, ItemUncheckedCreateInput>
  }

  /**
   * Item createMany
   */
  export type ItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Item createManyAndReturn
   */
  export type ItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Item update
   */
  export type ItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to update a Item.
     */
    data: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
    /**
     * Choose, which Item to update.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item updateMany
   */
  export type ItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to update.
     */
    limit?: number
  }

  /**
   * Item updateManyAndReturn
   */
  export type ItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Item upsert
   */
  export type ItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The filter to search for the Item to update in case it exists.
     */
    where: ItemWhereUniqueInput
    /**
     * In case the Item found by the `where` argument doesn't exist, create a new Item with this data.
     */
    create: XOR<ItemCreateInput, ItemUncheckedCreateInput>
    /**
     * In case the Item was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
  }

  /**
   * Item delete
   */
  export type ItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter which Item to delete.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item deleteMany
   */
  export type ItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Items to delete
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to delete.
     */
    limit?: number
  }

  /**
   * Item without action
   */
  export type ItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
  }


  /**
   * Model StockReservation
   */

  export type AggregateStockReservation = {
    _count: StockReservationCountAggregateOutputType | null
    _avg: StockReservationAvgAggregateOutputType | null
    _sum: StockReservationSumAggregateOutputType | null
    _min: StockReservationMinAggregateOutputType | null
    _max: StockReservationMaxAggregateOutputType | null
  }

  export type StockReservationAvgAggregateOutputType = {
    cantidad: number | null
  }

  export type StockReservationSumAggregateOutputType = {
    cantidad: number | null
  }

  export type StockReservationMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    sku: string | null
    cantidad: number | null
    reservaId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockReservationMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    sku: string | null
    cantidad: number | null
    reservaId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockReservationCountAggregateOutputType = {
    id: number
    orderId: number
    sku: number
    cantidad: number
    reservaId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StockReservationAvgAggregateInputType = {
    cantidad?: true
  }

  export type StockReservationSumAggregateInputType = {
    cantidad?: true
  }

  export type StockReservationMinAggregateInputType = {
    id?: true
    orderId?: true
    sku?: true
    cantidad?: true
    reservaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockReservationMaxAggregateInputType = {
    id?: true
    orderId?: true
    sku?: true
    cantidad?: true
    reservaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockReservationCountAggregateInputType = {
    id?: true
    orderId?: true
    sku?: true
    cantidad?: true
    reservaId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StockReservationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockReservation to aggregate.
     */
    where?: StockReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReservations to fetch.
     */
    orderBy?: StockReservationOrderByWithRelationInput | StockReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockReservations
    **/
    _count?: true | StockReservationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockReservationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockReservationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockReservationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockReservationMaxAggregateInputType
  }

  export type GetStockReservationAggregateType<T extends StockReservationAggregateArgs> = {
        [P in keyof T & keyof AggregateStockReservation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockReservation[P]>
      : GetScalarType<T[P], AggregateStockReservation[P]>
  }




  export type StockReservationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockReservationWhereInput
    orderBy?: StockReservationOrderByWithAggregationInput | StockReservationOrderByWithAggregationInput[]
    by: StockReservationScalarFieldEnum[] | StockReservationScalarFieldEnum
    having?: StockReservationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockReservationCountAggregateInputType | true
    _avg?: StockReservationAvgAggregateInputType
    _sum?: StockReservationSumAggregateInputType
    _min?: StockReservationMinAggregateInputType
    _max?: StockReservationMaxAggregateInputType
  }

  export type StockReservationGroupByOutputType = {
    id: string
    orderId: string
    sku: string
    cantidad: number
    reservaId: string
    createdAt: Date
    updatedAt: Date
    _count: StockReservationCountAggregateOutputType | null
    _avg: StockReservationAvgAggregateOutputType | null
    _sum: StockReservationSumAggregateOutputType | null
    _min: StockReservationMinAggregateOutputType | null
    _max: StockReservationMaxAggregateOutputType | null
  }

  type GetStockReservationGroupByPayload<T extends StockReservationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockReservationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockReservationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockReservationGroupByOutputType[P]>
            : GetScalarType<T[P], StockReservationGroupByOutputType[P]>
        }
      >
    >


  export type StockReservationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    sku?: boolean
    cantidad?: boolean
    reservaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockReservation"]>

  export type StockReservationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    sku?: boolean
    cantidad?: boolean
    reservaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockReservation"]>

  export type StockReservationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    sku?: boolean
    cantidad?: boolean
    reservaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stockReservation"]>

  export type StockReservationSelectScalar = {
    id?: boolean
    orderId?: boolean
    sku?: boolean
    cantidad?: boolean
    reservaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StockReservationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "sku" | "cantidad" | "reservaId" | "createdAt" | "updatedAt", ExtArgs["result"]["stockReservation"]>
  export type StockReservationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type StockReservationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type StockReservationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $StockReservationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockReservation"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      sku: string
      cantidad: number
      reservaId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stockReservation"]>
    composites: {}
  }

  type StockReservationGetPayload<S extends boolean | null | undefined | StockReservationDefaultArgs> = $Result.GetResult<Prisma.$StockReservationPayload, S>

  type StockReservationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockReservationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockReservationCountAggregateInputType | true
    }

  export interface StockReservationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockReservation'], meta: { name: 'StockReservation' } }
    /**
     * Find zero or one StockReservation that matches the filter.
     * @param {StockReservationFindUniqueArgs} args - Arguments to find a StockReservation
     * @example
     * // Get one StockReservation
     * const stockReservation = await prisma.stockReservation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockReservationFindUniqueArgs>(args: SelectSubset<T, StockReservationFindUniqueArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StockReservation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockReservationFindUniqueOrThrowArgs} args - Arguments to find a StockReservation
     * @example
     * // Get one StockReservation
     * const stockReservation = await prisma.stockReservation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockReservationFindUniqueOrThrowArgs>(args: SelectSubset<T, StockReservationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockReservation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationFindFirstArgs} args - Arguments to find a StockReservation
     * @example
     * // Get one StockReservation
     * const stockReservation = await prisma.stockReservation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockReservationFindFirstArgs>(args?: SelectSubset<T, StockReservationFindFirstArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StockReservation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationFindFirstOrThrowArgs} args - Arguments to find a StockReservation
     * @example
     * // Get one StockReservation
     * const stockReservation = await prisma.stockReservation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockReservationFindFirstOrThrowArgs>(args?: SelectSubset<T, StockReservationFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StockReservations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockReservations
     * const stockReservations = await prisma.stockReservation.findMany()
     * 
     * // Get first 10 StockReservations
     * const stockReservations = await prisma.stockReservation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockReservationWithIdOnly = await prisma.stockReservation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockReservationFindManyArgs>(args?: SelectSubset<T, StockReservationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StockReservation.
     * @param {StockReservationCreateArgs} args - Arguments to create a StockReservation.
     * @example
     * // Create one StockReservation
     * const StockReservation = await prisma.stockReservation.create({
     *   data: {
     *     // ... data to create a StockReservation
     *   }
     * })
     * 
     */
    create<T extends StockReservationCreateArgs>(args: SelectSubset<T, StockReservationCreateArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StockReservations.
     * @param {StockReservationCreateManyArgs} args - Arguments to create many StockReservations.
     * @example
     * // Create many StockReservations
     * const stockReservation = await prisma.stockReservation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockReservationCreateManyArgs>(args?: SelectSubset<T, StockReservationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StockReservations and returns the data saved in the database.
     * @param {StockReservationCreateManyAndReturnArgs} args - Arguments to create many StockReservations.
     * @example
     * // Create many StockReservations
     * const stockReservation = await prisma.stockReservation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StockReservations and only return the `id`
     * const stockReservationWithIdOnly = await prisma.stockReservation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockReservationCreateManyAndReturnArgs>(args?: SelectSubset<T, StockReservationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StockReservation.
     * @param {StockReservationDeleteArgs} args - Arguments to delete one StockReservation.
     * @example
     * // Delete one StockReservation
     * const StockReservation = await prisma.stockReservation.delete({
     *   where: {
     *     // ... filter to delete one StockReservation
     *   }
     * })
     * 
     */
    delete<T extends StockReservationDeleteArgs>(args: SelectSubset<T, StockReservationDeleteArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StockReservation.
     * @param {StockReservationUpdateArgs} args - Arguments to update one StockReservation.
     * @example
     * // Update one StockReservation
     * const stockReservation = await prisma.stockReservation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockReservationUpdateArgs>(args: SelectSubset<T, StockReservationUpdateArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StockReservations.
     * @param {StockReservationDeleteManyArgs} args - Arguments to filter StockReservations to delete.
     * @example
     * // Delete a few StockReservations
     * const { count } = await prisma.stockReservation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockReservationDeleteManyArgs>(args?: SelectSubset<T, StockReservationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockReservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockReservations
     * const stockReservation = await prisma.stockReservation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockReservationUpdateManyArgs>(args: SelectSubset<T, StockReservationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockReservations and returns the data updated in the database.
     * @param {StockReservationUpdateManyAndReturnArgs} args - Arguments to update many StockReservations.
     * @example
     * // Update many StockReservations
     * const stockReservation = await prisma.stockReservation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StockReservations and only return the `id`
     * const stockReservationWithIdOnly = await prisma.stockReservation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockReservationUpdateManyAndReturnArgs>(args: SelectSubset<T, StockReservationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StockReservation.
     * @param {StockReservationUpsertArgs} args - Arguments to update or create a StockReservation.
     * @example
     * // Update or create a StockReservation
     * const stockReservation = await prisma.stockReservation.upsert({
     *   create: {
     *     // ... data to create a StockReservation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockReservation we want to update
     *   }
     * })
     */
    upsert<T extends StockReservationUpsertArgs>(args: SelectSubset<T, StockReservationUpsertArgs<ExtArgs>>): Prisma__StockReservationClient<$Result.GetResult<Prisma.$StockReservationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StockReservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationCountArgs} args - Arguments to filter StockReservations to count.
     * @example
     * // Count the number of StockReservations
     * const count = await prisma.stockReservation.count({
     *   where: {
     *     // ... the filter for the StockReservations we want to count
     *   }
     * })
    **/
    count<T extends StockReservationCountArgs>(
      args?: Subset<T, StockReservationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockReservationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockReservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockReservationAggregateArgs>(args: Subset<T, StockReservationAggregateArgs>): Prisma.PrismaPromise<GetStockReservationAggregateType<T>>

    /**
     * Group by StockReservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockReservationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockReservationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockReservationGroupByArgs['orderBy'] }
        : { orderBy?: StockReservationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockReservationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockReservationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockReservation model
   */
  readonly fields: StockReservationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockReservation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockReservationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StockReservation model
   */
  interface StockReservationFieldRefs {
    readonly id: FieldRef<"StockReservation", 'String'>
    readonly orderId: FieldRef<"StockReservation", 'String'>
    readonly sku: FieldRef<"StockReservation", 'String'>
    readonly cantidad: FieldRef<"StockReservation", 'Int'>
    readonly reservaId: FieldRef<"StockReservation", 'String'>
    readonly createdAt: FieldRef<"StockReservation", 'DateTime'>
    readonly updatedAt: FieldRef<"StockReservation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StockReservation findUnique
   */
  export type StockReservationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * Filter, which StockReservation to fetch.
     */
    where: StockReservationWhereUniqueInput
  }

  /**
   * StockReservation findUniqueOrThrow
   */
  export type StockReservationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * Filter, which StockReservation to fetch.
     */
    where: StockReservationWhereUniqueInput
  }

  /**
   * StockReservation findFirst
   */
  export type StockReservationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * Filter, which StockReservation to fetch.
     */
    where?: StockReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReservations to fetch.
     */
    orderBy?: StockReservationOrderByWithRelationInput | StockReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockReservations.
     */
    cursor?: StockReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockReservations.
     */
    distinct?: StockReservationScalarFieldEnum | StockReservationScalarFieldEnum[]
  }

  /**
   * StockReservation findFirstOrThrow
   */
  export type StockReservationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * Filter, which StockReservation to fetch.
     */
    where?: StockReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReservations to fetch.
     */
    orderBy?: StockReservationOrderByWithRelationInput | StockReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockReservations.
     */
    cursor?: StockReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockReservations.
     */
    distinct?: StockReservationScalarFieldEnum | StockReservationScalarFieldEnum[]
  }

  /**
   * StockReservation findMany
   */
  export type StockReservationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * Filter, which StockReservations to fetch.
     */
    where?: StockReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockReservations to fetch.
     */
    orderBy?: StockReservationOrderByWithRelationInput | StockReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockReservations.
     */
    cursor?: StockReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockReservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockReservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockReservations.
     */
    distinct?: StockReservationScalarFieldEnum | StockReservationScalarFieldEnum[]
  }

  /**
   * StockReservation create
   */
  export type StockReservationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * The data needed to create a StockReservation.
     */
    data: XOR<StockReservationCreateInput, StockReservationUncheckedCreateInput>
  }

  /**
   * StockReservation createMany
   */
  export type StockReservationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockReservations.
     */
    data: StockReservationCreateManyInput | StockReservationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockReservation createManyAndReturn
   */
  export type StockReservationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * The data used to create many StockReservations.
     */
    data: StockReservationCreateManyInput | StockReservationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockReservation update
   */
  export type StockReservationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * The data needed to update a StockReservation.
     */
    data: XOR<StockReservationUpdateInput, StockReservationUncheckedUpdateInput>
    /**
     * Choose, which StockReservation to update.
     */
    where: StockReservationWhereUniqueInput
  }

  /**
   * StockReservation updateMany
   */
  export type StockReservationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockReservations.
     */
    data: XOR<StockReservationUpdateManyMutationInput, StockReservationUncheckedUpdateManyInput>
    /**
     * Filter which StockReservations to update
     */
    where?: StockReservationWhereInput
    /**
     * Limit how many StockReservations to update.
     */
    limit?: number
  }

  /**
   * StockReservation updateManyAndReturn
   */
  export type StockReservationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * The data used to update StockReservations.
     */
    data: XOR<StockReservationUpdateManyMutationInput, StockReservationUncheckedUpdateManyInput>
    /**
     * Filter which StockReservations to update
     */
    where?: StockReservationWhereInput
    /**
     * Limit how many StockReservations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StockReservation upsert
   */
  export type StockReservationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * The filter to search for the StockReservation to update in case it exists.
     */
    where: StockReservationWhereUniqueInput
    /**
     * In case the StockReservation found by the `where` argument doesn't exist, create a new StockReservation with this data.
     */
    create: XOR<StockReservationCreateInput, StockReservationUncheckedCreateInput>
    /**
     * In case the StockReservation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockReservationUpdateInput, StockReservationUncheckedUpdateInput>
  }

  /**
   * StockReservation delete
   */
  export type StockReservationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
    /**
     * Filter which StockReservation to delete.
     */
    where: StockReservationWhereUniqueInput
  }

  /**
   * StockReservation deleteMany
   */
  export type StockReservationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockReservations to delete
     */
    where?: StockReservationWhereInput
    /**
     * Limit how many StockReservations to delete.
     */
    limit?: number
  }

  /**
   * StockReservation without action
   */
  export type StockReservationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockReservation
     */
    select?: StockReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StockReservation
     */
    omit?: StockReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockReservationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ClientScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    email: 'email',
    telefono: 'telefono',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const AddressScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    calle: 'calle',
    numero: 'numero',
    ciudad: 'ciudad',
    region: 'region',
    codigoPostal: 'codigoPostal',
    pais: 'pais',
    notasAdicionales: 'notasAdicionales',
    esDirectionPrincipal: 'esDirectionPrincipal',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    idCanal: 'idCanal',
    tipoCanal: 'tipoCanal',
    clienteId: 'clienteId',
    direccionId: 'direccionId',
    subtotal: 'subtotal',
    impuestos: 'impuestos',
    total: 'total',
    estado: 'estado',
    prioridad: 'prioridad',
    recibidoEn: 'recibidoEn',
    procesadoEn: 'procesadoEn',
    notas: 'notas',
    agenteId: 'agenteId',
    intentosPago: 'intentosPago',
    motivoRechazo: 'motivoRechazo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const ItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    sku: 'sku',
    cantidad: 'cantidad',
    precioUnitario: 'precioUnitario',
    descuento: 'descuento',
    subtotal: 'subtotal',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ItemScalarFieldEnum = (typeof ItemScalarFieldEnum)[keyof typeof ItemScalarFieldEnum]


  export const StockReservationScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    sku: 'sku',
    cantidad: 'cantidad',
    reservaId: 'reservaId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StockReservationScalarFieldEnum = (typeof StockReservationScalarFieldEnum)[keyof typeof StockReservationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'OrderChannel'
   */
  export type EnumOrderChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderChannel'>
    


  /**
   * Reference to a field of type 'OrderChannel[]'
   */
  export type ListEnumOrderChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderChannel[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'OrderPriority'
   */
  export type EnumOrderPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderPriority'>
    


  /**
   * Reference to a field of type 'OrderPriority[]'
   */
  export type ListEnumOrderPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderPriority[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    nombre?: StringFilter<"Client"> | string
    email?: StringFilter<"Client"> | string
    telefono?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    orders?: OrderListRelationFilter
    addresses?: AddressListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    orders?: OrderOrderByRelationAggregateInput
    addresses?: AddressOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    nombre?: StringFilter<"Client"> | string
    telefono?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    orders?: OrderListRelationFilter
    addresses?: AddressListRelationFilter
  }, "id" | "email">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    nombre?: StringWithAggregatesFilter<"Client"> | string
    email?: StringWithAggregatesFilter<"Client"> | string
    telefono?: StringNullableWithAggregatesFilter<"Client"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    id?: StringFilter<"Address"> | string
    clientId?: StringFilter<"Address"> | string
    calle?: StringFilter<"Address"> | string
    numero?: StringFilter<"Address"> | string
    ciudad?: StringFilter<"Address"> | string
    region?: StringNullableFilter<"Address"> | string | null
    codigoPostal?: StringNullableFilter<"Address"> | string | null
    pais?: StringFilter<"Address"> | string
    notasAdicionales?: StringNullableFilter<"Address"> | string | null
    esDirectionPrincipal?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
    cliente?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    ordenes?: OrderListRelationFilter
  }

  export type AddressOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    ciudad?: SortOrder
    region?: SortOrderInput | SortOrder
    codigoPostal?: SortOrderInput | SortOrder
    pais?: SortOrder
    notasAdicionales?: SortOrderInput | SortOrder
    esDirectionPrincipal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cliente?: ClientOrderByWithRelationInput
    ordenes?: OrderOrderByRelationAggregateInput
  }

  export type AddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    clientId?: StringFilter<"Address"> | string
    calle?: StringFilter<"Address"> | string
    numero?: StringFilter<"Address"> | string
    ciudad?: StringFilter<"Address"> | string
    region?: StringNullableFilter<"Address"> | string | null
    codigoPostal?: StringNullableFilter<"Address"> | string | null
    pais?: StringFilter<"Address"> | string
    notasAdicionales?: StringNullableFilter<"Address"> | string | null
    esDirectionPrincipal?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
    cliente?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    ordenes?: OrderListRelationFilter
  }, "id">

  export type AddressOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    ciudad?: SortOrder
    region?: SortOrderInput | SortOrder
    codigoPostal?: SortOrderInput | SortOrder
    pais?: SortOrder
    notasAdicionales?: SortOrderInput | SortOrder
    esDirectionPrincipal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AddressCountOrderByAggregateInput
    _max?: AddressMaxOrderByAggregateInput
    _min?: AddressMinOrderByAggregateInput
  }

  export type AddressScalarWhereWithAggregatesInput = {
    AND?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    OR?: AddressScalarWhereWithAggregatesInput[]
    NOT?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Address"> | string
    clientId?: StringWithAggregatesFilter<"Address"> | string
    calle?: StringWithAggregatesFilter<"Address"> | string
    numero?: StringWithAggregatesFilter<"Address"> | string
    ciudad?: StringWithAggregatesFilter<"Address"> | string
    region?: StringNullableWithAggregatesFilter<"Address"> | string | null
    codigoPostal?: StringNullableWithAggregatesFilter<"Address"> | string | null
    pais?: StringWithAggregatesFilter<"Address"> | string
    notasAdicionales?: StringNullableWithAggregatesFilter<"Address"> | string | null
    esDirectionPrincipal?: BoolWithAggregatesFilter<"Address"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    idCanal?: StringFilter<"Order"> | string
    tipoCanal?: EnumOrderChannelFilter<"Order"> | $Enums.OrderChannel
    clienteId?: StringFilter<"Order"> | string
    direccionId?: StringFilter<"Order"> | string
    subtotal?: FloatFilter<"Order"> | number
    impuestos?: FloatFilter<"Order"> | number
    total?: FloatFilter<"Order"> | number
    estado?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFilter<"Order"> | $Enums.OrderPriority
    recibidoEn?: DateTimeFilter<"Order"> | Date | string
    procesadoEn?: DateTimeNullableFilter<"Order"> | Date | string | null
    notas?: StringNullableFilter<"Order"> | string | null
    agenteId?: StringNullableFilter<"Order"> | string | null
    intentosPago?: IntFilter<"Order"> | number
    motivoRechazo?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    cliente?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    direccionEnvio?: XOR<AddressScalarRelationFilter, AddressWhereInput>
    items?: ItemListRelationFilter
    stockReservations?: StockReservationListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    idCanal?: SortOrder
    tipoCanal?: SortOrder
    clienteId?: SortOrder
    direccionId?: SortOrder
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    recibidoEn?: SortOrder
    procesadoEn?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    agenteId?: SortOrderInput | SortOrder
    intentosPago?: SortOrder
    motivoRechazo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cliente?: ClientOrderByWithRelationInput
    direccionEnvio?: AddressOrderByWithRelationInput
    items?: ItemOrderByRelationAggregateInput
    stockReservations?: StockReservationOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idCanal?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    tipoCanal?: EnumOrderChannelFilter<"Order"> | $Enums.OrderChannel
    clienteId?: StringFilter<"Order"> | string
    direccionId?: StringFilter<"Order"> | string
    subtotal?: FloatFilter<"Order"> | number
    impuestos?: FloatFilter<"Order"> | number
    total?: FloatFilter<"Order"> | number
    estado?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFilter<"Order"> | $Enums.OrderPriority
    recibidoEn?: DateTimeFilter<"Order"> | Date | string
    procesadoEn?: DateTimeNullableFilter<"Order"> | Date | string | null
    notas?: StringNullableFilter<"Order"> | string | null
    agenteId?: StringNullableFilter<"Order"> | string | null
    intentosPago?: IntFilter<"Order"> | number
    motivoRechazo?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    cliente?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    direccionEnvio?: XOR<AddressScalarRelationFilter, AddressWhereInput>
    items?: ItemListRelationFilter
    stockReservations?: StockReservationListRelationFilter
  }, "id" | "idCanal">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    idCanal?: SortOrder
    tipoCanal?: SortOrder
    clienteId?: SortOrder
    direccionId?: SortOrder
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    recibidoEn?: SortOrder
    procesadoEn?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    agenteId?: SortOrderInput | SortOrder
    intentosPago?: SortOrder
    motivoRechazo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    idCanal?: StringWithAggregatesFilter<"Order"> | string
    tipoCanal?: EnumOrderChannelWithAggregatesFilter<"Order"> | $Enums.OrderChannel
    clienteId?: StringWithAggregatesFilter<"Order"> | string
    direccionId?: StringWithAggregatesFilter<"Order"> | string
    subtotal?: FloatWithAggregatesFilter<"Order"> | number
    impuestos?: FloatWithAggregatesFilter<"Order"> | number
    total?: FloatWithAggregatesFilter<"Order"> | number
    estado?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityWithAggregatesFilter<"Order"> | $Enums.OrderPriority
    recibidoEn?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    procesadoEn?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    notas?: StringNullableWithAggregatesFilter<"Order"> | string | null
    agenteId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    intentosPago?: IntWithAggregatesFilter<"Order"> | number
    motivoRechazo?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type ItemWhereInput = {
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    id?: StringFilter<"Item"> | string
    orderId?: StringFilter<"Item"> | string
    sku?: StringFilter<"Item"> | string
    cantidad?: IntFilter<"Item"> | number
    precioUnitario?: FloatFilter<"Item"> | number
    descuento?: FloatFilter<"Item"> | number
    subtotal?: FloatFilter<"Item"> | number
    createdAt?: DateTimeFilter<"Item"> | Date | string
    updatedAt?: DateTimeFilter<"Item"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type ItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    sku?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    subtotal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type ItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    orderId?: StringFilter<"Item"> | string
    sku?: StringFilter<"Item"> | string
    cantidad?: IntFilter<"Item"> | number
    precioUnitario?: FloatFilter<"Item"> | number
    descuento?: FloatFilter<"Item"> | number
    subtotal?: FloatFilter<"Item"> | number
    createdAt?: DateTimeFilter<"Item"> | Date | string
    updatedAt?: DateTimeFilter<"Item"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type ItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    sku?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    subtotal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ItemCountOrderByAggregateInput
    _avg?: ItemAvgOrderByAggregateInput
    _max?: ItemMaxOrderByAggregateInput
    _min?: ItemMinOrderByAggregateInput
    _sum?: ItemSumOrderByAggregateInput
  }

  export type ItemScalarWhereWithAggregatesInput = {
    AND?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    OR?: ItemScalarWhereWithAggregatesInput[]
    NOT?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Item"> | string
    orderId?: StringWithAggregatesFilter<"Item"> | string
    sku?: StringWithAggregatesFilter<"Item"> | string
    cantidad?: IntWithAggregatesFilter<"Item"> | number
    precioUnitario?: FloatWithAggregatesFilter<"Item"> | number
    descuento?: FloatWithAggregatesFilter<"Item"> | number
    subtotal?: FloatWithAggregatesFilter<"Item"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Item"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Item"> | Date | string
  }

  export type StockReservationWhereInput = {
    AND?: StockReservationWhereInput | StockReservationWhereInput[]
    OR?: StockReservationWhereInput[]
    NOT?: StockReservationWhereInput | StockReservationWhereInput[]
    id?: StringFilter<"StockReservation"> | string
    orderId?: StringFilter<"StockReservation"> | string
    sku?: StringFilter<"StockReservation"> | string
    cantidad?: IntFilter<"StockReservation"> | number
    reservaId?: StringFilter<"StockReservation"> | string
    createdAt?: DateTimeFilter<"StockReservation"> | Date | string
    updatedAt?: DateTimeFilter<"StockReservation"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type StockReservationOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    sku?: SortOrder
    cantidad?: SortOrder
    reservaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type StockReservationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StockReservationWhereInput | StockReservationWhereInput[]
    OR?: StockReservationWhereInput[]
    NOT?: StockReservationWhereInput | StockReservationWhereInput[]
    orderId?: StringFilter<"StockReservation"> | string
    sku?: StringFilter<"StockReservation"> | string
    cantidad?: IntFilter<"StockReservation"> | number
    reservaId?: StringFilter<"StockReservation"> | string
    createdAt?: DateTimeFilter<"StockReservation"> | Date | string
    updatedAt?: DateTimeFilter<"StockReservation"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type StockReservationOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    sku?: SortOrder
    cantidad?: SortOrder
    reservaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StockReservationCountOrderByAggregateInput
    _avg?: StockReservationAvgOrderByAggregateInput
    _max?: StockReservationMaxOrderByAggregateInput
    _min?: StockReservationMinOrderByAggregateInput
    _sum?: StockReservationSumOrderByAggregateInput
  }

  export type StockReservationScalarWhereWithAggregatesInput = {
    AND?: StockReservationScalarWhereWithAggregatesInput | StockReservationScalarWhereWithAggregatesInput[]
    OR?: StockReservationScalarWhereWithAggregatesInput[]
    NOT?: StockReservationScalarWhereWithAggregatesInput | StockReservationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StockReservation"> | string
    orderId?: StringWithAggregatesFilter<"StockReservation"> | string
    sku?: StringWithAggregatesFilter<"StockReservation"> | string
    cantidad?: IntWithAggregatesFilter<"StockReservation"> | number
    reservaId?: StringWithAggregatesFilter<"StockReservation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"StockReservation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StockReservation"> | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    nombre: string
    email: string
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutClienteInput
    addresses?: AddressCreateNestedManyWithoutClienteInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    nombre: string
    email: string
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutClienteInput
    addresses?: AddressUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutClienteNestedInput
    addresses?: AddressUpdateManyWithoutClienteNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutClienteNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    nombre: string
    email: string
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressCreateInput = {
    id?: string
    calle: string
    numero: string
    ciudad: string
    region?: string | null
    codigoPostal?: string | null
    pais?: string
    notasAdicionales?: string | null
    esDirectionPrincipal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClientCreateNestedOneWithoutAddressesInput
    ordenes?: OrderCreateNestedManyWithoutDireccionEnvioInput
  }

  export type AddressUncheckedCreateInput = {
    id?: string
    clientId: string
    calle: string
    numero: string
    ciudad: string
    region?: string | null
    codigoPostal?: string | null
    pais?: string
    notasAdicionales?: string | null
    esDirectionPrincipal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ordenes?: OrderUncheckedCreateNestedManyWithoutDireccionEnvioInput
  }

  export type AddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    codigoPostal?: NullableStringFieldUpdateOperationsInput | string | null
    pais?: StringFieldUpdateOperationsInput | string
    notasAdicionales?: NullableStringFieldUpdateOperationsInput | string | null
    esDirectionPrincipal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClientUpdateOneRequiredWithoutAddressesNestedInput
    ordenes?: OrderUpdateManyWithoutDireccionEnvioNestedInput
  }

  export type AddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    codigoPostal?: NullableStringFieldUpdateOperationsInput | string | null
    pais?: StringFieldUpdateOperationsInput | string
    notasAdicionales?: NullableStringFieldUpdateOperationsInput | string | null
    esDirectionPrincipal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ordenes?: OrderUncheckedUpdateManyWithoutDireccionEnvioNestedInput
  }

  export type AddressCreateManyInput = {
    id?: string
    clientId: string
    calle: string
    numero: string
    ciudad: string
    region?: string | null
    codigoPostal?: string | null
    pais?: string
    notasAdicionales?: string | null
    esDirectionPrincipal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    codigoPostal?: NullableStringFieldUpdateOperationsInput | string | null
    pais?: StringFieldUpdateOperationsInput | string
    notasAdicionales?: NullableStringFieldUpdateOperationsInput | string | null
    esDirectionPrincipal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    codigoPostal?: NullableStringFieldUpdateOperationsInput | string | null
    pais?: StringFieldUpdateOperationsInput | string
    notasAdicionales?: NullableStringFieldUpdateOperationsInput | string | null
    esDirectionPrincipal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    subtotal: number
    impuestos: number
    total: number
    estado?: $Enums.OrderStatus
    prioridad?: $Enums.OrderPriority
    recibidoEn?: Date | string
    procesadoEn?: Date | string | null
    notas?: string | null
    agenteId?: string | null
    intentosPago?: number
    motivoRechazo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClientCreateNestedOneWithoutOrdersInput
    direccionEnvio: AddressCreateNestedOneWithoutOrdenesInput
    items?: ItemCreateNestedManyWithoutOrderInput
    stockReservations?: StockReservationCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    clienteId: string
    direccionId: string
    subtotal: number
    impuestos: number
    total: number
    estado?: $Enums.OrderStatus
    prioridad?: $Enums.OrderPriority
    recibidoEn?: Date | string
    procesadoEn?: Date | string | null
    notas?: string | null
    agenteId?: string | null
    intentosPago?: number
    motivoRechazo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemUncheckedCreateNestedManyWithoutOrderInput
    stockReservations?: StockReservationUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    direccionEnvio?: AddressUpdateOneRequiredWithoutOrdenesNestedInput
    items?: ItemUpdateManyWithoutOrderNestedInput
    stockReservations?: StockReservationUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    clienteId?: StringFieldUpdateOperationsInput | string
    direccionId?: StringFieldUpdateOperationsInput | string
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemUncheckedUpdateManyWithoutOrderNestedInput
    stockReservations?: StockReservationUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    clienteId: string
    direccionId: string
    subtotal: number
    impuestos: number
    total: number
    estado?: $Enums.OrderStatus
    prioridad?: $Enums.OrderPriority
    recibidoEn?: Date | string
    procesadoEn?: Date | string | null
    notas?: string | null
    agenteId?: string | null
    intentosPago?: number
    motivoRechazo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    clienteId?: StringFieldUpdateOperationsInput | string
    direccionId?: StringFieldUpdateOperationsInput | string
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemCreateInput = {
    id?: string
    sku: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    subtotal: number
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type ItemUncheckedCreateInput = {
    id?: string
    orderId: string
    sku: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    subtotal: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type ItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemCreateManyInput = {
    id?: string
    orderId: string
    sku: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    subtotal: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockReservationCreateInput = {
    id?: string
    sku: string
    cantidad: number
    reservaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutStockReservationsInput
  }

  export type StockReservationUncheckedCreateInput = {
    id?: string
    orderId: string
    sku: string
    cantidad: number
    reservaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockReservationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    reservaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutStockReservationsNestedInput
  }

  export type StockReservationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    reservaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockReservationCreateManyInput = {
    id?: string
    orderId: string
    sku: string
    cantidad: number
    reservaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockReservationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    reservaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockReservationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    reservaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type AddressListRelationFilter = {
    every?: AddressWhereInput
    some?: AddressWhereInput
    none?: AddressWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type AddressCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    ciudad?: SortOrder
    region?: SortOrder
    codigoPostal?: SortOrder
    pais?: SortOrder
    notasAdicionales?: SortOrder
    esDirectionPrincipal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    ciudad?: SortOrder
    region?: SortOrder
    codigoPostal?: SortOrder
    pais?: SortOrder
    notasAdicionales?: SortOrder
    esDirectionPrincipal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    ciudad?: SortOrder
    region?: SortOrder
    codigoPostal?: SortOrder
    pais?: SortOrder
    notasAdicionales?: SortOrder
    esDirectionPrincipal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumOrderChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderChannel | EnumOrderChannelFieldRefInput<$PrismaModel>
    in?: $Enums.OrderChannel[] | ListEnumOrderChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderChannel[] | ListEnumOrderChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderChannelFilter<$PrismaModel> | $Enums.OrderChannel
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type EnumOrderPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderPriority | EnumOrderPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderPriorityFilter<$PrismaModel> | $Enums.OrderPriority
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type AddressScalarRelationFilter = {
    is?: AddressWhereInput
    isNot?: AddressWhereInput
  }

  export type ItemListRelationFilter = {
    every?: ItemWhereInput
    some?: ItemWhereInput
    none?: ItemWhereInput
  }

  export type StockReservationListRelationFilter = {
    every?: StockReservationWhereInput
    some?: StockReservationWhereInput
    none?: StockReservationWhereInput
  }

  export type ItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StockReservationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    idCanal?: SortOrder
    tipoCanal?: SortOrder
    clienteId?: SortOrder
    direccionId?: SortOrder
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    recibidoEn?: SortOrder
    procesadoEn?: SortOrder
    notas?: SortOrder
    agenteId?: SortOrder
    intentosPago?: SortOrder
    motivoRechazo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
    intentosPago?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    idCanal?: SortOrder
    tipoCanal?: SortOrder
    clienteId?: SortOrder
    direccionId?: SortOrder
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    recibidoEn?: SortOrder
    procesadoEn?: SortOrder
    notas?: SortOrder
    agenteId?: SortOrder
    intentosPago?: SortOrder
    motivoRechazo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    idCanal?: SortOrder
    tipoCanal?: SortOrder
    clienteId?: SortOrder
    direccionId?: SortOrder
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
    estado?: SortOrder
    prioridad?: SortOrder
    recibidoEn?: SortOrder
    procesadoEn?: SortOrder
    notas?: SortOrder
    agenteId?: SortOrder
    intentosPago?: SortOrder
    motivoRechazo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    subtotal?: SortOrder
    impuestos?: SortOrder
    total?: SortOrder
    intentosPago?: SortOrder
  }

  export type EnumOrderChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderChannel | EnumOrderChannelFieldRefInput<$PrismaModel>
    in?: $Enums.OrderChannel[] | ListEnumOrderChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderChannel[] | ListEnumOrderChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderChannelWithAggregatesFilter<$PrismaModel> | $Enums.OrderChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderChannelFilter<$PrismaModel>
    _max?: NestedEnumOrderChannelFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type EnumOrderPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderPriority | EnumOrderPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderPriorityWithAggregatesFilter<$PrismaModel> | $Enums.OrderPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderPriorityFilter<$PrismaModel>
    _max?: NestedEnumOrderPriorityFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type ItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    sku?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    subtotal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemAvgOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    subtotal?: SortOrder
  }

  export type ItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    sku?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    subtotal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    sku?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    subtotal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemSumOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    subtotal?: SortOrder
  }

  export type StockReservationCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    sku?: SortOrder
    cantidad?: SortOrder
    reservaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockReservationAvgOrderByAggregateInput = {
    cantidad?: SortOrder
  }

  export type StockReservationMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    sku?: SortOrder
    cantidad?: SortOrder
    reservaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockReservationMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    sku?: SortOrder
    cantidad?: SortOrder
    reservaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockReservationSumOrderByAggregateInput = {
    cantidad?: SortOrder
  }

  export type OrderCreateNestedManyWithoutClienteInput = {
    create?: XOR<OrderCreateWithoutClienteInput, OrderUncheckedCreateWithoutClienteInput> | OrderCreateWithoutClienteInput[] | OrderUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClienteInput | OrderCreateOrConnectWithoutClienteInput[]
    createMany?: OrderCreateManyClienteInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type AddressCreateNestedManyWithoutClienteInput = {
    create?: XOR<AddressCreateWithoutClienteInput, AddressUncheckedCreateWithoutClienteInput> | AddressCreateWithoutClienteInput[] | AddressUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutClienteInput | AddressCreateOrConnectWithoutClienteInput[]
    createMany?: AddressCreateManyClienteInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<OrderCreateWithoutClienteInput, OrderUncheckedCreateWithoutClienteInput> | OrderCreateWithoutClienteInput[] | OrderUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClienteInput | OrderCreateOrConnectWithoutClienteInput[]
    createMany?: OrderCreateManyClienteInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<AddressCreateWithoutClienteInput, AddressUncheckedCreateWithoutClienteInput> | AddressCreateWithoutClienteInput[] | AddressUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutClienteInput | AddressCreateOrConnectWithoutClienteInput[]
    createMany?: AddressCreateManyClienteInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrderUpdateManyWithoutClienteNestedInput = {
    create?: XOR<OrderCreateWithoutClienteInput, OrderUncheckedCreateWithoutClienteInput> | OrderCreateWithoutClienteInput[] | OrderUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClienteInput | OrderCreateOrConnectWithoutClienteInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutClienteInput | OrderUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: OrderCreateManyClienteInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutClienteInput | OrderUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutClienteInput | OrderUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type AddressUpdateManyWithoutClienteNestedInput = {
    create?: XOR<AddressCreateWithoutClienteInput, AddressUncheckedCreateWithoutClienteInput> | AddressCreateWithoutClienteInput[] | AddressUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutClienteInput | AddressCreateOrConnectWithoutClienteInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutClienteInput | AddressUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: AddressCreateManyClienteInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutClienteInput | AddressUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutClienteInput | AddressUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<OrderCreateWithoutClienteInput, OrderUncheckedCreateWithoutClienteInput> | OrderCreateWithoutClienteInput[] | OrderUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClienteInput | OrderCreateOrConnectWithoutClienteInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutClienteInput | OrderUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: OrderCreateManyClienteInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutClienteInput | OrderUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutClienteInput | OrderUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<AddressCreateWithoutClienteInput, AddressUncheckedCreateWithoutClienteInput> | AddressCreateWithoutClienteInput[] | AddressUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutClienteInput | AddressCreateOrConnectWithoutClienteInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutClienteInput | AddressUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: AddressCreateManyClienteInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutClienteInput | AddressUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutClienteInput | AddressUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutAddressesInput = {
    create?: XOR<ClientCreateWithoutAddressesInput, ClientUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAddressesInput
    connect?: ClientWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutDireccionEnvioInput = {
    create?: XOR<OrderCreateWithoutDireccionEnvioInput, OrderUncheckedCreateWithoutDireccionEnvioInput> | OrderCreateWithoutDireccionEnvioInput[] | OrderUncheckedCreateWithoutDireccionEnvioInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDireccionEnvioInput | OrderCreateOrConnectWithoutDireccionEnvioInput[]
    createMany?: OrderCreateManyDireccionEnvioInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutDireccionEnvioInput = {
    create?: XOR<OrderCreateWithoutDireccionEnvioInput, OrderUncheckedCreateWithoutDireccionEnvioInput> | OrderCreateWithoutDireccionEnvioInput[] | OrderUncheckedCreateWithoutDireccionEnvioInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDireccionEnvioInput | OrderCreateOrConnectWithoutDireccionEnvioInput[]
    createMany?: OrderCreateManyDireccionEnvioInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ClientUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: XOR<ClientCreateWithoutAddressesInput, ClientUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAddressesInput
    upsert?: ClientUpsertWithoutAddressesInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutAddressesInput, ClientUpdateWithoutAddressesInput>, ClientUncheckedUpdateWithoutAddressesInput>
  }

  export type OrderUpdateManyWithoutDireccionEnvioNestedInput = {
    create?: XOR<OrderCreateWithoutDireccionEnvioInput, OrderUncheckedCreateWithoutDireccionEnvioInput> | OrderCreateWithoutDireccionEnvioInput[] | OrderUncheckedCreateWithoutDireccionEnvioInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDireccionEnvioInput | OrderCreateOrConnectWithoutDireccionEnvioInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutDireccionEnvioInput | OrderUpsertWithWhereUniqueWithoutDireccionEnvioInput[]
    createMany?: OrderCreateManyDireccionEnvioInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutDireccionEnvioInput | OrderUpdateWithWhereUniqueWithoutDireccionEnvioInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutDireccionEnvioInput | OrderUpdateManyWithWhereWithoutDireccionEnvioInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutDireccionEnvioNestedInput = {
    create?: XOR<OrderCreateWithoutDireccionEnvioInput, OrderUncheckedCreateWithoutDireccionEnvioInput> | OrderCreateWithoutDireccionEnvioInput[] | OrderUncheckedCreateWithoutDireccionEnvioInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDireccionEnvioInput | OrderCreateOrConnectWithoutDireccionEnvioInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutDireccionEnvioInput | OrderUpsertWithWhereUniqueWithoutDireccionEnvioInput[]
    createMany?: OrderCreateManyDireccionEnvioInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutDireccionEnvioInput | OrderUpdateWithWhereUniqueWithoutDireccionEnvioInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutDireccionEnvioInput | OrderUpdateManyWithWhereWithoutDireccionEnvioInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutOrdersInput = {
    create?: XOR<ClientCreateWithoutOrdersInput, ClientUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ClientCreateOrConnectWithoutOrdersInput
    connect?: ClientWhereUniqueInput
  }

  export type AddressCreateNestedOneWithoutOrdenesInput = {
    create?: XOR<AddressCreateWithoutOrdenesInput, AddressUncheckedCreateWithoutOrdenesInput>
    connectOrCreate?: AddressCreateOrConnectWithoutOrdenesInput
    connect?: AddressWhereUniqueInput
  }

  export type ItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<ItemCreateWithoutOrderInput, ItemUncheckedCreateWithoutOrderInput> | ItemCreateWithoutOrderInput[] | ItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutOrderInput | ItemCreateOrConnectWithoutOrderInput[]
    createMany?: ItemCreateManyOrderInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type StockReservationCreateNestedManyWithoutOrderInput = {
    create?: XOR<StockReservationCreateWithoutOrderInput, StockReservationUncheckedCreateWithoutOrderInput> | StockReservationCreateWithoutOrderInput[] | StockReservationUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: StockReservationCreateOrConnectWithoutOrderInput | StockReservationCreateOrConnectWithoutOrderInput[]
    createMany?: StockReservationCreateManyOrderInputEnvelope
    connect?: StockReservationWhereUniqueInput | StockReservationWhereUniqueInput[]
  }

  export type ItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<ItemCreateWithoutOrderInput, ItemUncheckedCreateWithoutOrderInput> | ItemCreateWithoutOrderInput[] | ItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutOrderInput | ItemCreateOrConnectWithoutOrderInput[]
    createMany?: ItemCreateManyOrderInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type StockReservationUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<StockReservationCreateWithoutOrderInput, StockReservationUncheckedCreateWithoutOrderInput> | StockReservationCreateWithoutOrderInput[] | StockReservationUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: StockReservationCreateOrConnectWithoutOrderInput | StockReservationCreateOrConnectWithoutOrderInput[]
    createMany?: StockReservationCreateManyOrderInputEnvelope
    connect?: StockReservationWhereUniqueInput | StockReservationWhereUniqueInput[]
  }

  export type EnumOrderChannelFieldUpdateOperationsInput = {
    set?: $Enums.OrderChannel
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type EnumOrderPriorityFieldUpdateOperationsInput = {
    set?: $Enums.OrderPriority
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClientUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<ClientCreateWithoutOrdersInput, ClientUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ClientCreateOrConnectWithoutOrdersInput
    upsert?: ClientUpsertWithoutOrdersInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutOrdersInput, ClientUpdateWithoutOrdersInput>, ClientUncheckedUpdateWithoutOrdersInput>
  }

  export type AddressUpdateOneRequiredWithoutOrdenesNestedInput = {
    create?: XOR<AddressCreateWithoutOrdenesInput, AddressUncheckedCreateWithoutOrdenesInput>
    connectOrCreate?: AddressCreateOrConnectWithoutOrdenesInput
    upsert?: AddressUpsertWithoutOrdenesInput
    connect?: AddressWhereUniqueInput
    update?: XOR<XOR<AddressUpdateToOneWithWhereWithoutOrdenesInput, AddressUpdateWithoutOrdenesInput>, AddressUncheckedUpdateWithoutOrdenesInput>
  }

  export type ItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<ItemCreateWithoutOrderInput, ItemUncheckedCreateWithoutOrderInput> | ItemCreateWithoutOrderInput[] | ItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutOrderInput | ItemCreateOrConnectWithoutOrderInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutOrderInput | ItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: ItemCreateManyOrderInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutOrderInput | ItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutOrderInput | ItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type StockReservationUpdateManyWithoutOrderNestedInput = {
    create?: XOR<StockReservationCreateWithoutOrderInput, StockReservationUncheckedCreateWithoutOrderInput> | StockReservationCreateWithoutOrderInput[] | StockReservationUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: StockReservationCreateOrConnectWithoutOrderInput | StockReservationCreateOrConnectWithoutOrderInput[]
    upsert?: StockReservationUpsertWithWhereUniqueWithoutOrderInput | StockReservationUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: StockReservationCreateManyOrderInputEnvelope
    set?: StockReservationWhereUniqueInput | StockReservationWhereUniqueInput[]
    disconnect?: StockReservationWhereUniqueInput | StockReservationWhereUniqueInput[]
    delete?: StockReservationWhereUniqueInput | StockReservationWhereUniqueInput[]
    connect?: StockReservationWhereUniqueInput | StockReservationWhereUniqueInput[]
    update?: StockReservationUpdateWithWhereUniqueWithoutOrderInput | StockReservationUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: StockReservationUpdateManyWithWhereWithoutOrderInput | StockReservationUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: StockReservationScalarWhereInput | StockReservationScalarWhereInput[]
  }

  export type ItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<ItemCreateWithoutOrderInput, ItemUncheckedCreateWithoutOrderInput> | ItemCreateWithoutOrderInput[] | ItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutOrderInput | ItemCreateOrConnectWithoutOrderInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutOrderInput | ItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: ItemCreateManyOrderInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutOrderInput | ItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutOrderInput | ItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type StockReservationUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<StockReservationCreateWithoutOrderInput, StockReservationUncheckedCreateWithoutOrderInput> | StockReservationCreateWithoutOrderInput[] | StockReservationUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: StockReservationCreateOrConnectWithoutOrderInput | StockReservationCreateOrConnectWithoutOrderInput[]
    upsert?: StockReservationUpsertWithWhereUniqueWithoutOrderInput | StockReservationUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: StockReservationCreateManyOrderInputEnvelope
    set?: StockReservationWhereUniqueInput | StockReservationWhereUniqueInput[]
    disconnect?: StockReservationWhereUniqueInput | StockReservationWhereUniqueInput[]
    delete?: StockReservationWhereUniqueInput | StockReservationWhereUniqueInput[]
    connect?: StockReservationWhereUniqueInput | StockReservationWhereUniqueInput[]
    update?: StockReservationUpdateWithWhereUniqueWithoutOrderInput | StockReservationUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: StockReservationUpdateManyWithWhereWithoutOrderInput | StockReservationUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: StockReservationScalarWhereInput | StockReservationScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderCreateNestedOneWithoutStockReservationsInput = {
    create?: XOR<OrderCreateWithoutStockReservationsInput, OrderUncheckedCreateWithoutStockReservationsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutStockReservationsInput
    connect?: OrderWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutStockReservationsNestedInput = {
    create?: XOR<OrderCreateWithoutStockReservationsInput, OrderUncheckedCreateWithoutStockReservationsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutStockReservationsInput
    upsert?: OrderUpsertWithoutStockReservationsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutStockReservationsInput, OrderUpdateWithoutStockReservationsInput>, OrderUncheckedUpdateWithoutStockReservationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumOrderChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderChannel | EnumOrderChannelFieldRefInput<$PrismaModel>
    in?: $Enums.OrderChannel[] | ListEnumOrderChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderChannel[] | ListEnumOrderChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderChannelFilter<$PrismaModel> | $Enums.OrderChannel
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumOrderPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderPriority | EnumOrderPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderPriorityFilter<$PrismaModel> | $Enums.OrderPriority
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumOrderChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderChannel | EnumOrderChannelFieldRefInput<$PrismaModel>
    in?: $Enums.OrderChannel[] | ListEnumOrderChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderChannel[] | ListEnumOrderChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderChannelWithAggregatesFilter<$PrismaModel> | $Enums.OrderChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderChannelFilter<$PrismaModel>
    _max?: NestedEnumOrderChannelFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedEnumOrderPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderPriority | EnumOrderPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderPriority[] | ListEnumOrderPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderPriorityWithAggregatesFilter<$PrismaModel> | $Enums.OrderPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderPriorityFilter<$PrismaModel>
    _max?: NestedEnumOrderPriorityFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type OrderCreateWithoutClienteInput = {
    id?: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    subtotal: number
    impuestos: number
    total: number
    estado?: $Enums.OrderStatus
    prioridad?: $Enums.OrderPriority
    recibidoEn?: Date | string
    procesadoEn?: Date | string | null
    notas?: string | null
    agenteId?: string | null
    intentosPago?: number
    motivoRechazo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    direccionEnvio: AddressCreateNestedOneWithoutOrdenesInput
    items?: ItemCreateNestedManyWithoutOrderInput
    stockReservations?: StockReservationCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutClienteInput = {
    id?: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    direccionId: string
    subtotal: number
    impuestos: number
    total: number
    estado?: $Enums.OrderStatus
    prioridad?: $Enums.OrderPriority
    recibidoEn?: Date | string
    procesadoEn?: Date | string | null
    notas?: string | null
    agenteId?: string | null
    intentosPago?: number
    motivoRechazo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemUncheckedCreateNestedManyWithoutOrderInput
    stockReservations?: StockReservationUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutClienteInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutClienteInput, OrderUncheckedCreateWithoutClienteInput>
  }

  export type OrderCreateManyClienteInputEnvelope = {
    data: OrderCreateManyClienteInput | OrderCreateManyClienteInput[]
    skipDuplicates?: boolean
  }

  export type AddressCreateWithoutClienteInput = {
    id?: string
    calle: string
    numero: string
    ciudad: string
    region?: string | null
    codigoPostal?: string | null
    pais?: string
    notasAdicionales?: string | null
    esDirectionPrincipal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ordenes?: OrderCreateNestedManyWithoutDireccionEnvioInput
  }

  export type AddressUncheckedCreateWithoutClienteInput = {
    id?: string
    calle: string
    numero: string
    ciudad: string
    region?: string | null
    codigoPostal?: string | null
    pais?: string
    notasAdicionales?: string | null
    esDirectionPrincipal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ordenes?: OrderUncheckedCreateNestedManyWithoutDireccionEnvioInput
  }

  export type AddressCreateOrConnectWithoutClienteInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutClienteInput, AddressUncheckedCreateWithoutClienteInput>
  }

  export type AddressCreateManyClienteInputEnvelope = {
    data: AddressCreateManyClienteInput | AddressCreateManyClienteInput[]
    skipDuplicates?: boolean
  }

  export type OrderUpsertWithWhereUniqueWithoutClienteInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutClienteInput, OrderUncheckedUpdateWithoutClienteInput>
    create: XOR<OrderCreateWithoutClienteInput, OrderUncheckedCreateWithoutClienteInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutClienteInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutClienteInput, OrderUncheckedUpdateWithoutClienteInput>
  }

  export type OrderUpdateManyWithWhereWithoutClienteInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutClienteInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    idCanal?: StringFilter<"Order"> | string
    tipoCanal?: EnumOrderChannelFilter<"Order"> | $Enums.OrderChannel
    clienteId?: StringFilter<"Order"> | string
    direccionId?: StringFilter<"Order"> | string
    subtotal?: FloatFilter<"Order"> | number
    impuestos?: FloatFilter<"Order"> | number
    total?: FloatFilter<"Order"> | number
    estado?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFilter<"Order"> | $Enums.OrderPriority
    recibidoEn?: DateTimeFilter<"Order"> | Date | string
    procesadoEn?: DateTimeNullableFilter<"Order"> | Date | string | null
    notas?: StringNullableFilter<"Order"> | string | null
    agenteId?: StringNullableFilter<"Order"> | string | null
    intentosPago?: IntFilter<"Order"> | number
    motivoRechazo?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type AddressUpsertWithWhereUniqueWithoutClienteInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutClienteInput, AddressUncheckedUpdateWithoutClienteInput>
    create: XOR<AddressCreateWithoutClienteInput, AddressUncheckedCreateWithoutClienteInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutClienteInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutClienteInput, AddressUncheckedUpdateWithoutClienteInput>
  }

  export type AddressUpdateManyWithWhereWithoutClienteInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutClienteInput>
  }

  export type AddressScalarWhereInput = {
    AND?: AddressScalarWhereInput | AddressScalarWhereInput[]
    OR?: AddressScalarWhereInput[]
    NOT?: AddressScalarWhereInput | AddressScalarWhereInput[]
    id?: StringFilter<"Address"> | string
    clientId?: StringFilter<"Address"> | string
    calle?: StringFilter<"Address"> | string
    numero?: StringFilter<"Address"> | string
    ciudad?: StringFilter<"Address"> | string
    region?: StringNullableFilter<"Address"> | string | null
    codigoPostal?: StringNullableFilter<"Address"> | string | null
    pais?: StringFilter<"Address"> | string
    notasAdicionales?: StringNullableFilter<"Address"> | string | null
    esDirectionPrincipal?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
  }

  export type ClientCreateWithoutAddressesInput = {
    id?: string
    nombre: string
    email: string
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutClienteInput
  }

  export type ClientUncheckedCreateWithoutAddressesInput = {
    id?: string
    nombre: string
    email: string
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClientCreateOrConnectWithoutAddressesInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutAddressesInput, ClientUncheckedCreateWithoutAddressesInput>
  }

  export type OrderCreateWithoutDireccionEnvioInput = {
    id?: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    subtotal: number
    impuestos: number
    total: number
    estado?: $Enums.OrderStatus
    prioridad?: $Enums.OrderPriority
    recibidoEn?: Date | string
    procesadoEn?: Date | string | null
    notas?: string | null
    agenteId?: string | null
    intentosPago?: number
    motivoRechazo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClientCreateNestedOneWithoutOrdersInput
    items?: ItemCreateNestedManyWithoutOrderInput
    stockReservations?: StockReservationCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutDireccionEnvioInput = {
    id?: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    clienteId: string
    subtotal: number
    impuestos: number
    total: number
    estado?: $Enums.OrderStatus
    prioridad?: $Enums.OrderPriority
    recibidoEn?: Date | string
    procesadoEn?: Date | string | null
    notas?: string | null
    agenteId?: string | null
    intentosPago?: number
    motivoRechazo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemUncheckedCreateNestedManyWithoutOrderInput
    stockReservations?: StockReservationUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutDireccionEnvioInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutDireccionEnvioInput, OrderUncheckedCreateWithoutDireccionEnvioInput>
  }

  export type OrderCreateManyDireccionEnvioInputEnvelope = {
    data: OrderCreateManyDireccionEnvioInput | OrderCreateManyDireccionEnvioInput[]
    skipDuplicates?: boolean
  }

  export type ClientUpsertWithoutAddressesInput = {
    update: XOR<ClientUpdateWithoutAddressesInput, ClientUncheckedUpdateWithoutAddressesInput>
    create: XOR<ClientCreateWithoutAddressesInput, ClientUncheckedCreateWithoutAddressesInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutAddressesInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutAddressesInput, ClientUncheckedUpdateWithoutAddressesInput>
  }

  export type ClientUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutClienteNestedInput
  }

  export type ClientUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutDireccionEnvioInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutDireccionEnvioInput, OrderUncheckedUpdateWithoutDireccionEnvioInput>
    create: XOR<OrderCreateWithoutDireccionEnvioInput, OrderUncheckedCreateWithoutDireccionEnvioInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutDireccionEnvioInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutDireccionEnvioInput, OrderUncheckedUpdateWithoutDireccionEnvioInput>
  }

  export type OrderUpdateManyWithWhereWithoutDireccionEnvioInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutDireccionEnvioInput>
  }

  export type ClientCreateWithoutOrdersInput = {
    id?: string
    nombre: string
    email: string
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    addresses?: AddressCreateNestedManyWithoutClienteInput
  }

  export type ClientUncheckedCreateWithoutOrdersInput = {
    id?: string
    nombre: string
    email: string
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    addresses?: AddressUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClientCreateOrConnectWithoutOrdersInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutOrdersInput, ClientUncheckedCreateWithoutOrdersInput>
  }

  export type AddressCreateWithoutOrdenesInput = {
    id?: string
    calle: string
    numero: string
    ciudad: string
    region?: string | null
    codigoPostal?: string | null
    pais?: string
    notasAdicionales?: string | null
    esDirectionPrincipal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClientCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateWithoutOrdenesInput = {
    id?: string
    clientId: string
    calle: string
    numero: string
    ciudad: string
    region?: string | null
    codigoPostal?: string | null
    pais?: string
    notasAdicionales?: string | null
    esDirectionPrincipal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressCreateOrConnectWithoutOrdenesInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutOrdenesInput, AddressUncheckedCreateWithoutOrdenesInput>
  }

  export type ItemCreateWithoutOrderInput = {
    id?: string
    sku: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    subtotal: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemUncheckedCreateWithoutOrderInput = {
    id?: string
    sku: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    subtotal: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemCreateOrConnectWithoutOrderInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutOrderInput, ItemUncheckedCreateWithoutOrderInput>
  }

  export type ItemCreateManyOrderInputEnvelope = {
    data: ItemCreateManyOrderInput | ItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type StockReservationCreateWithoutOrderInput = {
    id?: string
    sku: string
    cantidad: number
    reservaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockReservationUncheckedCreateWithoutOrderInput = {
    id?: string
    sku: string
    cantidad: number
    reservaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockReservationCreateOrConnectWithoutOrderInput = {
    where: StockReservationWhereUniqueInput
    create: XOR<StockReservationCreateWithoutOrderInput, StockReservationUncheckedCreateWithoutOrderInput>
  }

  export type StockReservationCreateManyOrderInputEnvelope = {
    data: StockReservationCreateManyOrderInput | StockReservationCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type ClientUpsertWithoutOrdersInput = {
    update: XOR<ClientUpdateWithoutOrdersInput, ClientUncheckedUpdateWithoutOrdersInput>
    create: XOR<ClientCreateWithoutOrdersInput, ClientUncheckedCreateWithoutOrdersInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutOrdersInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutOrdersInput, ClientUncheckedUpdateWithoutOrdersInput>
  }

  export type ClientUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: AddressUpdateManyWithoutClienteNestedInput
  }

  export type ClientUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: AddressUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type AddressUpsertWithoutOrdenesInput = {
    update: XOR<AddressUpdateWithoutOrdenesInput, AddressUncheckedUpdateWithoutOrdenesInput>
    create: XOR<AddressCreateWithoutOrdenesInput, AddressUncheckedCreateWithoutOrdenesInput>
    where?: AddressWhereInput
  }

  export type AddressUpdateToOneWithWhereWithoutOrdenesInput = {
    where?: AddressWhereInput
    data: XOR<AddressUpdateWithoutOrdenesInput, AddressUncheckedUpdateWithoutOrdenesInput>
  }

  export type AddressUpdateWithoutOrdenesInput = {
    id?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    codigoPostal?: NullableStringFieldUpdateOperationsInput | string | null
    pais?: StringFieldUpdateOperationsInput | string
    notasAdicionales?: NullableStringFieldUpdateOperationsInput | string | null
    esDirectionPrincipal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClientUpdateOneRequiredWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateWithoutOrdenesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    codigoPostal?: NullableStringFieldUpdateOperationsInput | string | null
    pais?: StringFieldUpdateOperationsInput | string
    notasAdicionales?: NullableStringFieldUpdateOperationsInput | string | null
    esDirectionPrincipal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutOrderInput, ItemUncheckedUpdateWithoutOrderInput>
    create: XOR<ItemCreateWithoutOrderInput, ItemUncheckedCreateWithoutOrderInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutOrderInput, ItemUncheckedUpdateWithoutOrderInput>
  }

  export type ItemUpdateManyWithWhereWithoutOrderInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type ItemScalarWhereInput = {
    AND?: ItemScalarWhereInput | ItemScalarWhereInput[]
    OR?: ItemScalarWhereInput[]
    NOT?: ItemScalarWhereInput | ItemScalarWhereInput[]
    id?: StringFilter<"Item"> | string
    orderId?: StringFilter<"Item"> | string
    sku?: StringFilter<"Item"> | string
    cantidad?: IntFilter<"Item"> | number
    precioUnitario?: FloatFilter<"Item"> | number
    descuento?: FloatFilter<"Item"> | number
    subtotal?: FloatFilter<"Item"> | number
    createdAt?: DateTimeFilter<"Item"> | Date | string
    updatedAt?: DateTimeFilter<"Item"> | Date | string
  }

  export type StockReservationUpsertWithWhereUniqueWithoutOrderInput = {
    where: StockReservationWhereUniqueInput
    update: XOR<StockReservationUpdateWithoutOrderInput, StockReservationUncheckedUpdateWithoutOrderInput>
    create: XOR<StockReservationCreateWithoutOrderInput, StockReservationUncheckedCreateWithoutOrderInput>
  }

  export type StockReservationUpdateWithWhereUniqueWithoutOrderInput = {
    where: StockReservationWhereUniqueInput
    data: XOR<StockReservationUpdateWithoutOrderInput, StockReservationUncheckedUpdateWithoutOrderInput>
  }

  export type StockReservationUpdateManyWithWhereWithoutOrderInput = {
    where: StockReservationScalarWhereInput
    data: XOR<StockReservationUpdateManyMutationInput, StockReservationUncheckedUpdateManyWithoutOrderInput>
  }

  export type StockReservationScalarWhereInput = {
    AND?: StockReservationScalarWhereInput | StockReservationScalarWhereInput[]
    OR?: StockReservationScalarWhereInput[]
    NOT?: StockReservationScalarWhereInput | StockReservationScalarWhereInput[]
    id?: StringFilter<"StockReservation"> | string
    orderId?: StringFilter<"StockReservation"> | string
    sku?: StringFilter<"StockReservation"> | string
    cantidad?: IntFilter<"StockReservation"> | number
    reservaId?: StringFilter<"StockReservation"> | string
    createdAt?: DateTimeFilter<"StockReservation"> | Date | string
    updatedAt?: DateTimeFilter<"StockReservation"> | Date | string
  }

  export type OrderCreateWithoutItemsInput = {
    id?: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    subtotal: number
    impuestos: number
    total: number
    estado?: $Enums.OrderStatus
    prioridad?: $Enums.OrderPriority
    recibidoEn?: Date | string
    procesadoEn?: Date | string | null
    notas?: string | null
    agenteId?: string | null
    intentosPago?: number
    motivoRechazo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClientCreateNestedOneWithoutOrdersInput
    direccionEnvio: AddressCreateNestedOneWithoutOrdenesInput
    stockReservations?: StockReservationCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    clienteId: string
    direccionId: string
    subtotal: number
    impuestos: number
    total: number
    estado?: $Enums.OrderStatus
    prioridad?: $Enums.OrderPriority
    recibidoEn?: Date | string
    procesadoEn?: Date | string | null
    notas?: string | null
    agenteId?: string | null
    intentosPago?: number
    motivoRechazo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stockReservations?: StockReservationUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    direccionEnvio?: AddressUpdateOneRequiredWithoutOrdenesNestedInput
    stockReservations?: StockReservationUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    clienteId?: StringFieldUpdateOperationsInput | string
    direccionId?: StringFieldUpdateOperationsInput | string
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stockReservations?: StockReservationUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateWithoutStockReservationsInput = {
    id?: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    subtotal: number
    impuestos: number
    total: number
    estado?: $Enums.OrderStatus
    prioridad?: $Enums.OrderPriority
    recibidoEn?: Date | string
    procesadoEn?: Date | string | null
    notas?: string | null
    agenteId?: string | null
    intentosPago?: number
    motivoRechazo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClientCreateNestedOneWithoutOrdersInput
    direccionEnvio: AddressCreateNestedOneWithoutOrdenesInput
    items?: ItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutStockReservationsInput = {
    id?: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    clienteId: string
    direccionId: string
    subtotal: number
    impuestos: number
    total: number
    estado?: $Enums.OrderStatus
    prioridad?: $Enums.OrderPriority
    recibidoEn?: Date | string
    procesadoEn?: Date | string | null
    notas?: string | null
    agenteId?: string | null
    intentosPago?: number
    motivoRechazo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutStockReservationsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutStockReservationsInput, OrderUncheckedCreateWithoutStockReservationsInput>
  }

  export type OrderUpsertWithoutStockReservationsInput = {
    update: XOR<OrderUpdateWithoutStockReservationsInput, OrderUncheckedUpdateWithoutStockReservationsInput>
    create: XOR<OrderCreateWithoutStockReservationsInput, OrderUncheckedCreateWithoutStockReservationsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutStockReservationsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutStockReservationsInput, OrderUncheckedUpdateWithoutStockReservationsInput>
  }

  export type OrderUpdateWithoutStockReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    direccionEnvio?: AddressUpdateOneRequiredWithoutOrdenesNestedInput
    items?: ItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutStockReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    clienteId?: StringFieldUpdateOperationsInput | string
    direccionId?: StringFieldUpdateOperationsInput | string
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyClienteInput = {
    id?: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    direccionId: string
    subtotal: number
    impuestos: number
    total: number
    estado?: $Enums.OrderStatus
    prioridad?: $Enums.OrderPriority
    recibidoEn?: Date | string
    procesadoEn?: Date | string | null
    notas?: string | null
    agenteId?: string | null
    intentosPago?: number
    motivoRechazo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressCreateManyClienteInput = {
    id?: string
    calle: string
    numero: string
    ciudad: string
    region?: string | null
    codigoPostal?: string | null
    pais?: string
    notasAdicionales?: string | null
    esDirectionPrincipal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    direccionEnvio?: AddressUpdateOneRequiredWithoutOrdenesNestedInput
    items?: ItemUpdateManyWithoutOrderNestedInput
    stockReservations?: StockReservationUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    direccionId?: StringFieldUpdateOperationsInput | string
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemUncheckedUpdateManyWithoutOrderNestedInput
    stockReservations?: StockReservationUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    direccionId?: StringFieldUpdateOperationsInput | string
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    codigoPostal?: NullableStringFieldUpdateOperationsInput | string | null
    pais?: StringFieldUpdateOperationsInput | string
    notasAdicionales?: NullableStringFieldUpdateOperationsInput | string | null
    esDirectionPrincipal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ordenes?: OrderUpdateManyWithoutDireccionEnvioNestedInput
  }

  export type AddressUncheckedUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    codigoPostal?: NullableStringFieldUpdateOperationsInput | string | null
    pais?: StringFieldUpdateOperationsInput | string
    notasAdicionales?: NullableStringFieldUpdateOperationsInput | string | null
    esDirectionPrincipal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ordenes?: OrderUncheckedUpdateManyWithoutDireccionEnvioNestedInput
  }

  export type AddressUncheckedUpdateManyWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    ciudad?: StringFieldUpdateOperationsInput | string
    region?: NullableStringFieldUpdateOperationsInput | string | null
    codigoPostal?: NullableStringFieldUpdateOperationsInput | string | null
    pais?: StringFieldUpdateOperationsInput | string
    notasAdicionales?: NullableStringFieldUpdateOperationsInput | string | null
    esDirectionPrincipal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyDireccionEnvioInput = {
    id?: string
    idCanal: string
    tipoCanal: $Enums.OrderChannel
    clienteId: string
    subtotal: number
    impuestos: number
    total: number
    estado?: $Enums.OrderStatus
    prioridad?: $Enums.OrderPriority
    recibidoEn?: Date | string
    procesadoEn?: Date | string | null
    notas?: string | null
    agenteId?: string | null
    intentosPago?: number
    motivoRechazo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateWithoutDireccionEnvioInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    items?: ItemUpdateManyWithoutOrderNestedInput
    stockReservations?: StockReservationUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutDireccionEnvioInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    clienteId?: StringFieldUpdateOperationsInput | string
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemUncheckedUpdateManyWithoutOrderNestedInput
    stockReservations?: StockReservationUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutDireccionEnvioInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCanal?: StringFieldUpdateOperationsInput | string
    tipoCanal?: EnumOrderChannelFieldUpdateOperationsInput | $Enums.OrderChannel
    clienteId?: StringFieldUpdateOperationsInput | string
    subtotal?: FloatFieldUpdateOperationsInput | number
    impuestos?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    estado?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    prioridad?: EnumOrderPriorityFieldUpdateOperationsInput | $Enums.OrderPriority
    recibidoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    procesadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    agenteId?: NullableStringFieldUpdateOperationsInput | string | null
    intentosPago?: IntFieldUpdateOperationsInput | number
    motivoRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemCreateManyOrderInput = {
    id?: string
    sku: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    subtotal: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockReservationCreateManyOrderInput = {
    id?: string
    sku: string
    cantidad: number
    reservaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    subtotal?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockReservationUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    reservaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockReservationUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    reservaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockReservationUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    reservaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}