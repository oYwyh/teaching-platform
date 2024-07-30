'use server'

import { uniqueColumnsValidations } from "@/actions/index.actions";
import db from "@/lib/db";
import { governorateTable, regionTable, subjectTable, userTable, yearTable } from "@/lib/db/schema";
import { TAddSchema, TEditSchema } from "@/schemas/subject.schema";
import { hash } from "@node-rs/argon2";
import { and, eq, or, sql } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";


export async function add(
    data: TAddSchema,
    selectedRegions: string[]
) {
    if (data.subjectContext == 'school') {
        const regionsInDb = await db.query.regionTable.findMany({});

        const selectedRegionObjects = selectedRegions.map(regionId => {
            const region = regionsInDb.find(r => r.id === regionId)
            return region ? { id: region.id, region: region.region } : null;
        }).filter(region => region !== null); // Remove any null values

        selectedRegionObjects.map(async (region) => {
            await db.insert(subjectTable).values({
                subject: data.subject,
                context: data.subjectContext,
                regionId: region.id,
            })
        })
    } else {
        await db.insert(subjectTable).values({
            subject: data.subject,
            context: data.subjectContext,
        })
    }

    revalidatePath('/dashboard/subjects');
}

// i swear to got idk what is happening in this code so iam either cooked or chatGPT just cooked with this one
export async function edit(data: TEditSchema, selectedRegions: string[]) {
    // { subjectContext: 'school', subject: 'bology' }

    // Fetch all regions from the database
    const regionsInDb = await db.select().from(regionTable);

    // Map selected regions to region objects
    const selectedRegionObjects = selectedRegions.map(regionName => {
        const region = regionsInDb.find(r => r.id === regionName);
        return region ? { id: region.id, region: region.region } : null;
    }).filter(region => region !== null); // Remove any null values

    /*
        [
            { id: 8, region: 'kuwait' },
            { id: 9, region: 'saudi_arabia' }
        ]
    */

    // Extract the region IDs from the selected regions
    const selectedRegionIds = selectedRegionObjects.map(region => region.id);

    // Fetch all subjects that match the provided subject and context
    const subjects = await db.select()
        .from(subjectTable)
        .where(
            and(
                eq(subjectTable.subject, data.subject),
                eq(subjectTable.context, data.subjectContext)
            )
        )
        .execute();

    // Extract the current region IDs associated with this subject and context
    const currentRegionIds = subjects.map(subject => subject.regionId) as number[];

    // Determine regions to add and remove
    const regionsToAdd = selectedRegionIds.filter(regionId => !currentRegionIds.includes(regionId));
    const regionsToRemove = currentRegionIds.filter(regionId => !selectedRegionIds.includes(regionId));

    // Add new subjects for the regions to add
    for (const regionId of regionsToAdd) {
        await db.insert(subjectTable).values({
            subject: data.subject,
            context: data.subjectContext,
            regionId: regionId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).execute();
    }

    // Remove subjects for the regions to remove
    for (const regionId of regionsToRemove) {
        await db.delete(subjectTable)
            .where(
                and(
                    eq(subjectTable.subject, data.subject),
                    eq(subjectTable.context, data.subjectContext),
                    eq(subjectTable.regionId, regionId)
                )
            ).execute();
    }

    // Fetch and return the updated subjects
    const updatedSubjects = await db.select()
        .from(subjectTable)
        .where(
            and(
                eq(subjectTable.subject, data.subject),
                eq(subjectTable.context, data.subjectContext)
            )
        )
        .execute();


    revalidatePath('/dashboard/subjects')

    return updatedSubjects;
}


