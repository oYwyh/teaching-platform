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

const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
})


const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const acceptedPfpTypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp']
const acceptedTypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp', 'application/pdf']
const acceptedVidTypes = ['video/mp4', 'video/webm']

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
    format: 'img' | 'vid'
    sizeLimit?: number,
    checkSum?: string,
    userId?: string,
    pfp?: boolean,
}) {
    const { user } = await validateRequest()

    if (!user) throw new Error('Unauthorized')
    if (!userId) userId = user.id

    if (size > sizeLimit) throw new Error('File size too large')

    if (pfp && !acceptedPfpTypes.includes(type)) throw new Error('Unsupported file type')
    if (!pfp && format === 'img' && !acceptedTypes.includes(type)) throw new Error('Unsupported file type')
    if (!pfp && format === 'vid' && !acceptedVidTypes.includes(type)) throw new Error('Unsupported file type')

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

export async function uploadFileFromUrl({ fileUrl, userId, pfp, format = 'img' }: { fileUrl: string, userId?: string, pfp?: boolean, format?: 'img' | 'vid' }) {
    try {
        console.log('fileUrl', fileUrl)
        const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
        const fileBuffer = Buffer.from(response.data, 'binary');
        const fileType = response.headers['content-type'];
        const fileName = fileUrl.split('/').pop();
        const size = fileBuffer.length;

        const checkSum = crypto.createHash('sha256').update(fileBuffer).digest('hex');
        const signedUrlResult = await getPreSignedUrl({ key: fileName, type: fileType, size, format, checkSum, userId, pfp });

        if (!signedUrlResult.success) throw new Error('Failed to get signed URL');

        await axios.put(signedUrlResult.success.url, fileBuffer, {
            headers: { 'Content-Type': fileType, 'Content-Length': size },
        });

        return signedUrlResult.success.fileName;
    } catch (error) {
        console.error('Error uploading file from URL:', error);
        throw error;
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