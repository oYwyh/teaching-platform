import Content from "@/app/dashboard/courses/[courseId]/exam/[examId]/creator/Content";
import db from "@/lib/db";
import { answerTable, examTable, questionTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const getData = async (examId: number, courseId: number) => {
    const data = await db
        .select()
        .from(examTable)
        .where(eq(examTable.id, examId))
        .leftJoin(questionTable, eq(questionTable.examId, examTable.id))
        .leftJoin(answerTable, eq(answerTable.questionId, questionTable.id))

    if (!data.length) return null;

    const exam = {
        id: data[0].exam.id,
        title: data[0].exam.title,
        description: data[0].exam.description,
        duration: data[0].exam.duration,
        courseId: data[0].exam.courseId,
        status: data[0].exam.status,
        playlistIds: data[0].exam.playlistIds,
        scheduledPublishDate: data[0].exam.scheduledPublishDate,
        scheduledUnpublishDate: data[0].exam.scheduledUnpublishDate,
        releasedAt: data[0].exam.releasedAt,
        updatedAt: data[0].exam.updatedAt,
        questions: []
    };

    const questionsMap = new Map<number, any>();

    data.forEach(item => {
        if (item.question) {
            if (!questionsMap.has(item.question.id)) {
                questionsMap.set(item.question.id, {
                    id: item.question.id,
                    question: item.question.question,
                    type: item.question.type,
                    image: item.question.image,
                    examId: item.question.examId,
                    createdAt: item.question.createdAt,
                    answers: []
                });
            }
            if (item.answer) {
                questionsMap.get(item.question.id).answers.push({
                    id: item.answer.id,
                    answer: item.answer.answer,
                    isCorrect: item.answer.isCorrect,
                    questionId: item.answer.questionId
                });
            }
        }
    });

    exam.questions = Array.from(questionsMap.values());

    const playlists = await db.query.playlistTable.findMany({
        where: (playlistTable, { eq }) => eq(playlistTable.courseId, courseId),
    });

    return {
        exam,
        playlists
    };
};

export default async function Creator({ params: { courseId, examId } }: { params: { courseId: number, examId: number } }) {
    const { exam, playlists } = await getData(examId, courseId);

    return (
        <>
            <Content exam={exam} playlists={playlists} />
        </>
    );
}