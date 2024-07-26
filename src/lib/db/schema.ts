import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, PgTimestampBuilderInitial, serial, text, timestamp } from "drizzle-orm/pg-core";

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


export const UserRoles = pgEnum("userRoles", ["admin", "user", "instructor"]);
export const UserTypes = pgEnum("userTypes", ["school", "exam"]);

export const userTable = pgTable("user", {
    id: text("id").primaryKey().notNull(),
    firstname: text("firstname").notNull(),
    lastname: text("lastname").notNull(),
    email: text("email").unique().notNull(),
    phone: text("phone").unique().notNull(),
    parentPhone: text("parentPhone").unique(),
    region: text("region").notNull(),
    governorate: text("governorate").notNull(),
    year: text("year"),
    exam: text("exam"),
    picture: text("picture").default('default.jpg').notNull(),
    password: text("password").notNull(),
    type: UserTypes("type").notNull(),
    ...timestamps(),
});

export const userRolesTable = pgTable("userRoles", {
    id: serial("id").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    role: UserRoles("role").notNull(),
    ...timestamps(),
});

export const instructorTable = pgTable("instructor", {
    id: serial("id").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    bio: text("bio").notNull(),
    qualifications: text("qualifications").notNull(),
    experience: integer("experience").notNull(),
    specialization: text("specialization").notNull(),
    photo: text("photo").default('default.jpg').notNull(),
    contactInfo: text("contactInfo"),
    officeLocation: text("officeLocation"),
    ...timestamps(),
});

export const regionTable = pgTable('region', {
    id: serial('id').primaryKey(),
    region: text('region').notNull(),
    ...timestamps(),

})

export const governorateTable = pgTable('governorate', {
    id: serial('id').primaryKey(),
    governorate: text('governorate').notNull(),
    regionId: integer('regionId').references(() => regionTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull()
})

export const yearTable = pgTable('year', {
    id: serial('id').primaryKey(),
    year: text('year').notNull(),
    regionId: integer('regionId').references(() => regionTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull()
})

export const examTable = pgTable("exam", {
    id: serial("id").primaryKey(),
    exam: text("exam").notNull(),
    ...timestamps(),
});

// export const CourseContexts = pgEnum("courseContexts", ["school", "exam"]);

// export const courseTable = pgTable("course", {
//     id: serial("id").primaryKey(),
//     title: text("title").notNull(),
//     description: text("description").notNull(),
//     instructorId: integer("instructorId").references(() => instructorTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
//     duration: text("duration").notNull(),
//     startDate: timestamp("startDate", { withTimezone: true, mode: "date" }).notNull(),
//     endDate: timestamp("endDate", { withTimezone: true, mode: "date" }).notNull(),
//     credits: integer("credits").notNull(),
//     prerequisites: text("prerequisites"),
//     enrollmentLimit: integer("enrollmentLimit"),
//     category: text("category").notNull(),
//     regionId: integer("regionId").references(() => regionTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
//     yearId: integer("yearId").references(() => yearTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
//     examId: integer("examId").references(() => examTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
//     context: CourseContexts("context").notNull(),
//     ...timestamps(),
// });

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

export const userRelations = relations(userTable, ({ many }) => ({
    roles: many(userRolesTable),
}));

export const userRolesRelations = relations(userRolesTable, ({ one }) => ({
    user: one(userTable, {
        fields: [userRolesTable.userId],
        references: [userTable.id],
    })
}));

export const instructorRelations = relations(instructorTable, ({ one, many }) => ({
    user: one(userTable, {
        fields: [instructorTable.userId],
        references: [userTable.id],
    }),
    // courses: one(courseTable, {
    //     fields: [instructorTable.id],
    //     references: [courseTable.instructorId],
    // }),
}));

export const regionRalations = relations(regionTable, ({ one, many }) => ({
    governorates: many(governorateTable),
    years: many(yearTable)
}))

export const governorateRelations = relations(governorateTable, ({ one, many }) => ({
    region: one(regionTable, {
        fields: [governorateTable.regionId],
        references: [regionTable.id]
    }),
}));

export const yearRelations = relations(yearTable, ({ one, many }) => ({
    region: one(regionTable, {
        fields: [yearTable.regionId],
        references: [regionTable.id]
    })
}))

// export const courseRelations = relations(courseTable, ({ one }) => ({
//     region: one(regionTable, {
//         fields: [courseTable.regionId],
//         references: [regionTable.id]
//     }),
//     year: one(yearTable, {
//         fields: [courseTable.yearId],
//         references: [yearTable.id]
//     }),
//     exam: one(examTable, {
//         fields: [courseTable.examId],
//         references: [examTable.id]
//     })
// }))