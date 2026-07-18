import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
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
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly MealCategory: "MealCategory";
    readonly Meal: "Meal";
    readonly User: "User";
    readonly Session: "Session";
    readonly Account: "Account";
    readonly Verification: "Verification";
    readonly ProviderProfile: "ProviderProfile";
    readonly providerApplication: "providerApplication";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
    readonly Review: "Review";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const MealCategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type MealCategoryScalarFieldEnum = (typeof MealCategoryScalarFieldEnum)[keyof typeof MealCategoryScalarFieldEnum];
export declare const MealScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly image: "image";
    readonly description: "description";
    readonly price: "price";
    readonly cuisine: "cuisine";
    readonly dietary: "dietary";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly providerId: "providerId";
    readonly categoryId: "categoryId";
};
export type MealScalarFieldEnum = (typeof MealScalarFieldEnum)[keyof typeof MealScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly emailVerified: "emailVerified";
    readonly image: "image";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly phone: "phone";
    readonly status: "status";
    readonly role: "role";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly expiresAt: "expiresAt";
    readonly token: "token";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly userId: "userId";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: "id";
    readonly accountId: "accountId";
    readonly providerId: "providerId";
    readonly userId: "userId";
    readonly accessToken: "accessToken";
    readonly refreshToken: "refreshToken";
    readonly idToken: "idToken";
    readonly accessTokenExpiresAt: "accessTokenExpiresAt";
    readonly refreshTokenExpiresAt: "refreshTokenExpiresAt";
    readonly scope: "scope";
    readonly password: "password";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const VerificationScalarFieldEnum: {
    readonly id: "id";
    readonly identifier: "identifier";
    readonly value: "value";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum];
export declare const ProviderProfileScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly businessName: "businessName";
    readonly phone: "phone";
    readonly address: "address";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProviderProfileScalarFieldEnum = (typeof ProviderProfileScalarFieldEnum)[keyof typeof ProviderProfileScalarFieldEnum];
export declare const ProviderApplicationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly businessName: "businessName";
    readonly phone: "phone";
    readonly address: "address";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProviderApplicationScalarFieldEnum = (typeof ProviderApplicationScalarFieldEnum)[keyof typeof ProviderApplicationScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly totalPrice: "totalPrice";
    readonly address: "address";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly mealId: "mealId";
    readonly quantity: "quantity";
    readonly price: "price";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly rating: "rating";
    readonly comment: "comment";
    readonly userId: "userId";
    readonly orderId: "orderId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly mealId: "mealId";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map