import { studentContexts } from "@/schemas/index.schema";
import { z } from "zod";


export const checkSchema = z.object({
    credential: z.string().min(1, 'credential is required!')
})

export type TCheckSchema = z.infer<typeof checkSchema>

export const registerSchema = z.object({
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
    password: z.string(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
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
            message: "englishExam is required",
            path: ["englishExam"],
        });
    }
})

export type TRegisterSchema = z.infer<typeof registerSchema>


export const loginSchema = z.object({
    column: z.string(),
    credential: z.string(),
    password: z.string(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
