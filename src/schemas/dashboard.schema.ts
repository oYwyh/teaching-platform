import { baseSchema } from "@/schemas/index.schema";
import { z } from "zod";

export const addSchema = baseSchema.extend({}).refine((data: { password: string, confirmPassword: string }) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
}).refine((data) => data.parentPhone != data.phone, {
    message: "Personal phone and parent phone cannot be the same",
    path: ['phone']
});

export type TAddSchema = { [key: string]: string } & z.infer<typeof addSchema>

export const editSchema = baseSchema.omit({ password: true, confirmPassword: true })

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


