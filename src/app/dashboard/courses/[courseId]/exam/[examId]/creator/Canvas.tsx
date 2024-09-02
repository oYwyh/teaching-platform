'use client'

import { addAnswer, answerChange, questionChange, removeAnswer, setCorrect, setQuestionImage } from "@/actions/exam.actions"
import ThumbnailUploadBox from "@/app/dashboard/_components/ThumbnailUploadBox"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import FormField from "@/components/ui/formField"
import { useToast } from "@/components/ui/use-toast"
import { computeSHA256 } from "@/lib/funcs"
import { getPreSignedUrl } from "@/lib/r2"
import { TQuestion } from "@/types/index.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Meta, UppyFile } from "@uppy/core"
import { Check, Trash2, Trash2Icon, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface ICanvasProps {
    question: TQuestion
}

export default function Canvas({ question }: ICanvasProps) {
    const [image, setImage] = useState<{ file: UppyFile<Meta, Record<string, never>> | undefined, preview: string } | undefined>(
        question.image ? { file: undefined, preview: `${process.env.NEXT_PUBLIC_R2_FILES_URL}/${question.image}` } : undefined
    );
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [imageUploaded, setImageUploaded] = useState<boolean>(false)
    const [imageName, setImageName] = useState<string | undefined>(undefined)
    const questionSchema = z.object({
        question: z.string(),
    })
    const { toast } = useToast()

    const questionForm = useForm<z.infer<typeof questionSchema>>({
        resolver: zodResolver(questionSchema),
        defaultValues: { question: question.question }

    })

    const answerForm = useForm({
        defaultValues: question.answers.reduce((acc, answer) => {
            acc[`answer-${answer.id}`] = answer.answer
            return acc
        }, {} as Record<string, any>)
    })


    useEffect(() => {
        questionForm.reset({ question: question.question })
        answerForm.reset(
            question.answers.reduce((acc, answer) => {
                acc[`answer-${answer.id}`] = answer.answer
                return acc
            }, {} as Record<string, any>)
        )
        setImage(
            question.image ? { file: undefined, preview: `${process.env.NEXT_PUBLIC_R2_FILES_URL}/${question.image}` } : undefined
        );
    }, [question])

    useEffect(() => {
        async function uploadImage() {
            if (image && image.file && image.file.data) {
                const checkSum = await computeSHA256(image.file.data);
                const signedUrlResult = await getPreSignedUrl({
                    key: image.file.source == 'Webcam' ? image.file.name : image.file.data.name,
                    type: image.file.data.type,
                    size: image.file.data.size,
                    checkSum,
                    format: 'img',
                });

                if (!signedUrlResult || !signedUrlResult.success) throw new Error('Failed to get sign URL');

                const { url, fileName } = signedUrlResult.success;

                // Perform the actual file upload to the presigned URL
                await new Promise<void>((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('PUT', url, true);
                    xhr.setRequestHeader('Content-Type', image.file.data.type);

                    xhr.upload.onprogress = (event) => {
                        if (event.lengthComputable) {
                            const percentComplete = Math.round((event.loaded / event.total) * 100);
                            setUploadProgress(percentComplete);
                        }
                    };

                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            console.log('Image uploaded successfully');
                            setImageName(fileName);
                            setImageUploaded(true);
                            resolve();
                        } else {
                            console.log('Image upload failed');
                            reject(new Error('Image upload failed'));
                        }
                    };

                    xhr.onerror = () => {
                        console.log('Image upload failed');
                        reject(new Error('Image upload failed'));
                    };

                    xhr.send(image.file.data);
                });
            }
        }
        uploadImage()
    }, [image])

    useEffect(() => {
        async function setImageInDatabase() {
            if (!imageName) return
            await setQuestionImage(imageName, question.id)
        }
        setImageInDatabase()
    }, [imageUploaded, imageName])


    const handleQuestionChange = async (data: z.infer<typeof questionSchema>) => {
        await questionChange(data, question.id)
    }

    const handleSetIsCorrect = async (isCorrect: boolean, id: number) => {
        await setCorrect(isCorrect, id)
    }

    const handleAddAnswer = async () => {
        await addAnswer(question.id)
    }

    const handleRemoveAnswer = async (questionId: number, answerId: number) => {
        const result = await removeAnswer(questionId, answerId)

        if (result?.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "One answer at least is required.",
            })
        }
    }

    const handleAnswerChange = async (data: any, answerId: number) => {
        const answerKey = `answer-${answerId}`;
        data['answer'] = data[answerKey];
        await answerChange({ ...data, id: answerId });
    }

    return (
        <div className="col-span-5 flex flex-col gap-4 px-10 justify-center items-center bg-gray-200">
            <Form {...questionForm}>
                <form className="w-full">
                    <FormField form={questionForm} name="question" onUnFocus={questionForm.handleSubmit(handleQuestionChange)} label='' defaultValue={question.question} />
                </form>
            </Form>
            <div className="max-h-[300px] w-full">
                <ThumbnailUploadBox thumbnail={image} setThumbnail={setImage} uploadProgress={uploadProgress} />
            </div>
            <div className={`grid w-full gap-4 grid-cols-2 ${question.type === 'written' && 'grid-cols-1'}`}>
                {question.answers.sort((a, b) => a.id - b.id).map((answer) => {
                    const answerKey = `answer-${answer.id}`;
                    return (
                        <div className="flex flex-row gap-0" key={answer.id}>
                            <div className={`
                                    flex items-center justify-between cursor-pointer rounded-sm w-full shadow-md px-3 py-5
                                    ${answer.isCorrect ? "bg-green-200" : "bg-red-200"}
                                `}
                            >
                                <Form {...answerForm}>
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <FormField form={answerForm} name="id" type="hidden" disabled transparent defaultValue={answer.id} />
                                        <FormField form={answerForm} name={answerKey} transparent onUnFocus={() => handleAnswerChange(answerForm.getValues(), answer.id)} label='' />
                                    </form>
                                </Form>
                                <div onClick={() => question.type === 'choose' && handleSetIsCorrect(answer.isCorrect, answer.id)}>
                                    {answer.isCorrect ? <Check color='green' /> : <X color="red" />}
                                </div>
                            </div>
                            {question.type === 'choose' && (
                                <Button variant="outline" className="rounded-sm shadow-md px-3 py-5 h-full bg-gray-100" onClick={() => handleRemoveAnswer(question.id, answer.id)}><Trash2 color="red" /></Button>
                            )}
                        </div>
                    )
                })}
            </div>
            {
                question.type === 'choose' && (
                    <Button variant="outline" className="w-full mt-2" onClick={() => handleAddAnswer()}>Add Answer</Button>
                )
            }
        </div >
    )
}