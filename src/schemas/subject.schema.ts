import { subjectContexts } from "@/schemas/index.schema";
import { z } from "zod";

export const addSchema = z.object({
    subjectContext: z.string(),
    subject: z.string(),
})

export type TAddSchema = { [key: string]: string } & z.infer<typeof addSchema>

export const editSchema = z.object({
    subjectContext: z.string(),
    subject: z.string(),
})

export type TEditSchema = { [key: string]: string } & z.infer<typeof editSchema>