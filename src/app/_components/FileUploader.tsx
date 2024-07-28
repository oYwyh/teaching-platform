'use client'

import { deleteFile, getPreSignedUrl, restoreDefaultPfp, uploadFileFromUrl } from "@/lib/r2";
import { Dispatch, SetStateAction, useRef } from "react";
import Uppy, { Meta, UppyFile } from "@uppy/core";
import Webcam from "@uppy/webcam";
import { DashboardModal } from "@uppy/react";
import ImageEditor from "@uppy/image-editor";
import AwsS3, { AwsBody, AwsS3UploadParameters } from '@uppy/aws-s3';
import Url from '@uppy/url';

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";
import { revalidatePathAction } from "@/lib/r2";
import { revalidatePath } from "next/cache";
import { computeSHA256 } from "@/lib/funcs";
import { RequestOptions } from "https";

export default function FileUploader(
    {
        open,
        setOpen,
        userId,
        limit,
        setState,
        sizeLimit,
        pfp = false,
        picToDelete,
        format = 'img'
    }
        : {
            open: boolean,
            setOpen: Dispatch<SetStateAction<boolean>>,
            setState?: Dispatch<SetStateAction<{ file: UppyFile<Meta, Record<string, never>>, preview: string } | undefined>>;
            limit?: number,
            sizeLimit?: number,
            userId?: string,
            pfp?: boolean,
            picToDelete?: string,
            format?: 'img' | 'vid',
        }) {
    const files = useRef<string[]>([]);

    const uppy = new Uppy({
        autoProceed: false,
    }).use(ImageEditor).use(Url, { companionUrl: '/' });

    if (format == 'img') {
        uppy.use(Webcam, {
            modes: ['picture'],
            mirror: false,
            preferredImageMimeType: 'image/jpg',
        })
    }

    if (format == 'vid') {
        uppy.use(Webcam, {
            modes: ['video-audio'],
            mirror: false,
            preferredImageMimeType: 'video/mp4',
        })
    }

    uppy.use(AwsS3, {
        getUploadParameters: async (file: UppyFile<Meta, AwsBody>) => {
            if (!file || !file.data) throw new Error('No file found');
            try {
                const checkSum = await computeSHA256(file.data);

                // Strip out codec information from the MIME type
                const fileType = file.data.type.split(';')[0];

                const signedUrlResult = await getPreSignedUrl({
                    key: file.source == 'Webcam' ? file.name : file.data.name,
                    type: fileType,
                    size: file.data.size,
                    sizeLimit: sizeLimit ? sizeLimit : undefined,
                    format: format,
                    checkSum: checkSum,
                    userId: userId ? userId : undefined,
                    pfp: pfp ? true : undefined,
                })

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
                        'Content-Type': fileType,
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
        if (pfp) {
            await restoreDefaultPfp(userId);
        }
    }).on('file-added', (file) => {
        // Create a copy of the file with the modified type
        const updatedFile = {
            ...file,
            data: new Blob([file.data], { type: file.data.type.split(';')[0] }) // Use the cleaned type here
        };
        if (format === 'vid' && setState) {
            const videoUrl = URL.createObjectURL(updatedFile.data); // Use the updated file's data for preview
            setState({ file: updatedFile, preview: videoUrl }); // Set state with updated file
            setOpen(false);
        }

        if (limit) {
            if (uppy.getFiles().length > limit) {
                uppy.removeFile(file.id);
            }
        }
    }).on('thumbnail:generated', (file, preview) => {
        if (format == 'img' && setState) {
            setState({ file, preview })
            setOpen(false)
        }
    })

    const handleUrlUpload = async (url) => {
        try {
            const fileName = await uploadFileFromUrl({ fileUrl: url, userId, pfp, format });
            console.log('File uploaded from URL:', fileName);
            setOpen(false); // Close the modal after successful upload
        } catch (error) {
            console.error('Error uploading file from URL:', error);
        }
    };

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