'use server'

import db from "@/lib/db";
import { columnsRegex, TFullUserData } from "@/types/index.type";
import { eq, sql } from "drizzle-orm";
import {
    examTable,
    governorateTable,
    regionTable,
    userTable,
    yearTable,
    roleTable,
    studentTable,
    instructorTable,
    courseTable

} from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
export const uniqueColumnsValidations = async (data: any, userId?: string) => {
    const userColumns = [
        data.email && { column: 'email', value: data.email, regex: columnsRegex.email },
        data.phone && { column: 'phone', value: data.phone, regex: columnsRegex.phone },
    ].filter(Boolean) as { column: string; value: string; regex: RegExp; }[];

    const studentColumns = [
        data.parentPhone && { column: 'parentPhone', value: data.parentPhone, regex: columnsRegex.phone },
    ].filter(Boolean) as { column: string; value: string; regex: RegExp; }[];

    const errors: Record<string, string> = {};

    // Check unique constraints for userTable
    for (const { column, value, regex } of userColumns) {
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
    }

    // Check unique constraints for studentTable
    for (const { column, value, regex } of studentColumns) {
        const exist = await db.query.studentTable.findFirst({
            columns: { [column]: true },
            where: (studentTable: { [key: string]: any }, { eq, and, not }) => {
                if (userId) {
                    return and(
                        eq(studentTable[column], value),
                        not(eq(studentTable.userId, userId))
                    );
                } else {
                    return eq(studentTable[column], value);
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
        if (column === 'parentPhone') {
            const otherExist = await db.query.userTable.findFirst({
                columns: { phone: true },
                where: (userTable: { [key: string]: any }, { eq, and, not }) => {
                    if (userId) {
                        return and(
                            eq(userTable.phone, value),
                            not(eq(userTable.id, userId))
                        );
                    } else {
                        return eq(userTable.phone, value);
                    }
                },
            });

            if (otherExist) {
                errors[column] = `${column.charAt(0).toUpperCase() + column.slice(1)} already exists as phone`;
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
    exam: examTable,
    instructor: instructorTable,
    course: courseTable,
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

// src/lib/serverActions/getUserData.ts

export const getUser = async (): Promise<TFullUserData | null> => {
    const { user, session } = await validateRequest();
    if (!user) {
        return null;
    }

    // Fetch user role
    const role = await db.query.roleTable.findFirst({ where: (roleTable, { eq }) => eq(roleTable.userId, user.id) });
    const userRole = role?.role ?? 'user';

    if (userRole === 'user') {
        // Fetch student-specific data
        const student = await db.query.studentTable.findFirst({ where: (studentTable, { eq }) => eq(studentTable.userId, user.id) });
        return {
            ...user,
            role: userRole,
            exam: student?.exam ?? undefined,
            year: student?.year ?? undefined,
            parentPhone: student?.parentPhone ?? undefined,
            type: student?.type,
        };
    } else if (userRole === 'instructor') {
        // Fetch instructor-specific data
        const instructor = await db.query.instructorTable.findFirst({ where: (instructorTable, { eq }) => eq(instructorTable.userId, user.id) });
        return {
            ...user,
            role: userRole,
            bio: instructor?.bio,
            qualifications: instructor?.qualifications,
            experience: instructor?.experience,
            specialty: instructor?.specialty,
            contactInfo: instructor?.contactInfo ?? undefined,
            officeLocation: instructor?.officeLocation ?? undefined,
        };
    } else {
        // Just return user data for other roles (e.g., admin, user)
        return { ...user, role: userRole };
    }
};
