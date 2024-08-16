import React from 'react';
import db from "@/lib/db";
import Promo from '@/app/dashboard/courses/[courseId]/Promo';
import Details from '@/app/dashboard/courses/[courseId]/Details';
import { TCourse } from '@/types/index.type';
import { getById } from '@/actions/index.actions';
import Content from '@/app/dashboard/courses/[courseId]/Content';

const getData = async (id: number) => {
    const data = await db.query.courseTable.findFirst({
        where: (courseTable, { eq }) => eq(courseTable.id, id)
    });

    if (!data) return null;

    const course = {
        id: data.id,
        title: data.title,
        description: data.description,
        instructor: await getById(data.instructorId, 'instructor', true),
        price: data.price,
        currency: data.currency,
        enrolledStudents: data.enrolledStudents,
        region: await getById(data.regionId || undefined, 'region', true),
        regionId: data.regionId,
        year: await getById(data.yearId || undefined, 'year', true),
        yearId: data.yearId,
        subject: await getById(data.subjectId || undefined, 'subject', true),
        subjectId: data.subjectId,
        context: data.context,
        status: data.status,
        releasedAt: new Date(data.releasedAt).toLocaleDateString(),
        updatedAt: new Date(data.updatedAt).toLocaleDateString(),
        scheduledPublishDate: data.scheduledPublishDate ? new Date(data.scheduledPublishDate).toLocaleDateString() : null,
        scheduledUnpublishDate: data.scheduledUnpublishDate ? new Date(data.scheduledUnpublishDate).toLocaleDateString() : null,
        thumbnail: data.thumbnail,
        promo: data.promo
    };

    const videos = await db.query.videoTable.findMany({
        where: (videoTable, { eq }) => eq(videoTable.courseId, id)
    });

    const files = await db.query.fileTable.findMany({
        where: (fileTable, { eq }) => eq(fileTable.courseId, id)
    });

    const exams = await db.query.examTable.findMany({
        where: (examTable, { eq }) => eq(examTable.courseId, id)
    });

    const playlists = await db.query.playlistTable.findMany({
        where: (playlistTable, { eq }) => eq(playlistTable.courseId, id),
    });

    // Group videos and files by playlistIds
    playlists.forEach((playlist) => {
        playlist.videos = videos.filter((video) => video.playlistIds?.split(',').map(Number).includes(playlist.id));
        playlist.files = files.filter((file) => file.playlistIds?.split(',').map(Number).includes(playlist.id));
        playlist.exams = exams.filter((exam) => exam.playlistIds?.split(',').map(Number).includes(playlist.id));
    });

    const videosWithoutPlaylist = videos.filter(video => !video.playlistIds);
    const filesWithoutPlaylist = files.filter(file => !file.playlistIds);
    const examsWithoutPlaylist = exams.filter(exam => !exam.playlistIds);

    return {
        course,
        videos: videosWithoutPlaylist,
        playlists,
        files: filesWithoutPlaylist,
        exams: examsWithoutPlaylist
    };
};


export default async function coursePage({ params: { courseId } }: { params: { courseId: number } }) {
    const { course, videos, playlists, files, exams } = await getData(courseId);

    if (!course) throw new Error('Course not found');

    console.log(`playlists`, playlists)
    console.log(`videos`, videos)
    console.log(`files`, files)
    console.log(`exams`, exams)
    console.log(`playlists[0]`, playlists[0])

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {/* Left Side: Details */}
            <Details
                course={course}
            />
            {/* Right Side: Video Placeholders */}
            <Content videos={videos} playlists={playlists} files={files} exams={exams} courseId={courseId} />
        </div>
    );
}
