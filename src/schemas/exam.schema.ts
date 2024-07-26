import { baseSchema } from "@/schemas/index.schema";
import { z } from "zod";

export const addSchema = z.object({
    exam: z.string(),
})

export type TAddSchema = { [key: string]: string } & z.infer<typeof addSchema>

export const editSchema = z.object({
    exam: z.string(),
})

export type TEditSchema = { [key: string]: string } & z.infer<typeof editSchema>