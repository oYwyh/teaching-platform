import { baseSchema, studentContexts } from "@/schemas/index.schema";
import { z } from "zod";

export const addSchema = z.object({
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    email: z.string().email(),
    phone: z.string().min(1, "Phone is required"),
    parentPhone: z.string().optional(),
    yearId: z.number().optional(),
    regionId: z.number(),
    governorateId: z.number(),
    subjectId: z.number().optional(),
    context: z.enum(studentContexts),
    password: z.string(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
}).refine((data) => data.parentPhone != data.phone, {
    message: "Personal phone and parent phone cannot be the same",
    path: ['phone']
}).superRefine((data, ctx) => {
    if (data.context === 'school' && !data.yearId) {
        ctx.addIssue({
            code: "custom",
            message: "Year is required",
            path: ["yearId"],
        });
    }
    if (data.context === 'school' && !data.parentPhone) {
        ctx.addIssue({
            code: "custom",
            message: "Parent Phone is required",
            path: ["parentPhone"],
        });
    }
    if (data.context === 'englishExam' && !data.subjectId) {
        ctx.addIssue({
            code: "custom",
            message: "Exam is required",
            path: ["subjectId"],
        });
    }
})

export type TAddSchema = { [key: string]: string } & z.infer<typeof addSchema>

export const editSchema = z.object({
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    email: z.string().email(),
    phone: z.string().min(1, "Phone is required"),
    parentPhone: z.string().optional(),
    yearId: z.number().optional(),
    regionId: z.number(),
    governorateId: z.number(),
    subjectId: z.number().optional(),
    context: z.enum(studentContexts),
}).refine((data) => data.parentPhone != data.phone, {
    message: "Personal phone and parent phone cannot be the same",
    path: ['phone']
}).superRefine((data, ctx) => {
    if (data.context == 'school' && !data.yearId) {
        ctx.addIssue({
            code: "custom",
            message: "Year is required",
            path: ["yearId"],
        });
    }
    if (data.context == 'school' && !data.parentPhone) {
        ctx.addIssue({
            code: "custom",
            message: "Parent Phone is required",
            path: ["parentPhone"],
        });
    }
    if (data.context == 'englishExam' && !data.subjectId) {
        ctx.addIssue({
            code: "custom",
            message: "Exam is required",
            path: ["subjectId"],
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