import { UserRoles, StudentContexts } from "@/types/index.type";
import { z } from "zod";

export const roles = ['admin', 'user', 'instructor'] as const
export const playlistStatuses = ['published', 'unpublished', 'scheduled'] as const
export const videoStatuses = ['published', 'unpublished', 'scheduled'] as const
export const examStatuses = ['published', 'unpublished', 'scheduled', 'draft'] as const
export const fileStatuses = ['published', 'unpublished', 'scheduled'] as const
export const courseStatuses = ['published', 'unpublished', 'scheduled'] as const
export const courseContexts = ['school', 'englishExam'] as const
export const subjectContexts = ['school', 'englishExam'] as const
export const studentContexts = ['school', 'englishExam'] as const

export const baseSchema = z.object({
    id: z.string().optional(),
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    email: z.string().email(),
    phone: z.string(),
    region: z.string(),
    governorate: z.string(),
    picture: z.string().optional(),
    password: z.string(),
    confirmPassword: z.string(),
})

export type TBaseSchema = z.infer<typeof baseSchema>;

export const passwordSchema = z.object({
    password: z.string().min(3, "Password must be at least 3"),
    confirmPassword: z.string(),
})
export type TPasswordSchema = z.infer<typeof passwordSchema>;
