import { z } from "zod";


export const checkSchema = z.object({
    credential: z.string().min(1, 'credential is required!')
})

export type TCheckSchema = z.infer<typeof checkSchema>

export const registerSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    phone: z.string(),
    parentPhone: z.string(),
    governorate: z.string(),
    password: z.string(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
}).refine((data) => data.parentPhone != data.phone, {
    message: "Personal phone and parent phone cannot be the same",
    path: ['phone']
})


export type TRegisterSchema = z.infer<typeof registerSchema>


export const loginSchema = z.object({
    column: z.string(),
    credential: z.string(),
    password: z.string(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
