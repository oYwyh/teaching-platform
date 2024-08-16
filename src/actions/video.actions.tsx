'use server'

import db from "@/lib/db";
import { videoTable } from "@/lib/db/schema";
import { TAddSchema } from "@/schemas/video.schema";
import { TPlaylist, TVideo, VideoStatuses } from "@/types/index.type";
import { revalidatePath } from "next/cache";

export async function add(data: TAddSchema, playlists: TPlaylist[], courseId: number) {
    const videoData: any = {
        title: data.title,
        description: data.description,
        status: data.status,
        viewCount: 0,
        courseId: courseId,
    };

    if (playlists && playlists.length > 0) videoData.playlistIds = playlists;
    if (data.video) videoData.video = data.video;
    if (data.thumbnail) videoData.thumbnail = data.thumbnail;
    if (data.scheduledPublishDate) videoData.scheduledPublishDate = data.scheduledPublishDate;
    if (data.scheduledUnpublishDate) videoData.scheduledUnpublishDate = data.scheduledUnpublishDate;

    await db.insert(videoTable).values(videoData).returning();

    return revalidatePath(`/dashboard/courses/${courseId}`)
}