import { baseSchema, passwordSchema } from "@/schemas/index.schema";
import { z } from "zod";

export const updateProfileSchema = baseSchema.omit({ password: true, confirmPassword: true });

export type TUpdateProfileSchema = z.infer<typeof updateProfileSchema>;


export const updatePasswordSchema = passwordSchema.extend({ id: z.string().optional() }).refine((data: { password: string, confirmPassword: string }) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export type TUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;