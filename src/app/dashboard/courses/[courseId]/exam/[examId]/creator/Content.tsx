'use client'

import Canvas from "@/app/dashboard/courses/[courseId]/exam/[examId]/creator/Canvas"
import Header from "@/app/dashboard/courses/[courseId]/exam/[examId]/creator/Header"
import Options from "@/app/dashboard/courses/[courseId]/exam/[examId]/creator/Options"
import Tree from "@/app/dashboard/courses/[courseId]/exam/[examId]/creator/Tree"
import { TExam, TPlaylist, TQuestion } from "@/types/index.type"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface IContentProps {
    exam: any,
    playlists: TPlaylist[],
}

export default function Content({ exam, playlists }: IContentProps) {
    const [sortedQuestions, setSortedQuestions] = useState<TQuestion[]>([]);
    const [question, setQuestion] = useState<TQuestion | undefined>(undefined);

    useEffect(() => {
        if (exam?.questions) {
            const sorted = [...exam.questions].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            setSortedQuestions(sorted);
        }
    }, [exam?.questions]);

    useEffect(() => {
        if (sortedQuestions.length > 0) {
            // Check if the current selected question is still in the sortedQuestions
            const currentQuestion = sortedQuestions.find(q => q.id === question?.id);
            if (currentQuestion) {
                setQuestion(currentQuestion);
            } else {
                setQuestion(sortedQuestions[0]);
            }
        }
    }, [sortedQuestions]);

    return (
        <div>
            <Header exam={exam} playlists={playlists} />
            <div className="grid grid-cols-8 h-screen">
                {question && setQuestion && (
                    <>
                        <Tree question={question} setQuestion={setQuestion as Dispatch<SetStateAction<TQuestion>>} questions={sortedQuestions} examId={exam.id} />
                        <Canvas question={question} />
                        <Options question={question} examId={exam.id} examDuration={exam.duration} />
                    </>
                )}
            </div>
        </div>
    )
}
