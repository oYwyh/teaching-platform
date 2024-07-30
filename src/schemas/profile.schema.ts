import { baseSchema, passwordSchema, studentContexts } from "@/schemas/index.schema";
import { z } from "zod";

export const updateProfileSchema = z.object({
    id: z.string().optional(),
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    email: z.string().email(),
    phone: z.string(),
    parentPhone: z.string().optional().or(z.literal(null)),
    regionId: z.number().optional(),
    governorateId: z.number().optional(),
    yearId: z.number().optional().or(z.literal(null)),
    subjectId: z.number().optional(),
    bio: z.string().optional(),
    specialty: z.string().optional(),
    context: z.enum(studentContexts).or(z.literal(null)),
}).superRefine((data, ctx) => {
    if (data.context === 'school' && !data.parentPhone) {
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