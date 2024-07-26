'use server'

import { uniqueColumnsValidations } from "@/actions/index.actions";
import db from "@/lib/db";
import { governorateTable, regionTable, userTable, yearTable } from "@/lib/db/schema";
import { TAddSchema, TEditSchema } from "@/schemas/region.schema";
import { hash } from "@node-rs/argon2";
import { sql } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";


export async function add(
    data: TAddSchema,
    selectedGovernorates: string[],
    selectedYears: string[]
) {
    console.log(data)
    console.log(selectedGovernorates)

    const region = await db.insert(regionTable).values({
        region: data.region,
    }).returning();


    selectedGovernorates.map(async (governorate) => {
        await db.insert(governorateTable).values({
            governorate: governorate,
            regionId: region[0].id,
        }).returning();
    })

    selectedYears.map(async (year) => {
        await db.insert(yearTable).values({
            year: year,
            regionId: region[0].id,
        }).returning();
    })

    revalidatePath('/dashboard/regions')
}

export async function edit(
    id: number,
    data: any,
    selectedGovernorates: string[],
    selectedYears: string[]
) {
    await db.update(regionTable).set({
        region: data.region
    })
        .where(sql`id = ${id}`)
        .returning();

    await db.delete(governorateTable).where(sql`${governorateTable.regionId} = ${id}`)
    selectedGovernorates.map(async (governorate) => {
        await db.insert(governorateTable).values({
            governorate: governorate,
            regionId: id,
        }).returning();
    })

    await db.delete(yearTable).where(sql`${yearTable.regionId} = ${id}`)
    selectedYears.map(async (year) => {
        await db.insert(yearTable).values({
            year: year,
            regionId: id,
        }).returning();
    })


    revalidatePath('/dashboard/regions')
}