'use server'

import { tablesMap } from "@/constants/index.constant";
import db from "@/lib/db";
import { courseTable } from "@/lib/db/schema";
import { TCreateSchema } from "@/schemas/course.schema";
import { TIndex } from "@/types/index.type";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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

export async function updateItemOrder(
    table: keyof typeof tablesMap,
    items: { id: number; order: number }[],
    courseId: number
) {
    const tableDefinition = tablesMap[table];

    if (!tableDefinition) {
        throw new Error("Invalid table name");
    }

    const updatePromises = items.map(item =>
        db.update(tableDefinition)
            .set({ order: item.order })
            .where(sql`${tableDefinition.id} = ${item.id} AND ${tableDefinition.courseId} = ${courseId}`)
    );

    await Promise.all(updatePromises);

    revalidatePath(`/dashboard/courses/${courseId}`);
}