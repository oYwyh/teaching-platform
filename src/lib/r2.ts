'use server'

import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { validateRequest } from './auth'
import crypto from 'crypto'
import db from './db'
import { userTable } from './db/schema'
import { revalidatePath } from 'next/cache'
import { sql } from 'drizzle-orm'
import { redirect } from 'next/navigation'

const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
})


const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const maxFileSize = 5 * 1024 * 1024 // 5MB

const acceptedPfpTypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp']
const acceptedTypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp', 'application/pdf']

export async function getPreSignedUrl(
    key: string | '',
    type: string,
    size: number,
    checkSum?: string,
    userId?: string,
    pfp?: boolean,
) {
    const { user } = await validateRequest()

    if (!user) throw new Error('Unauthorized')
    if (!userId) userId = user.id

    if (size > maxFileSize) throw new Error('File size too large')

    if (pfp && !acceptedPfpTypes.includes(type)) throw new Error('Unsupported file type')
    if (!pfp && !acceptedTypes.includes(type)) throw new Error('Unsupported file type')

    const fileName = generateFileName() + `-${key}`;
    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME || '',
        Key: fileName,
        ContentType: type,
        ContentLength: size,
        ChecksumSHA256: checkSum ? checkSum : undefined,
        Metadata: {
            // so we can check which user uploaded it later in the frontend
            userId: userId,
        }
    })

    const signedUrl = await getSignedUrl(S3, putObjectCommand, { expiresIn: 3600 })

    if (pfp) {
        console.log('userId', userId)
        await db.update(userTable).set({ picture: fileName }).where(sql`${userTable.id} = ${userId}`);
    }

    return {
        success: {
            url: signedUrl,
            fileName,
        }
    }
}

export async function deleteFile(name: string, s3: boolean = false) {
    const { user } = await validateRequest()
    if (!user) throw new Error('Unauthorized')

    if (s3) {
        const deleteObjectCommand = new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME || '',
            Key: name
        });

        try {
            await S3.send(deleteObjectCommand);
        } catch (error) {
            console.error(`Error deleting file from S3: ${name}`, error);
        }
    }

    // try {
    //     await db.delete().where(sql`${userMedicalFilesTable.name} = ${name}`);
    // } catch (error) {
    //     console.error(`Error deleting file from database: ${name}`, error);
    // }
}

export async function restoreDefaultPfp(userId?: string) {
    const { user } = await validateRequest()
    if (!user) redirect('/')
    if (!userId) userId = user.id
    await db.update(userTable).set({ picture: 'default.jpg' }).where(sql`${userTable.id} = ${userId}`);
    revalidatePath('/profile')
}

export async function revalidatePathAction(path: string) {
    revalidatePath(path)
}