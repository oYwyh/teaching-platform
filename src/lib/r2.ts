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
import axios from 'axios'
import { fileTypes, imageTypes, videoTypes } from '@/constants/index.constant'

const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
})


const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const acceptedTypes = [...imageTypes, ...fileTypes]
const acceptedImgTypes = [...imageTypes]
const acceptedVidTypes = [...videoTypes]

export async function getPreSignedUrl({
    key,
    type,
    size,
    sizeLimit = 5 * 1024 * 1024,
    format = 'img',
    checkSum,
    userId,
    pfp,
}: {
    key: string | '',
    type: string,
    size: number,
    format: 'img' | 'vid' | 'file'
    sizeLimit?: number,
    checkSum?: string,
    userId?: string,
    pfp?: boolean,
}) {
    const { user } = await validateRequest()

    if (!user) throw new Error('Unauthorized')
    if (!userId) userId = user.id

    if (size > sizeLimit) throw new Error('File size too large')

    if (pfp && !acceptedImgTypes.includes(type)) throw new Error('Unsupported file type')
    if (!pfp && format === 'img' && !acceptedImgTypes.includes(type)) throw new Error('Unsupported file type')
    if (format === 'vid' && !acceptedVidTypes.includes(type)) throw new Error('Unsupported file type')
    if (format === 'file' && !acceptedTypes.includes(type)) throw new Error('Unsupported file type')

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

export async function deleteFile(name: string, s3: boolean = true) {
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