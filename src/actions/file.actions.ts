'use server'

import { TAddSchema } from "@/schemas/file.schema"
import db from "@/lib/db";
import { TPlaylist } from "@/types/index.type";
import { revalidatePath } from "next/cache";
import { fileTable } from "@/lib/db/schema";
import { addToPlaylists } from "./index.actions";

export async function add(data: TAddSchema, playlists: string[], courseId: number) {
    const baseFileData: any = {
        title: data.title,
        file: data.file,
        type: data.type,
        size: data.size,
        status: data.status,
        courseId: courseId,
        order: 0
    };

    if (data.scheduledPublishDate) baseFileData.scheduledPublishDate = data.scheduledPublishDate;
    if (data.scheduledUnpublishDate) baseFileData.scheduledUnpublishDate = data.scheduledUnpublishDate;

    const results = await addToPlaylists('file', baseFileData, playlists, courseId);

    revalidatePath(`/dashboard/courses/${courseId}`)
    return results;
}