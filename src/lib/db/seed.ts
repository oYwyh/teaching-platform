'use server'

import db from "@/lib/db";
import { courseTable, governorateTable, instructorTable, regionTable, sessionTable, studentTable, subjectTable, userTable, yearTable } from "@/lib/db/schema";
import { StudentContexts } from "@/types/index.type";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";

export async function seed() {
    const password = await hash('admin', {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });

    const adminId = generateIdFromEntropySize(10)
    const instructorId = generateIdFromEntropySize(10)
    const schoolStudentId = generateIdFromEntropySize(10)
    const englishExamStudentId = generateIdFromEntropySize(10)

    const users = [
        {
            id: adminId,
            firstname: 'Admin',
            lastname: 'Admin',
            email: 'admin@gmail.com',
            phone: '01024824716',
            regionId: 1,
            governorateId: 1,
            password: password,
            role: 'admin'
        },
        {
            id: instructorId,
            firstname: 'Instructor',
            lastname: 'Instructor',
            email: 'instructor@gmail.com',
            phone: '01024824712',
            regionId: 2,
            governorateId: 2,
            password: password,
            role: 'instructor'
        },
        {
            id: schoolStudentId,
            firstname: 'Student',
            lastname: 'Student',
            email: 'student@gmail.com',
            phone: '01024824711',
            regionId: 1,
            governorateId: 1,
            password: password,
            role: 'user'
        },
        {
            id: englishExamStudentId,
            firstname: 'EnglishExam',
            lastname: 'EnglishExam',
            email: 'englishExam@gmail.com',
            phone: '01024824713',
            regionId: 2,
            governorateId: 3,
            password: password,
            role: 'user'
        },
    ];

    const instructors = [
        {
            id: 1,
            bio: 'bio',
            specialty: 'specialty',
            userId: users[1].id
        }
    ]

    const subjects = [
        {
            id: 1,
            subject: 'ielts',
            context: 'englishExam'
        },
        {
            id: 2,
            subject: 'toefl',
            context: 'englishExam'
        },
        {
            id: 3,
            subject: 'araibc',
            context: 'school',
            regionId: 1
        },
        {
            id: 4,
            subject: 'english',
            context: 'school',
            regionId: 1
        },
        {
            id: 5,
            subject: 'math',
            context: 'school',
            regionId: 2
        },
        {
            id: 6,
            subject: 'english',
            context: 'school',
            regionId: 2
        },
    ]

    const students = [
        {
            id: 1,
            parentPhone: '01558854712',
            yearId: 1,
            subjectId: 3,
            context: 'school',
            userId: users[2].id
        },
        {
            id: 2,
            subjectId: 1,
            context: 'englishExam' as StudentContexts,
            userId: users[3].id
        }
    ]

    const regions = [
        {
            id: 1,
            region: 'egypt',
        },
        {
            id: 2,
            region: 'Kuwait',
        },
    ];

    const governorates = [
        {
            id: 1,
            governorate: 'cairo',
            regionId: 1,
        },
        {
            id: 2,
            governorate: 'giza',
            regionId: 1,
        },
        {
            id: 3,
            governorate: 'kuwait_city',
            regionId: 2,
        },
        {
            id: 4,
            governorate: 'al_jahra',
            regionId: 2,
        },
        {
            id: 5,
            governorate: 'ahmadi',
            regionId: 2,
        },
    ]

    const years = [
        {
            id: 1,
            year: 'first_grade',
            regionId: 1
        },
        {
            id: 2,
            year: 'second_grade',
            regionId: 1
        },
        {
            id: 3,
            year: 'eleventh_grade',
            regionId: 2
        },
        {
            id: 4,
            year: 'twelfth_grade',
            regionId: 2
        },
    ]


    for (const region of regions) {
        await db
            .insert(regionTable)
            .values(region)
    }

    for (const governorate of governorates) {
        await db
            .insert(governorateTable)
            .values(governorate)
    }

    for (const year of years) {
        await db
            .insert(yearTable)
            .values(year)
    }

    for (const subject of subjects) {
        await db
            .insert(subjectTable)
            .values(subject)
    }

    for (const user of users) {
        await db
            .insert(userTable)
            .values(user)
    }

    for (const instructor of instructors) {
        await db
            .insert(instructorTable)
            .values(instructors)
    }



    for (const student of students) {
        await db
            .insert(studentTable)
            .values(student)
    }
    console.log('Database seeded');
}

export async function destroy() {
    await db.delete(userTable).execute();
    await db.delete(regionTable).execute();
    await db.delete(governorateTable).execute();
    await db.delete(yearTable).execute();
    await db.delete(courseTable).execute();
    await db.delete(instructorTable).execute();
    await db.delete(studentTable).execute();
    await db.delete(sessionTable).execute();
    await db.delete(subjectTable).execute();

    console.log('Database destroyed');
}