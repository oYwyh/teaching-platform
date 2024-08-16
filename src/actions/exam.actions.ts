'use server'

import db from "@/lib/db"
import { answerTable, examTable, questionTable } from "@/lib/db/schema"
import { deleteFile } from "@/lib/r2";
import { ExamStatuses, QuestionTypes, TExam, TPlaylist } from "@/types/index.type";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createExam(data: { title: string, description: string, scheduledPublishDate?: Date, scheduledUnpublishDate?: Date }, playlists: TPlaylist[], courseId: number) {
    const examData: any = {
        title: data.title,
        description: data.description,
        status: 'draft',
        courseId: courseId,
    };

    if (playlists && playlists.length > 0) examData.playlistIds = playlists;
    if (data.scheduledPublishDate) examData.scheduledPublishDate = data.scheduledPublishDate;
    if (data.scheduledUnpublishDate) examData.scheduledUnpublishDate = data.scheduledUnpublishDate;

    const exam = await db.insert(examTable).values(examData).returning();

    if (!exam) throw new Error("Something went wrong");

    const question = await db.insert(questionTable).values({
        question: "Sample Question",
        examId: exam[0].id
    }).returning();

    for (let i = 0; i < 4; i++) {
        await db.insert(answerTable).values({
            answer: `Sample Answer ${i + 1}`,
            questionId: question[0].id,
            isCorrect: i === 0 ? true : false
        })
    }

    revalidatePath(`/dashboard/courses/${courseId}`)
    redirect(`/dashboard/courses/${courseId}/exam/${exam[0].id}/creator`)
}

export async function updateExam(data: { title?: string, description?: string, scheduledPublishDate?: Date, scheduledUnpublishDate?: Date }, playlists: string[], examId: number) {

    const examData: any = {};

    if (playlists && playlists.length > 0) examData.playlistIds = playlists;
    if (data.title) examData.title = data.title;
    if (data.description) examData.description = data.description;
    if (data.scheduledPublishDate) examData.scheduledPublishDate = data.scheduledPublishDate;
    if (data.scheduledUnpublishDate) examData.scheduledUnpublishDate = data.scheduledUnpublishDate;

    await db.update(examTable).set(examData).where(eq(examTable.id, examId))

    revalidatePath(`/dashboard/courses/[courseId]/exam/[examId]/creator`)
}

export async function addQuestion(examId: number) {
    const question = await db.insert(questionTable).values({
        question: "Sample Question",
        examId: examId
    }).returning();

    let answers = {}
    for (let i = 0; i < 4; i++) {
        answers = await db.insert(answerTable).values({
            answer: `Sample Answer ${i + 1}`,
            questionId: question[0].id,
            isCorrect: i === 0 ? true : false
        })
    }

    revalidatePath(`/dashboard/courses/[courseId]/exam/[examId]/creator`)
    return {
        ...question[0],
        answers: answers
    }
}

export async function removeQuestion(id: number) {
    await db.delete(questionTable).where(eq(questionTable.id, id))

    revalidatePath(`/dashboard/courses/[courseId]/exam/[examId]/creator`)
}

export async function questionChange(data: { question: string }, id: number) {
    await db.update(questionTable).set({
        question: data.question
    }).where(eq(questionTable.id, id))

    revalidatePath(`/dashboard/courses/[courseId]/exam/[examId]/creator`)
}

export async function typeChange(type: QuestionTypes, id: number) {
    await db.update(questionTable).set({
        type
    }).where(eq(questionTable.id, id))

    await db.delete(answerTable).where(eq(answerTable.questionId, id))

    if (type == 'choose') {
        for (let i = 0; i < 4; i++) {
            await db.insert(answerTable).values({
                answer: `Sample Answer ${i + 1}`,
                questionId: id,
                isCorrect: i === 0 ? true : false
            })
        }
    }
    if (type == 'trueOrFalse') {
        await db.insert(answerTable).values({
            answer: "True",
            questionId: id,
            isCorrect: true
        })
        await db.insert(answerTable).values({
            answer: "False",
            questionId: id,
            isCorrect: false
        })
    }

    if (type == 'written') {
        await db.insert(answerTable).values({
            answer: "Just click me!",
            questionId: id,
            isCorrect: true,
        })
    }

    revalidatePath(`/dashboard/courses/[courseId]/exam/[examId]/creator`)
}

export async function setCorrect(isCorrect: boolean, id: number) {
    await db.update(answerTable).set({
        isCorrect: !isCorrect
    }).where(eq(answerTable.id, id))

    revalidatePath(`/dashboard/courses/[courseId]/exam/[examId]/creator`)
}

export async function addAnswer(questionId: number) {
    await db.insert(answerTable).values({
        answer: "Sample Answer",
        questionId: questionId,
    })

    revalidatePath(`/dashboard/courses/[courseId]/exam/[examId]/creator`)
}

export async function removeAnswer(id: number) {
    await db.delete(answerTable).where(eq(answerTable.id, id))

    revalidatePath(`/dashboard/courses/[courseId]/exam/[examId]/creator`)
}

export async function answerChange(data: { id: number, answer: string }) {
    await db.update(answerTable).set({
        answer: data.answer
    }).where(eq(answerTable.id, data.id))

    revalidatePath(`/dashboard/courses/[courseId]/exam/[examId]/creator`)
}

export async function setDuration(time: number, examId: number) {
    await db.update(examTable).set({
        duration: time
    }).where(eq(examTable.id, examId))

    revalidatePath(`/dashboard/courses/[courseId]/exam/[examId]/creator`)
}

export async function save(courseId: number, examId: number, publish: boolean) {

    if (publish) {
        await db.update(examTable).set({
            status: 'published'
        }).where(eq(examTable.id, examId))
    }

    revalidatePath(`/dashboard/courses/[courseId]`)
    redirect(`/dashboard/courses/${courseId}`)
}

export async function setQuestionImage(image: string, questionId: number) {
    const question = await db.query.questionTable.findFirst({
        where: (questionTable, { eq }) => eq(questionTable.id, questionId)
    })

    if (question?.image) {
        await deleteFile(question.image)
    }
    await db.update(questionTable).set({
        image: image
    }).where(eq(questionTable.id, questionId))

    revalidatePath(`/dashboard/courses/[courseId]/exam/[examId]/creator`)
}