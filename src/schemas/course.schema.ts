import { baseSchema, courseStatuses, studentContexts, courseContexts } from "@/schemas/index.schema";
import { z } from "zod";

export const createSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    instructorId: z.number(),
    regionId: z.number(),
    yearId: z.number(),
    subjectId: z.number(),
    context: z.enum(courseContexts),
    status: z.enum(courseStatuses),
    scheduledPublishDate: z.date().optional(),
    scheduledUnpublishDate: z.date().optional(),
    // not in the form
    price: z.string().optional(),
    currency: z.string().optional(),
    enrolledStudents: z.number().optional(),
    thumbnail: z.string().optional(),
    promo: z.string().optional(),
})

export type TCreateSchema = { [key: string]: string } & z.infer<typeof createSchema>

export const editSchema = z.object({
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    email: z.string().email(),
    phone: z.string().min(1, "Phone is required"),
    parentPhone: z.string().optional(),
    year: z.string().optional(),
    region: z.string(),
    governorate: z.string(),
    englishExam: z.string().optional(),
    context: z.enum(studentContexts),
}).refine((data) => data.parentPhone != data.phone, {
    message: "Personal phone and parent phone cannot be the same",
    path: ['phone']
}).superRefine((data, ctx) => {
    if (data.context == 'school' && !data.year) {
        ctx.addIssue({
            code: "custom",
            message: "Year is required",
            path: ["year"],
        });
    }
    if (data.context == 'school' && !data.parentPhone) {
        ctx.addIssue({
            code: "custom",
            message: "Parent Phone is required",
            path: ["parentPhone"],
        });
    }
    if (data.context == 'englishExam' && !data.englishExam) {
        ctx.addIssue({
            code: "custom",
            message: "Exam is required",
            path: ["englishExam"],
        });
    }
})

export type TEditSchema = { [key: string]: string } & z.infer<typeof editSchema>;

export const passwordSchema = z.object({
    id: z.string().optional(),
    password: z.string(),
    confirmPassword: z.string(),
}).refine((data: { password: string, confirmPassword: string }) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

export type TPasswordSchema = z.infer<typeof passwordSchema>;