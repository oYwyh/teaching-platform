'use server'

import db from "@/lib/db";
import { TUpdatePasswordSchema, TUpdateProfileSchema } from "@/schemas/profile.schema";
import { TPasswordSchema } from "@/schemas/index.schema";
import { userTable } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { hash } from "@node-rs/argon2";
import { uniqueColumnsValidations } from "@/actions/index.actions";

export const updateProfile = async (data: TUpdateProfileSchema) => {
    const { id, firstname, lastname, email, phone, parentPhone, governorate } = data;

    // Check if the email exists and belongs to a different user
    const result = await uniqueColumnsValidations(data);
    if (result?.error) return { error: result?.error };

    // Update the user with the new username and email
    const user = await db.update(userTable).set({
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        parentPhone: parentPhone,
        governorate: governorate,
    }).where(sql`${userTable.id} = ${id}`);

    return {
        user: user,
    };
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