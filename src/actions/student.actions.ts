'use server'

import { uniqueColumnsValidations } from "@/actions/index.actions";
import db from "@/lib/db";
import { roleTable, studentTable, userTable } from "@/lib/db/schema";
import { TAddSchema, TEditSchema, TPasswordSchema } from "@/schemas/student.schema";
import { TStudent, TUser } from "@/types/index.type";
import { hash } from "@node-rs/argon2";
import { sql } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";


export async function add(
    data: TAddSchema,
) {
    const { firstname, lastname, email, phone, parentPhone, region, governorate, englishExam, context, year, password } = data

    const unqiueValidation = await uniqueColumnsValidations(data)

    if (unqiueValidation?.error) {
        return {
            error: unqiueValidation?.error
        }
    }

    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    await db.insert(userTable).values({
        id: userId,
        firstname,
        lastname,
        email,
        phone,
        region,
        governorate,
        password: passwordHash,
    });

    await db.insert(studentTable).values({
        parentPhone,
        year,
        englishExam,
        context,
        userId: userId
    })

    await db.insert(roleTable).values({
        userId: userId,
        role: 'user'
    })


    revalidatePath('/dashboard/students');
}

export async function edit(data: TEditSchema, userId: string) {
    const { firstname, lastname, email, phone, parentPhone, region, governorate, context, englishExam, year } = data;

    const uniqueValidation = await uniqueColumnsValidations(data, userId);

    if (uniqueValidation?.error) {
        return {
            error: uniqueValidation?.error,
        };
    }

    // Update userTable
    const userUpdateData: Partial<TUser> = {};
    if (firstname !== undefined && firstname !== null) userUpdateData.firstname = firstname;
    if (lastname !== undefined && lastname !== null) userUpdateData.lastname = lastname;
    if (email !== undefined && email !== null) userUpdateData.email = email;
    if (phone !== undefined && phone !== null) userUpdateData.phone = phone;
    if (region !== undefined && region !== null) userUpdateData.region = region;
    if (governorate !== undefined && governorate !== null) userUpdateData.governorate = governorate;

    if (Object.keys(userUpdateData).length > 0) {
        await db.update(userTable).set(userUpdateData).where(sql`${userTable.id} = ${userId}`).returning();
    }

    // Update studentTable
    const studentUpdateData: Partial<TStudent> = {};
    if (context === 'englishExam') {
        studentUpdateData.parentPhone = null;
        studentUpdateData.year = null;
        if (englishExam !== undefined && englishExam !== null) studentUpdateData.englishExam = englishExam;
    } else if (context === 'school') {
        studentUpdateData.englishExam = null;
        if (parentPhone !== undefined && parentPhone !== null) studentUpdateData.parentPhone = parentPhone;
        if (year !== undefined && year !== null) studentUpdateData.year = year;
    }
    if (context !== undefined && context !== null) studentUpdateData.context = context;

    if (Object.keys(studentUpdateData).length > 0) {
        await db.update(studentTable).set(studentUpdateData).where(sql`${studentTable.userId} = ${userId}`).returning();
    }

    revalidatePath('/dashboard/students');
}

export async function editPassword(data: TPasswordSchema, userId: string) {
    const { password } = data;
    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });
    const result = await db.update(userTable).set({ password: passwordHash }).where(sql`${userTable.id} = ${userId}`).returning();

    if (result) {
        return {
            done: true
        }
    } else {
        throw new Error('Failed to update password');
    }
}