'use server'

import db from "@/lib/db";
import { TUpdatePasswordSchema, TUpdateProfileSchema } from "@/schemas/profile.schema";
import { TPasswordSchema } from "@/schemas/index.schema";
import { instructorTable, roleTable, studentTable, userTable } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { hash } from "@node-rs/argon2";
import { getUser, uniqueColumnsValidations } from "@/actions/index.actions";
import { revalidatePath } from "next/cache";
import { ReceiptRussianRuble } from "lucide-react";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TInstructor, TStudent, TUser } from "@/types/index.type";

export const updateProfile = async (data: TUpdateProfileSchema) => {
    const { id, firstname, lastname, email, phone, parentPhone, year, region, type, bio, specialty, exam, governorate } = data;
    const { user } = await validateRequest();
    if (!user) redirect('/auth')
    const userId = id ? id : user.id

    // Check if the email exists and belongs to a different user
    const result = await uniqueColumnsValidations(data, id);
    if (result?.error) return { error: result?.error };

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

    // Update studentTable
    const studentUpdateData: Partial<TStudent> = {};
    if (parentPhone !== undefined && parentPhone !== null) studentUpdateData.parentPhone = parentPhone;
    if (year !== undefined && year !== null) studentUpdateData.year = year;
    if (exam !== undefined && exam !== null) studentUpdateData.exam = exam;
    if (type !== undefined && type !== null) studentUpdateData.type = type;

    if (Object.keys(studentUpdateData).length > 0) {
        await db.update(studentTable).set(studentUpdateData).where(sql`${studentTable.userId} = ${userId}`).returning();
    }

    revalidatePath('/profile');
};


export const updatePassword = async (data: TUpdatePasswordSchema) => {
    const { id, password } = data;
    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });
    const result = await db.update(userTable).set({ password: passwordHash }).where(sql`${userTable.id} = ${id}`).returning();

    if (result) {
        return {
            done: true
        }
    } else {
        throw new Error('Failed to update password');
    }
}