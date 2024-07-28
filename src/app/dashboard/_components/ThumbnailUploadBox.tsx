import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import FileUploader from '@/app/_components/FileUploader';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UppyFile } from '@uppy/core';
import { Meta } from '@uppy/core';

interface ThumbnailUploadBoxProps {
    thumbnail: { file: UppyFile<Meta, Record<string, never>>, preview: string } | undefined;
    setThumbnail: Dispatch<SetStateAction<{ file: UppyFile<Meta, Record<string, never>>, preview: string } | undefined>>;
    uploadProgress: number;
}

export default function ThumbnailUploadBox({ thumbnail, setThumbnail, uploadProgress }: ThumbnailUploadBoxProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <FileUploader open={open} setOpen={setOpen} setState={setThumbnail} limit={1} sizeLimit={10 * 1024 * 1024} />
            <div
                className="flex flex-col items-center justify-center w-full max-w-md mx-auto border border-dashed border-gray-300 rounded-lg"
                onClick={() => setOpen(!open)}

            >
                <Label
                    htmlFor="thumbnail-upload"
                    className="flex flex-col items-center justify-center w-full h-64 cursor-pointer"
                >
                    {thumbnail ? (
                        <Image
                            src={thumbnail.preview}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                            alt="Thumbnail Preview"
                            className="object-cover w-full h-full rounded-md"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500">
                            <Upload className="w-12 h-12 mb-2" />
                            <span className="text-sm">Upload Course Thumbnail</span>
                            <span className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</span>
                        </div>
                    )}
                </Label>
                {thumbnail && uploadProgress === 0 && (
                    <Button className="mt-2" onClick={() => setThumbnail(undefined)}>Remove Thumbnail</Button>
                )}
                {uploadProgress > 0 && (
                    <div className="w-full mt-2">
                        <div className="bg-gray-200 h-2 rounded">
                            <div className="bg-blue-600 h-2 rounded" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                        <span className="text-xs text-gray-500">{uploadProgress}%</span>
                    </div>
                )}
            </div>
        </>
    );
}
