'use server'

import db from "@/lib/db";
import { courseTable } from "@/lib/db/schema";
import { TCreateSchema } from "@/schemas/course.schema";
import { TIndex } from "@/types/index.type";
import { redirect } from "next/navigation";

export async function create(data: TCreateSchema) {
    const course = await db.insert(courseTable).values({
        title: data.title,
        description: data.description,
        instructorId: data.instructorId,
        price: data.price || '0',
        currency: data.currency || 'USD',
        enrolledStudents: data.enrolledStudents || 0,
        thumbnail: data.thumbnail || 'thumbnail.jpg',
        promo: data.promo || null,
        regionId: data.regionId,
        yearId: data.yearId,
        subjectId: data.subjectId,
        context: data.context,
        status: data.status, // Ensure this is a valid enum value
        scheduledPublishDate: data.scheduledPublishDate || null,
        scheduledUnpublishDate: data.scheduledUnpublishDate || null,
    }).returning({ id: courseTable.id });

    return redirect(`/dashboard/courses/${course[0].id}`);
}