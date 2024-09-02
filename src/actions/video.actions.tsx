'use server'

import db from "@/lib/db";
import { videoTable } from "@/lib/db/schema";
import { TAddSchema } from "@/schemas/video.schema";
import { TPlaylist, TVideo, VideoStatuses } from "@/types/index.type";
import { revalidatePath } from "next/cache";
import { addToPlaylists } from "./index.actions";

export async function add(data: TAddSchema, playlists: string[], courseId: number) {

    const baseVideoData: any = {
        title: data.title,
        description: data.description,
        status: data.status,
        viewCount: 0,
        courseId: courseId,
        order: 0
    };

    if (data.video) baseVideoData.video = data.video;
    if (data.thumbnail) baseVideoData.thumbnail = data.thumbnail;
    if (data.scheduledPublishDate) baseVideoData.scheduledPublishDate = data.scheduledPublishDate;
    if (data.scheduledUnpublishDate) baseVideoData.scheduledUnpublishDate = data.scheduledUnpublishDate;

    const results = await addToPlaylists('video', baseVideoData, playlists, courseId);

    revalidatePath(`/dashboard/courses/${courseId}`)
    return results;
}