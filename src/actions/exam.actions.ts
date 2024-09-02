'use server'

import db from "@/lib/db"
import { answerTable, examTable, questionTable } from "@/lib/db/schema"
import { deleteFile } from "@/lib/r2";
import { ExamStatuses, QuestionTypes, TAnswer, TExam, TPlaylist, TQuestion } from "@/types/index.type";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addToPlaylists } from "./index.actions";

export async function createExam(data: { title: string, description: string, scheduledPublishDate?: Date, scheduledUnpublishDate?: Date }, playlists: string[], courseId: number) {
    const baseExamData: any = {
        title: data.title,
        description: data.description,
        status: 'draft',
        courseId: courseId,
        order: 0
    };

    if (playlists && playlists.length > 0) baseExamData.playlistIds = playlists;
    if (data.scheduledPublishDate) baseExamData.scheduledPublishDate = data.scheduledPublishDate;
    if (data.scheduledUnpublishDate) baseExamData.scheduledUnpublishDate = data.scheduledUnpublishDate;

    const exam = await db.insert(examTable).values(baseExamData).returning();

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

    await addToPlaylists('exam', baseExamData, playlists, courseId);

    revalidatePath(`/dashboard/courses/${courseId}`)
    redirect(`/dashboard/courses/${courseId}/exam/${exam[0].id}/creator`)
}

export async function updateExam(data: { title?: string, description?: string, scheduledPublishDate?: Date, scheduledUnpublishDate?: Date }, playlists: string[] | undefined, examId: number) {

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

export async function removeAnswer(questionId: number, answerId: number) {

    const rawQuestion = await db
        .select()
        .from(questionTable)
        .where(eq(questionTable.id, questionId))
        .leftJoin(answerTable, eq(questionTable.id, answerTable.questionId));

    const question = rawQuestion.reduce<{
        question?: TQuestion;
        answers: TAnswer[];
    }>((acc, row) => {
        if (!acc.question) {
            acc.question = {
                id: row.question.id,
                question: row.question.question,
                image: row.question.image,
                examId: row.question.examId,
                type: row.question.type as QuestionTypes,
                createdAt: row.question.createdAt || new Date(),
                updatedAt: row.question.updatedAt || new Date(),
                answers: []
            };
        }
        if (row.answer) {
            acc.answers.push({
                id: row.answer.id,
                answer: row.answer.answer,
                isCorrect: row.answer.isCorrect,
                questionId: row.answer.questionId,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        return acc;
    }, { answers: [] });

    if (question.answers.length == 1) {
        return {
            error: "Question must have at least one answer"
        }
    } else {
        await db.delete(answerTable).where(eq(answerTable.id, answerId))

        revalidatePath(`/dashboard/courses/[courseId]/exam/[examId]/creator`)
    }
}

export async function answerChange(data: { id: number, answer: string }) {
    console.log(data)
    await db.update(answerTable).set({
        answer: data.answer
    }).where(eq(answerTable.id, data.id))

    revalidatePath(`/dashboard/courses/[courseId]/exam/[examId]/creator`, "layout")
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