'use client'

import { getById, getGovernorates, getInstructors, getRegions, getSubjects, getYears } from "@/actions/index.actions";
import { add } from "@/actions/instructor.actions";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";
import { Form, FormItem, FormLabel, FormField as CFormField, FormControl, FormMessage } from "@/components/ui/form";
import FormField from "@/components/ui/formField";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createSchema, TCreateSchema } from "@/schemas/course.schema";
import { CourseContexts, TIndex, TOptions } from "@/types/index.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CurrencyInput from 'react-currency-input-field'
import { currencyLocales, governorates } from "@/constants/index.constant";
import FileUploader from "@/app/_components/FileUploader";
import ThumbnailUploadBox from "@/app/dashboard/_components/ThumbnailUploadBox";
import { computeSHA256 } from "@/lib/funcs";
import { UppyFile } from "@uppy/core";
import { Meta } from "@uppy/core";
import { getPreSignedUrl } from "@/lib/r2";
import VideoUploadBox from "@/app/dashboard/_components/VideoUploadBox";
import { create } from "@/actions/course.ations";
import { redirect } from "next/navigation";

export default function CourseCreatePage() {
    const [open, setOpen] = useState<boolean>();
    const [courseContext, setCourseContext] = useState<CourseContexts>();
    const [selectedRegionId, setSelectedRegionId] = useState<number>();
    const [selectedRegion, setSelectedRegion] = useState<string>();
    const [regions, setRegions] = useState<TOptions>();
    const [years, setYears] = useState<TIndex<TOptions>>();
    const [subjects, setSubjects] = useState<Record<string, TIndex<TOptions>>>();
    const [instructors, setInstructors] = useState<{ label: string; value: number; }[]>();

    const [currency, setCurrency] = useState<string | undefined>();
    const [price, setPrice] = useState<number | string>();

    const [error, setError] = useState<string | undefined>();
    const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState<number>(0);
    const [thumbnail, setThumbnail] = useState<{ file: UppyFile<Meta, Record<string, never>>, preview: string } | undefined>(undefined);
    const [thumbnailUploaded, setThumbnailUploaded] = useState<boolean>(false)
    const [video, setVideo] = useState<any | undefined>(undefined);
    const [videoUploadProgress, setVideoUploadProgress] = useState<number>(0);
    const [videoUploaded, setVideoUploaded] = useState<boolean>(false)

    useEffect(() => {
        const fetchRegions = async () => {
            const regions = await getRegions();
            const years = await getYears();
            const subjects = await getSubjects();
            const instructors = await getInstructors();

            setRegions(regions);
            setYears(years);
            setSubjects(subjects)
            setInstructors(instructors)
        }

        fetchRegions();
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            setCurrency(currencyLocales[selectedRegion].currency);
            form.resetField('year');
            form.resetField('subject');
        }
    }, [selectedRegion])

    useEffect(() => {
        async function fetchRegion() {
            if (selectedRegionId) {
                const region = await getById(selectedRegionId, 'region', true)
                setSelectedRegion(region)
            }
        }
        if (selectedRegionId) {
            fetchRegion()
        }
    }, [selectedRegionId])

    const form = useForm<TCreateSchema>({
        resolver: zodResolver(createSchema)
    })

    const onSubmit = async (data: { [key: string]: string | number } & TCreateSchema) => {
        try {
            // Validate required fields
            if (!price) {
                form.setError('price', { message: 'Please enter price' });
                return;
            }

            // make thumbnail and video required
            // if (!thumbnail && !thumbnailUploaded) {
            //     setError('Please upload a thumbnail');
            //     return;
            // }

            // if (!video && !videoUploaded) {
            //     setError('Please upload a video');
            //     return;
            // }

            // Upload thumbnail if needed
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
                            setThumbnailUploaded(true);
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
                            data['promo'] = fileName;
                            setError('')
                            setVideoUploaded(true);
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
            // Proceed with form submission
            const columnsToDelete = ['instructor'];
            const columnsToAdd = { price, currency };

            for (const column of columnsToDelete) {
                delete data[column];
            }

            for (const column in columnsToAdd) {
                data[column] = columnsToAdd[column];
            }

            await create(data);
            return redirect("/dashboard/courses");
        } catch (e) {
            console.log(e)
        }
    };


    return (
        <div>
            <div className="grid grid-cols-3 gap-4 p-4">
                <div className="flex flex-col gap-5 col-span-1">
                    <ThumbnailUploadBox thumbnail={thumbnail} setThumbnail={setThumbnail} uploadProgress={thumbnailUploadProgress} />
                    <VideoUploadBox video={video} setVideo={setVideo} uploadProgress={videoUploadProgress} />
                </div>
                <Form {...form}>
                    <ScrollArea className="mt-5 overflow-y-scroll h-fit w-full col-span-2 rounded-md border p-4">
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-row gap-3 item-center">
                                <FormField form={form} name="context" select="courseContext" setState={setCourseContext} label={'This course is for'} />
                            </div>
                            {courseContext && (
                                <>
                                    <FormField form={form} name="title" />
                                    <FormField form={form} name="description" textarea />
                                    <FormField form={form} name='instructorId' select={'instructor'} instructors={instructors} label="Instructor" />
                                    <div className="flex flex-row gap-3 item-center">
                                        <FormField form={form} name='regionId' select='region' regions={regions} setState={setSelectedRegionId} label="Region" />
                                        {selectedRegion && (
                                            <>
                                                <FormField form={form} name='yearId' select='year' years={years} region={selectedRegion} label="Year" />
                                                <FormField form={form} name='subjectId' select='subject' subjects={subjects} region={selectedRegion} label="Subject" />
                                            </>
                                        )}
                                    </div>
                                    {selectedRegion && currencyLocales.hasOwnProperty(selectedRegion) && (
                                        <div>
                                            <CFormField
                                                control={form.control}
                                                name="price"
                                                render={({ field: { onChange, value } }) => (
                                                    <>
                                                        <FormLabel>Price</FormLabel>
                                                        <FormControl>
                                                            <CurrencyInput
                                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                id="price"
                                                                placeholder="price"
                                                                intlConfig={currencyLocales[selectedRegion]}
                                                                onValueChange={(value) => setPrice(value)}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </>
                                                )}
                                            />
                                        </div>
                                    )}
                                    <FormField form={form} name='scheduledPublishDate' type='date' label="Scheduled Publish Date" optional />
                                    <FormField form={form} name='scheduledUnpublishDate' type='date' label="Scheduled Unpublish Date" optional />
                                    <FormField form={form} name='status' select='courseStatus' defaultValue="unpublished" />
                                    {error && (
                                        <p className="text-red-500 mt-2">{error}</p>
                                    )}
                                    <Button className="mt-2 w-full" type='submit'>Add</Button>
                                </>
                            )}
                        </form>
                    </ScrollArea>
                </Form>
            </div>
            {/* <Sheet open={open} onOpenChange={setOpen} side={'bottom'} className="h-screen">
                <SheetTrigger
                    className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90'
                >Create Course</SheetTrigger>
                <SheetContent side={'bottom'} className="h-screen">
                    <SheetHeader>
                        <SheetTitle>Course Creation Page</SheetTitle>
                        <SheetDescription>
                            Create a new course
                        </SheetDescription>
                    </SheetHeader> */}
            {/* </SheetContent>
            </Sheet> */}
        </div>
    )
}