import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Upload, MoreVertical } from 'lucide-react';
import FileUploader from '@/app/_components/FileUploader';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { UppyFile } from '@uppy/core';
import { Meta } from '@uppy/core';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import UploadProgress from '@/components/ui/upload-progress';

interface ThumbnailUploadBoxProps {
    thumbnail: { file: UppyFile<Meta, Record<string, never>> | undefined, preview: string } | undefined;
    setThumbnail: Dispatch<SetStateAction<{ file: UppyFile<Meta, Record<string, never>> | undefined, preview: string } | undefined>>;
    uploadProgress: number;
}

export default function ThumbnailUploadBox({ thumbnail, setThumbnail, uploadProgress }: ThumbnailUploadBoxProps) {
    const [open, setOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            <FileUploader open={open} setOpen={setOpen} setState={setThumbnail} limit={1} format='img' sizeLimit={10 * 1024 * 1024} />
            <div className='flex flex-col gap-1 w-full justify-center items-center'>
                <div
                    className="flex flex-col items-center justify-center w-fit min-w-80 min-h-[200px] border-2 border-dashed border-gray-500 transition ease-in-out hover:border-black rounded-lg relative"
                    onClick={() => { if (!thumbnail) setOpen(!open) }}
                    onMouseEnter={() => setIsHovering(true)}
                >
                    <Label
                        htmlFor="thumbnail-upload"
                        className={`flex flex-col items-center justify-center w-full ${!thumbnail && 'cursor-pointer'}`}>
                        {thumbnail?.preview != undefined ? (
                            <Image
                                src={thumbnail.preview}
                                width={320}
                                height={320}
                                alt="Thumbnail Preview"
                                className="object-cover rounded-md"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-gray-500">
                                <Upload className="w-12 h-12 mb-2" />
                                <span className="text-sm">Upload Course Thumbnail</span>
                                <span className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</span>
                            </div>
                        )}
                    </Label>

                    {thumbnail?.preview && isHovering && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div
                                    className="absolute top-2 right-2 cursor-pointer"
                                    onClick={(e) => e.stopPropagation()} // Stop event propagation here
                                >
                                    <MoreVertical className="w-6 h-6 text-white bg-black bg-opacity-60 transition ease-in-out hover:bg-opacity-100 rounded-full p-1" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setThumbnail(undefined)}>
                                    Remove
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setOpen(true)}>
                                    Reselect
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                    <UploadProgress uploadProgress={uploadProgress} />
                )}
            </div>
        </>
    );
}
