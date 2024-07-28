import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import FileUploader from '@/app/_components/FileUploader';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UppyFile } from '@uppy/core';
import { Meta } from '@uppy/core';

interface PromoUploadBoxProps {
    promo: { file: UppyFile<Meta, Record<string, never>>, preview: string } | undefined;
    setPromo: Dispatch<SetStateAction<{ file: UppyFile<Meta, Record<string, never>>, preview: string } | undefined>>;
    uploadProgress: number;
}

export default function PromoUploadBox({ promo, setPromo, uploadProgress }: PromoUploadBoxProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <FileUploader open={open} setOpen={setOpen} setState={setPromo} format='vid' limit={1} sizeLimit={100 * 1024 * 1024} />
            <div
                className="flex flex-col items-center justify-center w-full max-w-md mx-auto border border-dashed border-gray-300 rounded-lg"
                onClick={() => setOpen(!open)}

            >
                <Label
                    htmlFor="promo-upload"
                    className="flex flex-col items-center justify-center w-full h-64 cursor-pointer"
                >
                    {promo ? (
                        <video className="w-full h-full rounded-md object-cover" controls>
                            <source src={promo.preview} type="video/mp4" />
                        </video>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500">
                            <Upload className="w-12 h-12 mb-2" />
                            <span className="text-sm">Upload Course Promo</span>
                            <span className="text-xs text-gray-400">MP4, WEBM up to 100MB</span>
                        </div>
                    )}
                </Label>
                {promo && uploadProgress === 0 && (
                    <Button className="mt-2" onClick={() => setPromo(undefined)}>Remove Promo</Button>
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