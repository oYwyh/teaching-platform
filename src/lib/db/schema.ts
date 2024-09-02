import { relations } from "drizzle-orm";
import { boolean, decimal, integer, PgArray, pgEnum, pgTable, PgTimestampBuilderInitial, serial, text, timestamp } from "drizzle-orm/pg-core";

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
    regionId: integer("regionId").references(() => regionTable.id, { onDelete: 'no action' }).notNull(),
    governorateId: integer("governorateId").references(() => governorateTable.id, { onDelete: 'no action' }).notNull(),
    password: text("password").notNull(),
    picture: text("picture").default('default.jpg').notNull(),
    role: UserRoles("role").default("user").notNull(),
    ...timestamps(),
});


export const StudentContexts = pgEnum("studentContexts", ["school", "englishExam"]);

export const studentTable = pgTable("student", {
    id: serial("id").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    parentPhone: text("parentPhone").unique(),
    subjectId: integer("subjectId").references(() => subjectTable.id),
    yearId: integer("yearId").references(() => yearTable.id),
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

export const curriculumTable = pgTable("curriculum", {
    id: serial("id").primaryKey(),
    curriculum: text('curriculum').notNull(),
    ...timestamps(),
})

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
export const CourseStatuses = pgEnum("courseStatuses", ["published", "unpublished", 'scheduled']);
export const ExamStatuses = pgEnum("examStatuses", ["published", "unpublished", 'scheduled', 'draft']);
export const VideoStatuses = pgEnum("videoStatuses", ["published", "unpublished", 'scheduled']);
export const FileStatuses = pgEnum("fileStatuses", ["published", "unpublished", 'scheduled']);
export const LinkStatuses = pgEnum("linkStatuses", ["published", "unpublished", 'scheduled']);
export const PlaylistStatuses = pgEnum("playlistStatuses", ["published", "unpublished", 'scheduled']);

export const courseTable = pgTable("course", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    instructorId: integer("instructorId").references(() => instructorTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    currency: text("currency").notNull(),
    enrolledStudents: integer('enrolledStudents').default(0).notNull(),
    thumbnail: text("thumbnail").default('thumbnail.jpg').notNull(),
    promo: text("promo"),
    regionId: integer("regionId").references(() => regionTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    yearId: integer("yearId").references(() => yearTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    subjectId: integer("subjectId").references(() => subjectTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    context: CourseContexts("context").notNull(),
    status: CourseStatuses('status').default('unpublished').notNull(),
    releasedAt: timestamp('releasedAt', { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    scheduledPublishDate: timestamp("scheduledPublishDate", { withTimezone: true, mode: "date" }),
    scheduledUnpublishDate: timestamp("scheduledUnpublishDate", { withTimezone: true, mode: "date" }),
})

export const playlistTable = pgTable("playlist", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    status: PlaylistStatuses('status').default('published').notNull(),
    order: integer("order").notNull(),
    scheduledPublishDate: timestamp("scheduledPublishDate", { withTimezone: true, mode: "date" }),
    scheduledUnpublishDate: timestamp("scheduledUnpublishDate", { withTimezone: true, mode: "date" }),
    courseId: integer("courseId").references(() => courseTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    releasedAt: timestamp('releasedAt', { withTimezone: true, mode: "date" }).defaultNow().notNull(),
})

export const videoTable = pgTable("video", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    video: text("video").notNull(),
    thumbnail: text("thumbnail").default('thumbnail.jpg').notNull(),
    status: VideoStatuses('status').default('published').notNull(),
    order: integer("order").notNull(),
    viewCount: integer("viewCount").default(0).notNull(),
    scheduledPublishDate: timestamp("scheduledPublishDate", { withTimezone: true, mode: "date" }),
    scheduledUnpublishDate: timestamp("scheduledUnpublishDate", { withTimezone: true, mode: "date" }),
    courseId: integer("courseId").references(() => courseTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    playlistId: integer("playlistId").references(() => playlistTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    releasedAt: timestamp('releasedAt', { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true, mode: "date" }).defaultNow().notNull(),
})

export const fileTable = pgTable("file", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    file: text("file").notNull(),
    type: text("type").notNull(),
    size: integer("size").notNull(),
    status: FileStatuses('status').default('published').notNull(),
    order: integer("order").notNull(),
    playlistId: integer("playlistId").references(() => playlistTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    courseId: integer("courseId").references(() => courseTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    scheduledPublishDate: timestamp("scheduledPublishDate", { withTimezone: true, mode: "date" }),
    scheduledUnpublishDate: timestamp("scheduledUnpublishDate", { withTimezone: true, mode: "date" }),
    releasedAt: timestamp('releasedAt', { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true, mode: "date" }).defaultNow().notNull(),
})

export const linkTable = pgTable("link", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    link: text("link").notNull(),
    status: LinkStatuses('status').default('published').notNull(),
    order: integer("order").notNull(),
    playlistId: integer("playlistId").references(() => playlistTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    courseId: integer("courseId").references(() => courseTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    scheduledPublishDate: timestamp("scheduledPublishDate", { withTimezone: true, mode: "date" }),
    scheduledUnpublishDate: timestamp("scheduledUnpublishDate", { withTimezone: true, mode: "date" }),
    releasedAt: timestamp('releasedAt', { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true, mode: "date" }).defaultNow().notNull(),
})

export const examTable = pgTable('exam', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    duration: integer('duration').default(3600).notNull(),
    courseId: integer('courseId').references(() => courseTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    status: ExamStatuses('status').default('published').notNull(),
    order: integer("order").notNull(),
    playlistId: integer("playlistId").references(() => playlistTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    scheduledPublishDate: timestamp("scheduledPublishDate", { withTimezone: true, mode: "date" }),
    scheduledUnpublishDate: timestamp("scheduledUnpublishDate", { withTimezone: true, mode: "date" }),
    releasedAt: timestamp('releasedAt', { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true, mode: "date" }).defaultNow().notNull(),
})

export const QuestionTypes = pgEnum('questionTypes', ['choose', 'written', 'trueOrFalse'])

export const questionTable = pgTable('question', {
    id: serial('id').primaryKey(),
    question: text('question').notNull(),
    image: text('image'),
    type: QuestionTypes('type').default('choose').notNull(),
    examId: integer('examId').references(() => examTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    ...timestamps()
})

export const answerTable = pgTable('answer', {
    id: serial('id').primaryKey(),
    answer: text('answer').notNull(),
    isCorrect: boolean('isCorrect').default(false).notNull(),
    questionId: integer('questionId').references(() => questionTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
})

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

export const userRelations = relations(userTable, ({ one, many }) => ({
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

export const courseRelations = relations(courseTable, ({ one, many }) => ({
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
    }),
    year: one(yearTable, {
        fields: [courseTable.yearId],
        references: [yearTable.id]
    }),
    playlist: many(playlistTable),
    videos: many(videoTable),
    files: many(fileTable),
    exams: many(examTable),
    links: many(linkTable),
}))

export const videoRelations = relations(videoTable, ({ one, many }) => ({
    course: one(courseTable, {
        fields: [videoTable.courseId],
        references: [courseTable.id]
    }),
}))

export const playlistRelations = relations(playlistTable, ({ one, many }) => ({
    course: one(courseTable, {
        fields: [playlistTable.courseId],
        references: [courseTable.id]
    }),
}))

export const fileRelations = relations(fileTable, ({ one }) => ({
    course: one(courseTable, {
        fields: [fileTable.courseId],
        references: [courseTable.id]
    }),
}))


export const linkRelations = relations(linkTable, ({ one }) => ({
    course: one(courseTable, {
        fields: [linkTable.courseId],
        references: [courseTable.id]
    }),
}))

export const examRelations = relations(examTable, ({ one, many }) => ({
    course: one(courseTable, {
        fields: [examTable.courseId],
        references: [courseTable.id]
    }),
    questions: many(questionTable),
}))

export const questionRelations = relations(questionTable, ({ one, many }) => ({
    exam: one(examTable, {
        fields: [questionTable.examId],
        references: [examTable.id]
    }),
    answers: many(answerTable),
}))

export const answerRelations = relations(answerTable, ({ one }) => ({
    question: one(questionTable, {
        fields: [answerTable.questionId],
        references: [questionTable.id]
    })
}))