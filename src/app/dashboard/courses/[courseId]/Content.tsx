'use client';

import { useEffect, useState } from 'react';
import AddVideo from "@/app/dashboard/courses/[courseId]/AddVideo";
import CreatePlaylist from "@/app/dashboard/courses/[courseId]/CreatePlaylist";
import { MonitorPlay, ChevronDown, ChevronRight, Paperclip, NotebookPen, File, Link2, GripVertical } from "lucide-react";
import Image from "next/image";
import { TExam, TFile, TLink, TPlaylist, TVideo } from '@/types/index.type';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'; // Adjust the import based on the actual path
import AddFile from '@/app/dashboard/courses/[courseId]/AddFile';
import Link from 'next/link';
import CreateExam from '@/app/dashboard/courses/[courseId]/CreateExam';
import AddLink from './AddLink';
import { useRouter } from 'next/navigation';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverlay,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Play } from 'next/font/google';
import { v4 as uuidv4 } from 'uuid';
import { randomUUID } from 'crypto';
import { updateItemOrder } from '@/actions/course.ations';
import { tablesMap } from '@/constants/index.constant';

interface ItemCardProps {
    id: number;
    title: string;
    description?: string;
    icon: React.ReactNode;
    thumbnail?: string;
    onClick: () => void;
}


const ItemCard = ({ id, title, description, thumbnail, icon, onClick }: ItemCardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-4 p-4 bg-white border rounded-md hover:bg-gray-100 cursor-pointer"
            onClick={onClick}
        >
            <div className='flex flex-row gap-2 flex-1'>
                {thumbnail && (
                    <Image
                        src={thumbnail}
                        alt={title}
                        width={80}
                        height={80}
                        className="rounded-md"
                    />
                )}
                <div className="flex flex-col gap-2">
                    <div className="font-bold">
                        {title.length > 20 ? `${title.slice(0, 20)}...` : title}
                    </div>
                    {description && <div className="text-sm text-gray-500">
                        {description.length > 40 ? `${description.slice(0, 40)}...` : description}
                    </div>}
                </div>
            </div>
            <div
                className='flex-1'
            >
                <div
                    {...attributes}
                    {...listeners}
                    className='w-fit p-2 transition-all hover:bg-gray-300 rounded-md'
                >
                    <GripVertical className="cursor-grab" />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 flex-none">
                {icon}
            </div>
        </div>
    );
};


