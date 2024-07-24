'use server'

import { uniqueColumnsValidations } from "@/actions/index.actions";
import db from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { TAddSchema, TEditSchema, TPasswordSchema } from "@/schemas/dashboard.schema";
import { hash } from "@node-rs/argon2";
import { sql } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";

export async function add(
    data: TAddSchema,
) {
    const { firstname, lastname, email, phone, parentPhone, governorate, password } = data

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
        parentPhone,
        governorate,
        password: passwordHash,
    })

    revalidatePath('/dashboard/students');
    return {
        done: true,
    }
}

export async function edit(
    data: any,
    userId: string,
) {
    const { firstname, lastname, email, phone, parentPhone, governorate } = data

    console.log(data)

    const unqiueValidation = await uniqueColumnsValidations(data)

    if (unqiueValidation?.error) {
        return {
            error: unqiueValidation?.error
        }
    }
    await db.update(userTable).set({
        id: userId,
        firstname,
        lastname,
        email,
        phone,
        parentPhone,
        governorate,
    }).where(sql`${userTable.id} = ${userId}`).returning();


    revalidatePath('/dashboard/students')
    return {
        done: true,
    }
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


export async function deleteUser(id: string | number) {

    const user = await db.delete(userTable).where(sql`${userTable.id} = ${id}`);

    if (user) {
        revalidatePath('/dashboard/students');
        return {
            done: true
        }
    }
}