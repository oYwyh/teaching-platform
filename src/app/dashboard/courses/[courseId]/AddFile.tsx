'use client'

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { TPlaylist } from "@/types/index.type";
import FileUploadBox from "@/app/dashboard/_components/FileUploadBox";
import { UppyFile } from "@uppy/core";
import { Meta } from "@uppy/core";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormField from "@/components/ui/formField";
import { fileTypes, imageTypes } from "@/constants/index.constant";
import Image from "next/image";
import Pdf from "@/app/_components/Pdf";
import Link from "next/link";
import { getPreSignedUrl } from "@/lib/r2";
import { computeSHA256 } from "@/lib/funcs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSchema, TAddSchema } from "@/schemas/file.schema";
import { add } from "@/actions/file.actions";
import SelectPlaylists from "@/app/dashboard/courses/[courseId]/SelectPlaylists";
import UploadProgress from "@/components/ui/upload-progress";

export default function AddFile({ playlists, courseId }: { playlists: TPlaylist[], courseId: number }) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<{ file: UppyFile<Meta, Record<string, never>>, preview: string } | undefined>();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState<string | undefined>();
    const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

    const form = useForm<TAddSchema>({
        resolver: zodResolver(addSchema),
    })

    const onSubmit = async (data: TAddSchema) => {
        if (file) {
            const checkSum = await computeSHA256(file.file.data);
            const signedUrlResult = await getPreSignedUrl({
                key: file.file.source == 'Webcam' ? file.file.name : file.file.data.name,
                type: file.file.data.type,
                size: file.file.data.size,
                checkSum,
                format: 'file',
            });

            if (!signedUrlResult || !signedUrlResult.success) throw new Error('Failed to get sign URL');

            const { url, fileName } = signedUrlResult.success;

            // Perform the actual file upload to the presigned URL
            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', url, true);
                xhr.setRequestHeader('Content-Type', file.file.data.type);

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = Math.round((event.loaded / event.total) * 100);
                        setUploadProgress(percentComplete);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        console.log('File uploaded successfully');
                        data['file'] = fileName;
                        data['type'] = file.file.type
                        data['size'] = file.file.size
                        setError('')
                        resolve();
                    } else {
                        console.log('File upload failed');
                        reject(new Error('File upload failed'));
                    }
                };

                xhr.onerror = () => {
                    console.log('File upload failed');
                    reject(new Error('File upload failed'));
                };

                xhr.send(file.file.data);
            });
        }
        setError('')
        setOpen(false)
        await add(data, selectedPlaylists, courseId)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="px-2 py-1 outline outline-2 shadow-lg outline-white text-white rounded-sm">Add File</DialogTrigger>
            <DialogContent className="w-[80%] h-[90%] flex flex-col gap-5 max-w-full">
                <DialogHeader>
                    <DialogTitle>Add  File</DialogTitle>
                </DialogHeader>
                {!file && (
                    <FileUploadBox file={file} setFile={setFile} uploadProgress={uploadProgress} />
                )}
                {file && (
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 flex flex-col gap-5">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        form={form}
                                        name="title"
                                        defaultValue={file.file.name?.split('.').slice(0, -1).join('.')}
                                    />
                                    <FormField form={form} name='status' select='fileStatus' defaultValue="unpublished" />
                                </form>
                            </Form>
                            <SelectPlaylists form={form} playlists={playlists} courseId={courseId} setSelectedPlaylists={setSelectedPlaylists} />
                        </div>
                        <div className="col-span-1">
                            {imageTypes.find((type) => type === file.file.type) && (
                                <Image
                                    src={file.preview}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '100%', height: 'auto' }}
                                    alt="File Preview"
                                    className="object-cover w-full rounded-md"
                                />

                            )}
                            {file.file.type === 'application/pdf' && (
                                <Pdf file={file.preview} s3={false} />
                            )}
                            {fileTypes.find((type) => type === file.file.type) && file.file.type !== 'application/pdf' && (
                                <Link href={file.preview} target="_blank">
                                    <Button className="w-full">
                                        Show File
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
                {file && (
                    <DialogFooter className="h-full">
                        <div className="w-full flex flex-col gap-2 justify-end items-end">
                            {uploadProgress != 0 && <UploadProgress uploadProgress={uploadProgress} />}
                            {error && <p className="text-red-500">{error}</p>}
                            <Button className="w-[100%]" disabled={uploadProgress != 0} onClick={form.handleSubmit(onSubmit)}>Add</Button>
                        </div>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog >

    )
}