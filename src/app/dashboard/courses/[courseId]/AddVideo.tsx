'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import FileUploader from "@/app/_components/FileUploader";
import VideoUploadBox from "@/app/dashboard/_components/VideoUploadBox";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/formField";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { addSchema, TAddSchema } from "@/schemas/video.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField as CFormField, FormItem, FormDescription, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import ThumbnailUploadBox from "@/app/dashboard/_components/ThumbnailUploadBox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPreSignedUrl } from "@/lib/r2";
import { computeSHA256 } from "@/lib/funcs";
import UploadProgress from "@/components/ui/upload-progress";
import { add } from "@/actions/video.actions";
import { TPlaylist } from "@/types/index.type";
import Context from "@/components/ui/context";
import { Checkbox } from "@/components/ui/checkbox";
import CreatePlaylist from "@/app/dashboard/courses/[courseId]/CreatePlaylist";
import SelectPlaylists from "@/app/dashboard/courses/[courseId]/SelectPlaylists";

export default function ({ playlists, courseId }: { playlists: TPlaylist[], courseId: number }) {
    const [videoUploadProgress, setVideoUploadProgress] = useState<number>(0)
    const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState<number>(0)
    const [video, setVideo] = useState<any | undefined>(undefined);
    const [thumbnail, setThumbnail] = useState<any | undefined>(undefined);
    const [error, setError] = useState<string | undefined>();
    const [open, setOpen] = useState(false);
    const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

    const form = useForm<TAddSchema>({
        resolver: zodResolver(addSchema),
    })

    const playlistsForm = useForm()

    const onSubmit = async (data: TAddSchema) => {
        if (thumbnail) {
            const checkSum = await computeSHA256(thumbnail.file.data);
            const signedUrlResult = await getPreSignedUrl({
                key: thumbnail.file.source == 'Webcam' ? thumbnail.file.name : thumbnail.file.data.name,
                type: thumbnail.file.data.type,
                size: thumbnail.file.data.size,
                checkSum,
                format: 'img',
            });

            if (!signedUrlResult || !signedUrlResult.success) throw new Error('Failed to get sign URL');

            const { url, fileName } = signedUrlResult.success;

            // Perform the actual file upload to the presigned URL
            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', url, true);
                xhr.setRequestHeader('Content-Type', thumbnail.file.data.type);

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = Math.round((event.loaded / event.total) * 100);
                        setThumbnailUploadProgress(percentComplete);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        console.log('Thumbnail uploaded successfully');
                        data['thumbnail'] = fileName;
                        setError('')
                        resolve();
                    } else {
                        console.log('Thumbnail upload failed');
                        reject(new Error('Thumbnail upload failed'));
                    }
                };

                xhr.onerror = () => {
                    console.log('Thumbnail upload failed');
                    reject(new Error('Thumbnail upload failed'));
                };

                xhr.send(thumbnail.file.data);
            });
        }

        if (video) {
            const checkSum = await computeSHA256(video.file.data);
            const signedUrlResult = await getPreSignedUrl({
                key: video.file.name,
                type: video.file.data.type,
                size: video.file.data.size,
                checkSum,
                format: 'vid',
            });

            if (!signedUrlResult || !signedUrlResult.success) throw new Error('Failed to get sign URL');

            const { url, fileName } = signedUrlResult.success;

            // Perform the actual file upload to the presigned URL
            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', url, true);
                xhr.setRequestHeader('Content-Type', video.file.data.type);

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = Math.round((event.loaded / event.total) * 100);
                        setVideoUploadProgress(percentComplete);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        console.log('Video uploaded successfully');
                        data['video'] = fileName;
                        setError('')
                        resolve();
                    } else {
                        console.log('Video upload failed');
                        reject(new Error('Video upload failed'));
                    }
                };

                xhr.onerror = () => {
                    console.log('Video upload failed');
                    reject(new Error('Video upload failed'));
                };

                xhr.send(video.file.data);
            });
        }
        setError('')

        setOpen(false)
        await add(data, selectedPlaylists, courseId)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="px-2 py-1 outline outline-2 shadow-lg outline-white text-white rounded-sm">Add video</DialogTrigger>
            <DialogContent className="w-[80%] h-[90%] flex flex-col gap-5 max-w-full">
                <DialogHeader>
                    <DialogTitle>Add  video</DialogTitle>
                </DialogHeader>
                {!video && (
                    <div className="h-full">
                        <div className="w-[100%] h-[100%] flex flex-col gap-2">
                            <VideoUploadBox video={video} setVideo={setVideo} uploadProgress={videoUploadProgress} />
                        </div>
                    </div>
                )}
                {video && (
                    <ScrollArea>
                        <div className="h-full">
                            <div className="flex flex-col gap-3 justify-between h-[100%]">
                                <div className="flex flex-col gap-3">
                                    <h1 className="font-bold text-2xl">Details</h1>
                                    <div className="grid grid-cols-3 gap-5">
                                        <div className="col-span-2 flex flex-col gap-5 h-full">
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                                    <div className="flex flex-col gap-3">
                                                        <FormField
                                                            form={form}
                                                            name="title"
                                                            defaultValue={video.file.name.split('.').slice(0, -1).join('.')}
                                                        />
                                                        <FormField form={form} name="description" textarea />
                                                        <FormField form={form} name='status' select='videoStatus' defaultValue="unpublished" />
                                                    </div>
                                                </form>
                                            </Form>
                                            <SelectPlaylists form={form} playlists={playlists} courseId={courseId} setSelectedPlaylists={setSelectedPlaylists} />
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-row items-center gap-2">
                                                    <p className="font-bold text-2xl">Thumbnail</p>
                                                    <Context size={24} label="optional" />
                                                </div>
                                                <div className="w-[300px] h-full">
                                                    <ThumbnailUploadBox thumbnail={thumbnail} setThumbnail={setThumbnail} uploadProgress={thumbnailUploadProgress} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1 h-fit flex flex-col gap-1">
                                            <video className="w-[100%] h-[100%] rounded-md object-cover" controls>
                                                <source src={video.preview} type="video/mp4" />
                                            </video>
                                            {videoUploadProgress != 0 && <UploadProgress uploadProgress={videoUploadProgress} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                )}
                {video && (
                    <DialogFooter>
                        <div className="w-full">
                            {error && <p className="text-red-500">{error}</p>}
                            <Button className="w-[100%]" disabled={videoUploadProgress != 0} onClick={form.handleSubmit(onSubmit)}>Add</Button>
                        </div>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog >
    )
}