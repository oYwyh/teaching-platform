'use server'

import { uniqueColumnsValidations } from '@/actions/index.actions';
import { lucia, validateRequest } from '@/lib/auth';
import db from '@/lib/db';
import { governorateTable, regionTable, roleTable, studentTable, userTable } from '@/lib/db/schema';
import { TCheckSchema, TLoginSchema, TRegisterSchema } from '@/schemas/auth.schema'
import { columnsRegex, TUser } from '@/types/index.type';
import { hash, verify } from "@node-rs/argon2";
import { error } from 'console';
import { eq, sql } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { string } from 'zod';

export const check = async (data: TCheckSchema) => {

    const { credential } = data;

    const columns = ['email', 'phone'] as const;

    const credentialExists = await db.query.userTable.findFirst({
        columns: {
            email: true,
            phone: true,
        },
        where: (fields, operators) => {
            const { eq, or } = operators;
            return or(...columns.map(column => eq(fields[column], credential)));
        }
    });

    if (credentialExists) {
        const matchedColumn = columns.find(column => credentialExists[column] === credential);
        return {
            column: matchedColumn,
            exists: true,
        };
    } else {
        const isEmail = columnsRegex.email.test(credential);
        const isPhoneNumber = columnsRegex.phone.test(credential);

        if (isEmail) {
            return {
                column: 'email',
                exists: false,
            };
        } else if (isPhoneNumber) {
            return {
                column: 'phone',
                exists: false,
            };
        } else {
            return {
                column: 'unknown',
                exists: false,
                error: 'Please enter valid credential'
            };
        }
    }
}

export const register = async (data: TRegisterSchema) => {
    const { firstname, lastname, email, phone, parentPhone, region, governorate, exam, type, year, password } = data

    const unqiueValidation = await uniqueColumnsValidations({ email, phone, parentPhone })

    if (unqiueValidation?.error) {
        return {
            error: unqiueValidation?.error
        }
    }

    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    const userId = generateIdFromEntropySize(10); // 16 characters long

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
        exam,
        type,
        userId: userId
    })

    await db.insert(roleTable).values({
        userId: userId,
        role: 'user'
    })

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/");
}

export async function login(data: TLoginSchema) {

    const { column, credential, password } = data;

    const existingUser = await db.query.userTable.findFirst({
        where: (userTable: { [key: string]: any }, funcs) => funcs.eq(userTable[column], credential),
    });

    if (existingUser) {
        // const validPassword = await verify(existingUser.password, password, {
        //     memoryCost: 19456,
        //     timeCost: 2,
        //     outputLen: 32,
        //     parallelism: 1,
        // });

        // if (!validPassword) {
        //     return {
        //         error: 'Invalid Password'
        //     }
        // }

        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
        return redirect("/");
    } else {
        throw new Error('Invalid email or password');
    }
}

export const logout = async () => {
    const { session } = await validateRequest();
    if (!session) {
        return {
            error: "Unauthorized"
        };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/auth");
}