const PlaylistCard = ({ playlist }: { playlist: TPlaylist }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: playlist.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        setItems([
            ...playlist.videos.map(video => ({ context: 'video', ...video })),
            ...playlist.files.map(file => ({ context: 'file', ...file })),
            ...playlist.links.map(link => ({ context: 'link', ...link })),
            ...playlist.exams.map(exam => ({ context: 'exam', ...exam })),
        ]);
    }, [playlist]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!active || !over) return;

        if (active.id !== over.id) {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);

            const newItems = arrayMove(items, oldIndex, newIndex);

            // Update the state immediately for a responsive UI
            setItems(newItems);

            // Prepare the data for the database update
            const updatedItems = newItems.map((item, index) => ({
                id: item.id,
                order: index + 1,
            }));

            // Determine the table based on the dragged item's context
            const draggedItem = items.find(item => item.id === active.id);
            if (draggedItem) {
                let table: keyof typeof tablesMap;
                switch (draggedItem.context) {
                    case 'video':
                        table = 'video';
                        break;
                    case 'file':
                        table = 'file';
                        break;
                    case 'link':
                        table = 'link';
                        break;
                    case 'exam':
                        table = 'exam';
                        break;
                    default:
                        throw new Error('Invalid item context');
                }

                try {
                    // Call the server action to update the order in the database
                    await updateItemOrder(table, updatedItems, playlist.courseId);
                } catch (error) {
                    console.error('Failed to update item order:', error);
                    // Optionally, revert the state if the server update fails
                    setItems(items);
                }
            }
        }
    };

    return (
        <Accordion
            ref={setNodeRef}
            style={style}
            type="multiple"
            className="mb-4"
        >
            <AccordionItem value={playlist.id.toString()} className='bg-white rounded-md px-2'>
                <AccordionTrigger className="flex justify-between items-center py-4 px-2 bg-white rounded-md cursor-pointer">
                    <div className="font-bold">{playlist.title}</div>
                    <div>
                        <div
                            {...attributes}
                            {...listeners}
                            className='w-fit p-2 transition-all hover:bg-gray-300 rounded-md'
                        >
                            <GripVertical
                                className="cursor-grab" />
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 bg-inherit">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={items}
                            strategy={verticalListSortingStrategy}
                        >
                            {items.map(item => {
                                switch (item.context) {
                                    case 'video': {
                                        const videoSrc = item.thumbnail !== 'thumbnail.jpg' ? `${process.env.NEXT_PUBLIC_R2_FILES_URL}/${item.thumbnail}` : 'thumbnail.jpg';
                                        return (
                                            <ItemCard
                                                key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                description={item.description}
                                                thumbnail={videoSrc}
                                                icon={<MonitorPlay />}
                                                onClick={() => console.log(item)}
                                            />
                                        );
                                    }
                                    case 'file': {
                                        return (
                                            <ItemCard
                                                key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                icon={<File />}
                                                onClick={() => console.log(item)}
                                            />
                                        );
                                    }
                                    case 'link': {
                                        return (
                                            <ItemCard
                                                key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                description={item.link}
                                                icon={<Link2 />}
                                                onClick={() => window.open(item.link, '_blank')}
                                            />
                                        );
                                    }
                                    case 'exam': {
                                        return (
                                            <ItemCard
                                                key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                icon={<NotebookPen />}
                                                onClick={() => console.log(item)}
                                            />
                                        );
                                    }
                                }
                            })}
                        </SortableContext>
                    </DndContext>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

interface ContentProps {
    playlists: TPlaylist[];
    courseId: number;
    videos: TVideo[];
    files: TFile[];
    links: TLink[];
    exams: TExam[];
}

export default function Content({ playlists, courseId, videos, files, links, exams }: ContentProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const [items, setItems] = useState<any[]>([]);

    const videosWithoutPlaylist = videos.filter(video => !video.playlistId);
    const filesWithoutPlaylist = files.filter(file => !file.playlistId);
    const linksWithoutPlaylist = links.filter(link => !link.playlistId);
    const examsWithoutPlaylist = exams.filter(exam => !exam.playlistId);

    useEffect(() => {
        setItems([
            ...videosWithoutPlaylist.map(video => ({ context: 'video', ...video })),
            ...filesWithoutPlaylist.map(file => ({ context: 'file', ...file })),
            ...linksWithoutPlaylist.map(link => ({ context: 'link', ...link })),
            ...examsWithoutPlaylist.map(exam => ({ context: 'exam', ...exam })),
            ...playlists.map(playlist => ({ context: 'playlist', ...playlist })).filter(
                playlist => playlist.videos.length > 0
                    || playlist.files.length > 0
                    || playlist.links.length > 0
                    || playlist.exams.length > 0
            ),
        ]);
    }, [])

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!active || !over) return;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });

            // Prepare the data for the database update
            const updatedItems = items.map((item, index) => ({
                id: item.id,
                order: index + 1,
            }));

            // Determine the table based on the dragged item's context
            const draggedItem = items.find(item => item.id === active.id);
            if (draggedItem) {
                let table: keyof typeof tablesMap;
                switch (draggedItem.context) {
                    case 'video':
                        table = 'video';
                        break;
                    case 'file':
                        table = 'file';
                        break;
                    case 'link':
                        table = 'link';
                        break;
                    case 'exam':
                        table = 'exam';
                        break;
                    case 'playlist':
                        table = 'playlist';
                        break;
                    default:
                        throw new Error('Invalid item context');
                }

                try {
                    // Call the server action to update the order in the database
                    await updateItemOrder(table, updatedItems, courseId);
                } catch (error) {
                    console.error('Failed to update item order:', error);
                    // Optionally, revert the state if the server update fails
                    setItems(items);
                }
            }
        }
    }

    return (
        <div className="col-span-2 space-y-4">
            <div className="flex flex-row gap-2 justify-end">
                <CreateExam playlists={playlists} courseId={courseId} />
                <AddFile playlists={playlists} courseId={courseId} />
                <AddLink playlists={playlists} courseId={courseId} />
                <AddVideo playlists={playlists} courseId={courseId} />
                <CreatePlaylist courseId={courseId} />
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map(item => {

                        switch (item.context) {
                            case 'video': {
                                const video = item as TVideo;
                                const thumbnail = video.thumbnail !== 'thumbnail.jpg' ? `${process.env.NEXT_PUBLIC_R2_FILES_URL}/${video.thumbnail}` : '/thumbnail.jpg';
                                return (
                                    <ItemCard
                                        key={video.id}
                                        id={video.id}
                                        title={video.title}
                                        description={video.description}
                                        thumbnail={thumbnail}
                                        icon={<MonitorPlay />}
                                        onClick={() => console.log(video)}
                                    />
                                );
                            }
                            case 'file': {
                                const file = item as TFile;
                                return (
                                    <ItemCard
                                        key={file.id}
                                        id={file.id}
                                        title={file.title}
                                        icon={<File />}
                                        onClick={() => console.log(file)}
                                    />
                                );
                            }
                            case 'link': {
                                const link = item as TLink;
                                return (
                                    <ItemCard
                                        key={link.id}
                                        id={link.id}
                                        title={link.title}
                                        description={link.link}
                                        icon={<Link2 />}
                                        onClick={() => window.open(link.link, '_blank')}
                                    />
                                )
                            }
                            case 'exam': {
                                const exam = item as TExam;
                                return (
                                    <ItemCard
                                        key={exam.id}
                                        id={exam.id}
                                        title={exam.title}
                                        icon={<NotebookPen />}
                                        onClick={() => console.log(exam)}
                                    />
                                );
                            }
                            case 'playlist': {
                                const playlist = item as TPlaylist;
                                return (
                                    <>
                                        <PlaylistCard key={playlist.id} playlist={playlist} />
                                    </>
                                )
                            }
                        }
                    })}
                </SortableContext>
            </DndContext>
        </div>
    );
}
