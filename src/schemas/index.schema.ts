import { UserRoles, UserTypes } from "@/types/index.type";
import { z } from "zod";

const roles = ['admin', 'user']
const types = ['school', 'exam']

export const baseSchema = z.object({
    id: z.string().optional(),
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    email: z.string().email(),
    phone: z.string(),
    parentPhone: z.string().optional(),
    region: z.string(),
    governorate: z.string(),
    year: z.string().optional(),
    picture: z.string().optional(),
    type: z.enum(types as [UserTypes]).optional(),
    role: z.enum(roles as [UserRoles]).optional(),
    password: z.string(),
    confirmPassword: z.string(),
})

export type TBaseSchema = z.infer<typeof baseSchema>;

export const passwordSchema = z.object({
    password: z.string().min(3, "Password must be at least 3"),
    confirmPassword: z.string(),
})
export type TPasswordSchema = z.infer<typeof passwordSchema>;
