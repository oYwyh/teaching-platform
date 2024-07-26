'use server'

import db from "@/lib/db";
import { columnsRegex } from "@/types/index.type";
import { eq, sql } from "drizzle-orm";
import { examTable, governorateTable, regionTable, userTable, yearTable } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const uniqueColumnsValidations = async (data: any, userId?: string) => {
    const columns = [
        data.email && { column: 'email', value: data?.email, regex: columnsRegex.email },
        data.phone && { column: 'phone', value: data?.phone, regex: columnsRegex.phone },
        data.parentPhone && { column: 'parentPhone', value: data?.parentPhone, regex: columnsRegex.phone },
    ].filter(Boolean) as { column: string; value: string; regex: RegExp; }[];

    const errors: Record<string, string> = {};

    for (const { column, value, regex } of columns) {
        const exist = await db.query.userTable.findFirst({
            columns: { [column]: true },
            where: (userTable: { [key: string]: any }, { eq, and, not }) => {
                if (userId) {
                    return and(
                        eq(userTable[column], value),
                        not(eq(userTable.id, userId))
                    );
                } else {
                    return eq(userTable[column], value);
                }
            },
        });

        if (exist) {
            errors[column] = `${column.charAt(0).toUpperCase() + column.slice(1)} already exists`;
        }
        if (!regex.test(value)) {
            errors[column] = `${column.charAt(0).toUpperCase() + column.slice(1)} is invalid`;
        }

        // Additional check for phone in parentPhone and vice versa
        if (column === 'phone' || column === 'parentPhone') {
            const otherColumn = column === 'phone' ? 'parentPhone' : 'phone';
            const otherExist = await db.query.userTable.findFirst({
                columns: { [otherColumn]: true },
                where: (userTable: { [key: string]: any }, { eq, and, not }) => {
                    if (userId) {
                        return and(
                            eq(userTable[otherColumn], value),
                            not(eq(userTable.id, userId))
                        );
                    } else {
                        return eq(userTable[otherColumn], value);
                    }
                },
            });

            if (otherExist) {
                errors[column] = `${column.charAt(0).toUpperCase() + column.slice(1)} already exists as ${otherColumn}`;
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        return { error: errors };
    }

    return {};
};




const tablesMap = {
    user: userTable,
    region: regionTable,
    governorate: governorateTable,
    year: yearTable,
    exam: examTable
};


export async function deleteAction(id: string | number, table: keyof typeof tablesMap) {
    const tableDefinition = tablesMap[table];

    if (!tableDefinition) {
        throw new Error("Invalid table name");
    }

    if (table == 'governorate') {
        const governorate = await db.select().from(governorateTable).where(sql`${governorateTable.governorate} = ${id}`);
        id = governorate[0].id;
    }

    if (table == 'year') {
        const year = await db.select().from(yearTable).where(sql`${yearTable.year} = ${id}`);
        id = year[0].id;
    }

    const user = await db.delete(tableDefinition).where(sql`${tableDefinition.id} = ${id}`);

    if (user) {
        revalidatePath('/dashboard')
        return {
            done: true
        }
    } else {
        throw new Error("Deletion failed");
    }
}

export const getRegions = async () => {
    const regions = await db.select().from(regionTable);


    const formattedRegions = regions.map(region => {
        return {
            labelAr: region.region.replace('_', ' ').charAt(0).toUpperCase() + region.region.replace('_', ' ').slice(1).toLowerCase(),
            labelEn: region.region.replace('_', ' ').charAt(0).toUpperCase() + region.region.replace('_', ' ').slice(1).toLowerCase(),
            value: region.region
        };
    });

    return formattedRegions;
}

export const getGovernorates = async () => {
    const governoratesWithRegions = await db
        .select({
            governorateId: governorateTable.id,
            governorate: governorateTable.governorate,
            region: regionTable.region,
        })
        .from(governorateTable)
        .leftJoin(regionTable, eq(regionTable.id, governorateTable.regionId));

    // Initialize formattedGovernorates with an index signature
    const formattedGovernorates: { [key: string]: { labelAr: string; labelEn: string; value: string; }[] } = {};

    if (!governoratesWithRegions) {
        redirect('/');
    }

    governoratesWithRegions.forEach((gov) => {
        if (!gov.region) return; // Skip if region is null

        const region = gov.region.toLowerCase().replace(' ', '_');

        // Initialize the region array if it doesn't exist
        if (!formattedGovernorates[region]) {
            formattedGovernorates[region] = [];
        }

        formattedGovernorates[region].push({
            labelAr: gov.governorate.charAt(0).toUpperCase() + gov.governorate.slice(1).replace('_', ' '), // Modify this for the Arabic label
            labelEn: gov.governorate.charAt(0).toUpperCase() + gov.governorate.slice(1).replace('_', ' '),
            value: gov.governorate.toLowerCase().replace(' ', '_'),
        });
    });

    return formattedGovernorates;
};

export const getYears = async () => {
    const yearsWithRegions = await db
        .select({
            yearId: yearTable.id,
            year: yearTable.year,
            region: regionTable.region,
        })
        .from(yearTable)
        .leftJoin(regionTable, eq(regionTable.id, yearTable.regionId));

    // Initialize formattedGovernorates with an index signature
    const formattedYears: { [key: string]: { labelAr: string; labelEn: string; value: string; }[] } = {};

    if (!yearsWithRegions) {
        redirect('/');
    }

    yearsWithRegions.forEach((year) => {
        if (!year.region) return; // Skip if region is null

        const region = year.region.toLowerCase().replace(' ', '_');

        // Initialize the region array if it doesn't exist
        if (!formattedYears[region]) {
            formattedYears[region] = [];
        }

        formattedYears[region].push({
            labelAr: year.year.charAt(0).toUpperCase() + year.year.slice(1).replace('_', ' '), // Modify this for the Arabic label
            labelEn: year.year.charAt(0).toUpperCase() + year.year.slice(1).replace('_', ' '),
            value: year.year.toLowerCase().replace(' ', '_'),
        });
    });

    return formattedYears;

};

export const getExams = async () => {
    const exams = await db.select().from(examTable);

    // Initialize formattedGovernorates with an index signature
    const formattedExams: { labelAr: string; labelEn: string; value: string; }[] = [];

    exams.forEach((exam) => {
        formattedExams.push({
            labelAr: exam.exam.charAt(0).toUpperCase() + exam.exam.slice(1).replace('_', ' '), // Modify this for the Arabic label
            labelEn: exam.exam.charAt(0).toUpperCase() + exam.exam.slice(1).replace('_', ' '),
            value: exam.exam.toLowerCase().replace(' ', '_'),
        });
    });


    console.log(formattedExams)

    return formattedExams;
};