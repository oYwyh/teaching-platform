'use client'

import { addQuestion, removeQuestion } from "@/actions/exam.actions";
import { Button } from "@/components/ui/button";
import { TQuestion } from "@/types/index.type";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from 'react';

interface ITreeProps {
    examId: number
    questions: TQuestion[],
    question: TQuestion,
    setQuestion: React.Dispatch<React.SetStateAction<TQuestion>>
}

export default function Tree(
    {
        examId,
        questions,
        question,
        setQuestion
    }: ITreeProps) {
    const [sortedQuestions, setSortedQuestions] = useState<TQuestion[]>([]);
    const [hoveredQuestionId, setHoveredQuestionId] = useState<number | null>(null);

    useEffect(() => {
        const sorted = [...questions].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        setSortedQuestions(sorted);
    }, [questions]);

    const handleQuestionClick = (question: TQuestion) => {
        setQuestion(question);
    };

    const handleAddQuestion = async () => {
        const question = await addQuestion(examId)

        setQuestion(question)
    };

    const handleRemoveQuestion = async (id: number) => {
        await removeQuestion(id)
    };


    return (
        <div className="col-span-1 bg-white">
            {sortedQuestions.map((item, index) => (
                <div
                    key={item.id}
                    className={`flex flex-col gap-1 p-2 ${question.id === item.id ? 'bg-[#EAF4FC]' : ''}`}
                    onMouseEnter={() => setHoveredQuestionId(item.id)}
                    onMouseLeave={() => setHoveredQuestionId(null)}
                >
                    <p>Question {index + 1}</p>
                    <div className={`flex flex-row gap-1`}>
                        <div className="flex cursor-pointer justify-end items-end h-full min-h-[100px]">
                            <Trash2
                                onClick={() => handleRemoveQuestion(item.id)}
                                size={14}
                                color='red'
                                className={`${hoveredQuestionId === item.id ? 'opacity-100' : 'opacity-0'}`}
                            />
                        </div>
                        <div
                            className={`flex justify-center items-center p-2 w-full h-full min-h-[100px] rounded-lg bg-black cursor-pointer
                                ${question.id === item.id ? 'border-4 border-blue-500' : hoveredQuestionId === item.id ? 'border-4 border-gray-500' : 'border-4 border-transparent'}
                            `}
                            onClick={() => handleQuestionClick(item)}
                        >
                            <p className="text-white">{item.question}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className='p-2'>
                <Button className="w-full" onClick={() => handleAddQuestion()}>Add Question</Button>
            </div>
        </div>
    )
}
