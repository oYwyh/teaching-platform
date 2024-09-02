'use server'

import { revalidatePath } from "next/cache";
import { TAddSchema } from "@/schemas/link.schema";
import { addToPlaylists } from "./index.actions";

export async function add(data: TAddSchema, playlists: string[], courseId: number) {
    const baseLinkData: any = {
        title: data.title,
        link: data.link,
        status: data.status,
        courseId: courseId,
    };

    if (data.scheduledPublishDate) baseLinkData.scheduledPublishDate = data.scheduledPublishDate;
    if (data.scheduledUnpublishDate) baseLinkData.scheduledUnpublishDate = data.scheduledUnpublishDate;

    const results = await addToPlaylists('link', baseLinkData, playlists, courseId);

    revalidatePath(`/dashboard/courses/${courseId}`);
    return results;
}