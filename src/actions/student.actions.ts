'use server'

import { uniqueColumnsValidations } from "@/actions/index.actions";
import db from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { TAddSchema, TEditSchema, TPasswordSchema } from "@/schemas/student.schema";
import { hash } from "@node-rs/argon2";
import { sql } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";


export async function add(
    data: TAddSchema,
) {
    const { firstname, lastname, email, phone, parentPhone, region, governorate, type, exam, year, password } = data

    const unqiueValidation = await uniqueColumnsValidations({ email, phone, parentPhone })

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
        parentPhone: parentPhone || null,
        region,
        governorate,
        year,
        exam,
        type,
        password: passwordHash,
    })

    revalidatePath('/dashboard/students');
}

export async function edit(data: any, userId: string) {
    const { firstname, lastname, email, phone, parentPhone, region, governorate, type, exam, year, password } = data;

    const uniqueValidation = await uniqueColumnsValidations(data, userId);

    if (uniqueValidation?.error) {
        return {
            error: uniqueValidation?.error,
        };
    }

    await db.update(userTable).set({
        firstname,
        lastname,
        email,
        phone,
        region,
        governorate,
        type,
        exam: exam || null,
        parentPhone: parentPhone || null,
        year: year || null,
    }).where(sql`${userTable.id} = ${userId}`).returning();

    revalidatePath('/dashboard/students');
    return {
        done: true,
    };
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