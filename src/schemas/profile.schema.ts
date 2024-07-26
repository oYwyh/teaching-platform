import { baseSchema, passwordSchema } from "@/schemas/index.schema";
import { z } from "zod";

export const updateProfileSchema = z.object({
    id: z.string().optional(),
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    email: z.string().email(),
    phone: z.string(),
    parentPhone: z.string().optional().or(z.literal(null)),
    region: z.string().optional(),
    governorate: z.string().optional(),
    year: z.string().optional().or(z.literal(null)),
    exam: z.string().optional(),
    type: z.enum(['school', 'exam']),
}).superRefine((data, ctx) => {
    if (data.type === 'school' && !data.parentPhone) {
        ctx.addIssue({
            code: "custom",
            message: "Parent Phone is required",
            path: ["parentPhone"],
        });
    }
})

export type TUpdateProfileSchema = z.infer<typeof updateProfileSchema>;


export const updatePasswordSchema = passwordSchema.extend({ id: z.string().optional() }).refine((data: { password: string, confirmPassword: string }) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export type TUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;