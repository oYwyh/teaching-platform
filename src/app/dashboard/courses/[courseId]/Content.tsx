'use client';

import { useState } from 'react';
import AddVideo from "@/app/dashboard/courses/[courseId]/AddVideo";
import CreatePlaylist from "@/app/dashboard/courses/[courseId]/CreatePlaylist";
import { MonitorPlay, ChevronDown, ChevronRight, Paperclip, NotebookPen, File } from "lucide-react";
import Image from "next/image";
import { TExam, TFile, TPlaylist, TVideo } from '@/types/index.type';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'; // Adjust the import based on the actual path
import AddFile from '@/app/dashboard/courses/[courseId]/AddFile';
import Link from 'next/link';
import CreateExam from '@/app/dashboard/courses/[courseId]/CreateExam';

interface VideosProps {
    playlists: TPlaylist[];
    courseId: number;
    videos: TVideo[];
    files: TFile[];
    exams: TExam[];
}

export default function Videos({ playlists, courseId, videos, files, exams }: VideosProps) {
    const videosWithoutPlaylist = videos.filter(video => !video.playlistIds);
    const filesWithoutPlaylist = files.filter(file => !file.playlistIds);
    const examsWithoutPlaylist = exams.filter(exam => !exam.playlistIds);

    // Merge playlists and videos without playlists
    const items = [
        ...videosWithoutPlaylist.map(video => ({ context: 'video', ...video })),
        ...filesWithoutPlaylist.map(file => ({ context: 'file', ...file })),
        ...examsWithoutPlaylist.map(exam => ({ context: 'exam', ...exam })),
        ...playlists.map(playlist => ({ context: 'playlist', ...playlist })).filter(playlist => playlist.videos.length > 0 || playlist.files.length > 0 || playlist.exams.length > 0),
    ];


    // Sort by releaseDate
    items.sort((a, b) => new Date(a.releasedAt).getTime() - new Date(b.releasedAt).getTime());

    return (
        <div className="col-span-2 space-y-4">
            <div className="flex flex-row gap-2 justify-end">
                <CreateExam playlists={playlists} courseId={courseId} />
                <AddFile playlists={playlists} courseId={courseId} />
                <AddVideo playlists={playlists} courseId={courseId} />
                <CreatePlaylist courseId={courseId} />
            </div>

            {items.map(item => {
                if (item.context === 'video') {
                    const video = item as TVideo;
                    const thumbnail = video.thumbnail !== 'thumbnail.jpg' ? `${process.env.NEXT_PUBLIC_R2_FILES_URL}/${video.thumbnail}` : 'thumbnail.jpg';
                    return (
                        <div
                            key={video.id}
                            className="flex flex-row justify-between items-center gap-2 p-4 bg-white border rounded-md transition-all ease-in-out hover:bg-gray-100 cursor-pointer"
                            onClick={() => console.log(video)}
                        >
                            <div className="flex justify-between">
                                <div className="flex flex-row gap-2">
                                    <Image
                                        src={thumbnail}
                                        alt={video.title}
                                        width={80}
                                        height={80}
                                        className="rounded-md"
                                    />
                                    <div className="flex flex-col gap-2">
                                        <div className="font-bold">{video.title}</div>
                                        <div className="text-sm text-gray-500">{video.description}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <MonitorPlay />
                            </div>
                        </div>
                    );
                } else if (item.context === 'file') {
                    const file = item as TFile;

                    return (
                        <div
                            key={file.id}
                            className="flex flex-row justify-between items-center gap-2 p-4 bg-white border rounded-md transition-all ease-in-out hover:bg-gray-100 cursor-pointer"
                            onClick={() => console.log(file)}
                        >
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-2">
                                    <div className="font-bold">{file.title}</div>
                                </div>
                            </div>
                            <div>
                                <File />
                            </div>
                        </div>
                    )
                } else if (item.context === 'exam') {
                    const exam = item as TExam;
                    return (
                        <div
                            key={exam.id}
                            className="flex flex-row justify-between items-center gap-2 p-4 bg-white border rounded-md transition-all ease-in-out hover:bg-gray-100 cursor-pointer"
                            onClick={() => console.log(exam)}
                        >
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-2">
                                    <div className="font-bold">{exam.title}</div>
                                </div>
                            </div>
                            <div>
                                <NotebookPen />
                            </div>
                        </div>
                    )
                } else if (item.context === 'playlist') {
                    const playlist = item as TPlaylist;

                    return (
                        <Accordion type="multiple" key={playlist.id} className="mb-4">
                            <AccordionItem value={playlist.id.toString()} className='bg-white rounded-md px-2'>
                                <AccordionTrigger className="flex justify-between items-center p-4 bg-white rounded-md cursor-pointer">
                                    <div className="font-bold">{playlist.title}</div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-2 bg-inherit">
                                    {playlist.videos.map((video: TVideo) => {
                                        const videoSrc = video.thumbnail !== 'thumbnail.jpg' ? `${process.env.NEXT_PUBLIC_R2_FILES_URL}/${video.thumbnail}` : 'thumbnail.jpg';

                                        return (
                                            <div
                                                key={video.id}
                                                className="flex flex-row justify-between items-center shadow-md gap-2 p-4 bg-white border rounded-md transition-all ease-in-out hover:bg-gray-100 cursor-pointer"
                                                onClick={() => console.log(video)}
                                            >
                                                <div className="flex justify-between">
                                                    <div className="flex flex-row gap-2">
                                                        <Image
                                                            src={videoSrc}
                                                            alt={video.title}
                                                            width={80}
                                                            height={80}
                                                            className="rounded-md"
                                                            blurDataURL='default.jpg'
                                                        />
                                                        <div className="flex flex-col gap-2">
                                                            <div className="font-bold">{video.title}</div>
                                                            <div className="text-sm text-gray-500">{video.description}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <MonitorPlay />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {playlist.files.map((file: TFile) => {
                                        return (
                                            <div
                                                key={file.id}
                                                className="flex flex-row justify-between items-center gap-2 p-4 bg-white border rounded-md transition-all ease-in-out hover:bg-gray-100 cursor-pointer"
                                                onClick={() => console.log(file)}
                                            >
                                                <div className="flex justify-between">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="font-bold">{file.title}</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <MonitorPlay />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    );
                }
            })}
        </div>
    );
}
