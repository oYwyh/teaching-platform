'use server'

import { TAddSchema } from "@/schemas/file.schema"
import db from "@/lib/db";
import { TPlaylist } from "@/types/index.type";
import { revalidatePath } from "next/cache";
import { fileTable } from "@/lib/db/schema";

export async function add(data: TAddSchema, playlists: string[], courseId: number) {
    const fileData: any = {
        title: data.title,
        file: data.file,
        type: data.type,
        size: data.size,
        status: data.status,
        courseId: courseId,
    };

    if (playlists && playlists.length > 0) videoData.playlistIds = playlists;
    if (data.scheduledPublishDate) fileData.scheduledPublishDate = data.scheduledPublishDate;
    if (data.scheduledUnpublishDate) fileData.scheduledUnpublishDate = data.scheduledUnpublishDate;

    await db.insert(fileTable).values(fileData).returning();

    return revalidatePath(`/dashboard/courses/${courseId}`)
}