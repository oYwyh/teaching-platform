import { linkStatuses } from "@/schemas/index.schema";
import { z } from "zod";

export const addSchema = z.object({
    title: z.string().min(1, "Title is required"),
    link: z.string().min(1, 'Link is required').url("Invalid link"),
    status: z.enum(linkStatuses),
    scheduledPublishDate: z.date().optional(),
    scheduledUnpublishDate: z.date().optional(),
})

export type TAddSchema = { [key: string]: string } & z.infer<typeof addSchema>
