import { videoStatuses } from "@/schemas/index.schema";
import { z } from "zod";

export const addSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    status: z.enum(videoStatuses),
    scheduledPublishDate: z.date().optional(),
    scheduledUnpublishDate: z.date().optional(),
})

export type TAddSchema = { [key: string]: string } & z.infer<typeof addSchema>
