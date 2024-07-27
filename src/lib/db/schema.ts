import { relations } from "drizzle-orm";
import { decimal, integer, pgEnum, pgTable, PgTimestampBuilderInitial, serial, text, timestamp } from "drizzle-orm/pg-core";

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

export const userTable = pgTable("user", {
    id: text("id").primaryKey().notNull(),
    firstname: text("firstname").notNull(),
    lastname: text("lastname").notNull(),
    email: text("email").unique().notNull(),
    phone: text("phone").unique().notNull(),
    region: text("region").notNull(),
    governorate: text("governorate").notNull(),
    password: text("password").notNull(),
    picture: text("picture").default('default.jpg').notNull(),
    ...timestamps(),
});

export const roleTable = pgTable("role", {
    id: serial("id").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    role: UserRoles("role").default("user").notNull(),
    ...timestamps(),
});


export const StudentContexts = pgEnum("studentContexts", ["school", "englishExam"]);

export const studentTable = pgTable("student", {
    id: serial("id").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    year: text("year"),
    englishExam: text("englishExam"),
    parentPhone: text("parentPhone").unique(),
    context: StudentContexts("context").notNull(),
    ...timestamps(),
});

export const instructorTable = pgTable("instructor", {
    id: serial("id").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    bio: text("bio").notNull(),
    specialty: text("specialty").notNull(),
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

export const SubjectContexts = pgEnum('subjectContexts', ['school', 'englishExam'])

export const subjectTable = pgTable("subject", {
    id: serial("id").primaryKey(),
    subject: text("subject").notNull(),
    context: SubjectContexts("context").notNull(),
    regionId: integer('regionId').references(() => regionTable.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    ...timestamps(),
});



export const CourseContexts = pgEnum("courseContexts", ["school", "englishExam"]);
export const CourseStatus = pgEnum("courseStatus", ["published", "unpublished", 'scheduled']);

export const courseTable = pgTable("course", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    instructorId: integer("instructorId").references(() => instructorTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    currency: text("currency").notNull(),
    enrolledStudents: integer('enrolledStudents').default(0).notNull(),
    thumbnail: text("thumbnail").notNull(),
    regionId: integer("regionId").references(() => regionTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    yearId: integer("yearId").references(() => yearTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    subjectId: integer("examId").references(() => subjectTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    context: CourseContexts("context").notNull(),
    status: CourseStatus('status').default('published').notNull(),
    releasedAt: timestamp('releasedAt', { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    scheduledPublishDate: timestamp("scheduledPublishDate", { withTimezone: true, mode: "date" }),
    scheduledUnpublishDate: timestamp("scheduledUnpublishDate", { withTimezone: true, mode: "date" }),
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

export const roleRelations = relations(roleTable, ({ one }) => ({
    user: one(userTable, {
        fields: [roleTable.userId],
        references: [userTable.id],
    })
}));

export const userRelations = relations(userTable, ({ one, many }) => ({
    roles: many(roleTable),
    instructor: one(instructorTable, {
        fields: [userTable.id],
        references: [instructorTable.userId],
    }),
    student: one(studentTable, {
        fields: [userTable.id],
        references: [studentTable.userId],
    }),
}));

export const instructorRelations = relations(instructorTable, ({ one, many }) => ({
    user: one(userTable, {
        fields: [instructorTable.userId],
        references: [userTable.id],
    }),
    courses: one(courseTable, {
        fields: [instructorTable.id],
        references: [courseTable.instructorId],
    }),
}));

export const regionRalations = relations(regionTable, ({ one, many }) => ({
    governorates: many(governorateTable),
    years: many(yearTable),
    subjects: many(subjectTable),
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
    }),
}))

export const subjectRelations = relations(subjectTable, ({ one, many }) => ({
    region: one(regionTable, {
        fields: [subjectTable.regionId],
        references: [regionTable.id]
    }),
}))

export const courseRelations = relations(courseTable, ({ one }) => ({
    instructor: one(instructorTable, {
        fields: [courseTable.instructorId],
        references: [instructorTable.id]
    }),
    region: one(regionTable, {
        fields: [courseTable.regionId],
        references: [regionTable.id]
    }),
    subject: one(subjectTable, {
        fields: [courseTable.subjectId],
        references: [subjectTable.id]
    })
}))