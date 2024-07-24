import { relations } from "drizzle-orm";
import { pgEnum, pgTable, PgTimestampBuilderInitial, serial, text, timestamp } from "drizzle-orm/pg-core";

export const timestamps = (): {
    createdAt: PgTimestampBuilderInitial<"createdAt">;
    updatedAt: PgTimestampBuilderInitial<"updatedAt">;
} => ({
    createdAt: timestamp("createdAt", {
        withTimezone: true,
        mode: "date",
    }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {
        withTimezone: true,
        mode: "date",
    }).defaultNow().notNull(),
});


export const UserRoles = pgEnum("userRoles", ["admin", "user"]);

export const userTable = pgTable("user", {
    id: text("id").primaryKey().unique().notNull(),
    firstname: text("firstname").notNull(),
    lastname: text("lastname").notNull(),
    email: text("email").unique().notNull(),
    governorate: text("governorate").notNull(),
    phone: text("phone").unique().notNull(),
    parentPhone: text("parentPhone").unique().notNull(),
    picture: text("picture").default('default.jpg').notNull(),
    password: text("password").notNull(),
    role: UserRoles("role").default("user"),
    ...timestamps(),
});

export const sessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});

// relations