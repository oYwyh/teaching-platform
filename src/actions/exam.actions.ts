'use server'

import { uniqueColumnsValidations } from "@/actions/index.actions";
import db from "@/lib/db";
import { examTable, governorateTable, regionTable, userTable, yearTable } from "@/lib/db/schema";
import { TAddSchema, TEditSchema } from "@/schemas/exam.schema";
import { hash } from "@node-rs/argon2";
import { sql } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";


export async function add(
    data: TAddSchema,
) {

    await db.insert(examTable).values({
        exam: data.exam,
    }).returning();

    revalidatePath('/dashboard/exams')
}

export async function edit(
    data: TEditSchema,
) {
    console.log(data)
    revalidatePath('/dashboard/exams')
}