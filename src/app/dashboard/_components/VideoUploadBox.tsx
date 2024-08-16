import { Dispatch, SetStateAction, useState } from 'react';
import { Upload, MoreVertical } from 'lucide-react';
import FileUploader from '@/app/_components/FileUploader';
import { Label } from '@/components/ui/label';
import { UppyFile } from '@uppy/core';
import { Meta } from '@uppy/core';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import UploadProgress from '@/components/ui/upload-progress';

interface VideoUploadBoxProps {
    video: { file: UppyFile<Meta, Record<string, never>>, preview: string } | undefined;
    setVideo: Dispatch<SetStateAction<{ file: UppyFile<Meta, Record<string, never>>, preview: string } | undefined>>;
    uploadProgress: number;
}

export default function VideoUploadBox({ video, setVideo, uploadProgress }: VideoUploadBoxProps) {
    const [open, setOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            <FileUploader open={open} setOpen={setOpen} setState={setVideo} format='vid' limit={1} sizeLimit={100 * 1024 * 1024} />
            <div className='flex flex-col gap-1 h-full'>
                <div
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-500 transition ease-in-out hover:border-black rounded-lg relative"
                    onClick={() => { if (!video) setOpen(!open) }}
                    onMouseEnter={() => setIsHovering(true)}
                >
                    <Label
                        htmlFor="video-upload"
                        className={`flex flex-col items-center justify-center w-full h-64 ${!video && 'cursor-pointer'}`}>
                        {video ? (
                            <video className="w-full h-full rounded-md object-cover" controls>
                                <source src={video.preview} type="video/mp4" />
                            </video>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-gray-500">
                                <Upload className="w-12 h-12 mb-2" />
                                <span className="text-sm">Upload Course Video</span>
                                <span className="text-xs text-gray-400">MP4, WEBM up to 100MB</span>
                            </div>
                        )}
                    </Label>

                    {video && isHovering && (
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
                                <DropdownMenuItem onClick={() => setVideo(undefined)}>
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
