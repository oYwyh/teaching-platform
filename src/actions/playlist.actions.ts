'use server'

import db from "@/lib/db"
import { playlistTable } from "@/lib/db/schema"
import { TCreateSchema } from "@/schemas/playlist.schema"
import { revalidatePath } from "next/cache"

export async function create(data: TCreateSchema, courseId: number) {

    const playlist = await db.insert(playlistTable).values({
        title: data.title,
        description: data.description,
        status: data.status,
        courseId: courseId
    })

    revalidatePath(`/dashboard/courses/${courseId}`)
    return playlist
}