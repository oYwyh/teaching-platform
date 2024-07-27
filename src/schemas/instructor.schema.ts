import { z } from "zod";

export const addSchema = z.object({
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    email: z.string().email(),
    phone: z.string().min(1, "Phone is required"),
    region: z.string(),
    governorate: z.string(),
    bio: z.string().min(1, "Bio is required").max(500, "Bio is too long"),
    specialty: z.string(),
    password: z.string(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

export type TAddSchema = { [key: string]: string } & z.infer<typeof addSchema>

export const editSchema = z.object({
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    email: z.string().email(),
    phone: z.string().min(1, "Phone is required"),
    region: z.string(),
    governorate: z.string(),
    bio: z.string().min(1, "Bio is required").max(500, "Bio is too long"),
    specialty: z.string(),
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