import { baseSchema } from "@/schemas/index.schema";
import { z } from "zod";

export const addSchema = z.object({
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    email: z.string().email(),
    phone: z.string(),
    parentPhone: z.string().optional(),
    year: z.string().optional(),
    region: z.string(),
    governorate: z.string(),
    exam: z.string(),
    type: z.enum(['school', 'exam']),
    password: z.string(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
}).refine((data) => data.parentPhone != data.phone, {
    message: "Personal phone and parent phone cannot be the same",
    path: ['phone']
}).superRefine((data, ctx) => {
    if (data.type === 'school' && !data.year) {
        ctx.addIssue({
            code: "custom",
            message: "Year is required",
            path: ["year"],
        });
    }
    if (data.type === 'school' && !data.parentPhone) {
        ctx.addIssue({
            code: "custom",
            message: "Parent Phone is required",
            path: ["parentPhone"],
        });
    }
    if (data.type === 'exam' && !data.exam) {
        ctx.addIssue({
            code: "custom",
            message: "Exam is required",
            path: ["exam"],
        });
    }
})

export type TAddSchema = { [key: string]: string } & z.infer<typeof addSchema>

export const editSchema = z.object({
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    email: z.string().email(),
    phone: z.string(),
    parentPhone: z.string().optional(),
    year: z.string().optional(),
    region: z.string(),
    governorate: z.string(),
    exam: z.string(),
    type: z.enum(['school', 'exam']),
}).refine((data) => data.parentPhone != data.phone, {
    message: "Personal phone and parent phone cannot be the same",
    path: ['phone']
}).superRefine((data, ctx) => {
    if (data.type === 'school' && !data.year) {
        ctx.addIssue({
            code: "custom",
            message: "Year is required",
            path: ["year"],
        });
    }
    if (data.type === 'school' && !data.parentPhone) {
        ctx.addIssue({
            code: "custom",
            message: "Parent Phone is required",
            path: ["parentPhone"],
        });
    }
    if (data.type === 'exam' && !data.exam) {
        ctx.addIssue({
            code: "custom",
            message: "Exam is required",
            path: ["exam"],
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