'use client'

import { deleteFile, getPreSignedUrl, restoreDefaultPfp } from "@/lib/r2";
import { Dispatch, SetStateAction, useRef } from "react";
import Uppy, { Meta, UppyFile } from "@uppy/core";
import Webcam from "@uppy/webcam";
import { DashboardModal } from "@uppy/react";
import ImageEditor from "@uppy/image-editor";
import AwsS3, { AwsBody, AwsS3UploadParameters } from '@uppy/aws-s3';

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";
import { revalidatePathAction } from "@/lib/r2";
import { revalidatePath } from "next/cache";

export default function FileUploader(
    {
        open,
        setOpen,
        userId,
        pfp = false,
        picToDelete,
    }
        : {
            open: boolean,
            setOpen: Dispatch<SetStateAction<boolean>>
            userId?: string,
            pfp?: boolean,
            picToDelete?: string,
        }) {
    const files = useRef<string[]>([]);

    const computeSHA256 = async (file: any) => {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    const uppy = new Uppy({
        autoProceed: false,
    }).use(Webcam, {
        modes: ['picture'],
        mirror: false,
        preferredImageMimeType: 'image/jpg',
    }).use(ImageEditor);

    uppy.use(AwsS3, {
        getUploadParameters: async (file: UppyFile<Meta, AwsBody> | File) => {
            if (!file || !file.data) throw new Error('No file found');
            try {
                const checkSum = await computeSHA256(file.data);
                const signedUrlResult = await getPreSignedUrl(
                    file.source == 'Webcam' ? file.name : file.data.name,
                    file.data.type,
                    file.data.size,
                    checkSum,
                    userId ? userId : undefined,
                    pfp ? true : undefined,
                );

                if (!signedUrlResult || !signedUrlResult.success) throw new Error('Failed to get sign url');

                const { url, fileName } = signedUrlResult.success;

                files.current.push(fileName);

                if (picToDelete) {
                    await deleteFile(picToDelete, true);
                }

                return {
                    method: 'PUT',
                    url: url,
                    fields: {},
                    headers: {
                        'Content-Type': file.data.type,
                    }
                }
            } catch (error) {
                console.error("Error in getUploadParameters:", error);
                throw error;
            }
        }
    }).on('complete', async (result) => {
        setOpen(false)
        await revalidatePathAction('/profile');
    }).on('cancel-all', async () => {
        await restoreDefaultPfp(userId);
    }).on('file-added', (file) => {
        if (pfp) {
            if (uppy.getFiles().length > 1) {
                uppy.removeFile(file.id);
            }
        }
    });

    return (
        <>
            <DashboardModal
                id="dashboard"
                closeAfterFinish={true}
                closeModalOnClickOutside={true}
                open={open}
                uppy={uppy}
                proudlyDisplayPoweredByUppy={false}
                showProgressDetails={true}
                theme="dark"
            />
        </>
    );
}
