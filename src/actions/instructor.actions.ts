'use server'

import { uniqueColumnsValidations } from "@/actions/index.actions";
import db from "@/lib/db";
import { instructorTable, roleTable, studentTable, userTable } from "@/lib/db/schema";
import { TAddSchema, TEditSchema, TPasswordSchema } from "@/schemas/instructor.schema";
import { TInstructor, TUser } from "@/types/index.type";
import { hash } from "@node-rs/argon2";
import { sql } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";


export async function add(
    data: TAddSchema,
) {
    const { firstname, lastname, email, phone, regionId, governorateId, bio, specialty, password } = data

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
        regionId,
        governorateId,
        password: passwordHash,
    });

    await db.insert(instructorTable).values({
        bio,
        specialty,
        userId: userId
    })

    await db.insert(roleTable).values({
        userId: userId,
        role: 'instructor'
    })


    revalidatePath('/dashboard/instructors');
}

export async function edit(data: any, userId: string) {
    const { firstname, lastname, email, phone, region, governorate, bio, specialty } = data

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

    // Update instructorTable
    const instructorUpdateData: Partial<TInstructor> = {};
    if (bio !== undefined && bio !== null) instructorUpdateData.bio = bio;
    if (specialty !== undefined && specialty !== null) instructorUpdateData.specialty = specialty;

    if (Object.keys(instructorUpdateData).length > 0) {
        await db.update(instructorTable).set(instructorUpdateData).where(sql`${instructorTable.userId} = ${userId}`).returning();
    }

    revalidatePath('/dashboard/instructors');
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