import { playlistStatuses } from "@/schemas/index.schema";
import { z } from "zod";

export const createSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    status: z.enum(playlistStatuses),
    scheduledPublishDate: z.date().optional(),
    scheduledUnpublishDate: z.date().optional(),
})

export type TCreateSchema = { [key: string]: string } & z.infer<typeof createSchema>
