import { fileStatuses } from "@/schemas/index.schema";
import { z } from "zod";

export const addSchema = z.object({
    title: z.string().min(1, "Title is required"),
    status: z.enum(fileStatuses),
    scheduledPublishDate: z.date().optional(),
    scheduledUnpublishDate: z.date().optional(),
})

export type TAddSchema = { file: string, type: string, size: number } & z.infer<typeof addSchema>
