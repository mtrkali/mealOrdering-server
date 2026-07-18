export declare const Role: {
    readonly CUSTOMER: "CUSTOMER";
    readonly PROVIDER: "PROVIDER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const OrderStatus: {
    readonly PLACED: "PLACED";
    readonly PREPARING: "PREPARING";
    readonly READY: "READY";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly BANNED: "BANNED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const Cuisine: {
    readonly BANGLADESHI: "BANGLADESHI";
    readonly INDIAN: "INDIAN";
    readonly CHINESE: "CHINESE";
    readonly ITALIAN: "ITALIAN";
    readonly MEXICAN: "MEXICAN";
    readonly THAI: "THAI";
    readonly JAPANESE: "JAPANESE";
};
export type Cuisine = (typeof Cuisine)[keyof typeof Cuisine];
export declare const ProviderApplicationStatus: {
    readonly PENDING: "PENDING";
    readonly REJECTED: "REJECTED";
    readonly APPROVED: "APPROVED";
};
export type ProviderApplicationStatus = (typeof ProviderApplicationStatus)[keyof typeof ProviderApplicationStatus];
export declare const DietaryPreference: {
    readonly HALAL: "HALAL";
    readonly VEGAN: "VEGAN";
    readonly VEGETARIAN: "VEGETARIAN";
    readonly GLUTEN_FREE: "GLUTEN_FREE";
    readonly DAIRY_FREE: "DAIRY_FREE";
    readonly KETO: "KETO";
};
export type DietaryPreference = (typeof DietaryPreference)[keyof typeof DietaryPreference];
export declare const ProviderProfileStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
};
export type ProviderProfileStatus = (typeof ProviderProfileStatus)[keyof typeof ProviderProfileStatus];
//# sourceMappingURL=enums.d.ts.map