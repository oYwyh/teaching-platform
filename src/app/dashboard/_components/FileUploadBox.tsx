import { Dispatch, SetStateAction, useState } from 'react';
import { Upload, MoreVertical } from 'lucide-react';
import FileUploader from '@/app/_components/FileUploader';
import { Label } from '@/components/ui/label';
import { UppyFile } from '@uppy/core';
import { Meta } from '@uppy/core';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import UploadProgress from '@/components/ui/upload-progress';
import Image from 'next/image';
import { fileTypes, imageTypes } from '@/constants/index.constant';
import Pdf from '@/app/_components/Pdf';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface FileUploadBoxProps {
    file: { file: UppyFile<Meta, Record<string, never>>, preview: string } | undefined;
    setFile: Dispatch<SetStateAction<{ file: UppyFile<Meta, Record<string, never>>, preview: string } | undefined>>;
    uploadProgress: number;
}

export default function FileUploadBox({ file, setFile, uploadProgress }: FileUploadBoxProps) {
    const [open, setOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            <FileUploader open={open} setOpen={setOpen} setState={setFile} format='file' limit={1} sizeLimit={100 * 1024 * 1024} />
            <div className='flex flex-col gap-1 h-full'>
                <div
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-500 transition ease-in-out hover:border-black rounded-lg relative"
                    onClick={() => { if (!file) setOpen(!open) }}
                    onMouseEnter={() => setIsHovering(true)}
                >
                    <Label
                        htmlFor="file-upload"
                        className={`flex flex-col items-center justify-center w-full h-64 ${!file && 'cursor-pointer'}`}>
                        {file ? (
                            <>
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
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-gray-500">
                                <Upload className="w-12 h-12 mb-2" />
                                <span className="text-sm">Upload Course File</span>
                                <span className="text-xs text-gray-400">PDF, DOCX, XLSX up to 100MB</span>
                            </div>
                        )}
                    </Label>

                    {file && isHovering && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div
                                    className="absolute top-2 right-2 cursor-pointer"
                                    onClick={(e) => e.stopPropagation()} // Stop event propagation here
                                >
                                    <MoreVertical className="w-6 h-6 text-white bg-black bg-opacity-80 transition ease-in-out hover:bg-opacity-100 rounded-full p-1" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setFile(undefined)}>
                                    Remove
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setOpen(true)}>
                                    Reselect
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                {uploadProgress > 0 && (
                    <UploadProgress uploadProgress={uploadProgress} />
                )}
            </div>
        </>
    );
}
