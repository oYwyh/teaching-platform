'use client'

import { QuestionTypes, TQuestion } from "@/types/index.type"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useRef, useState } from "react"
import { questionTypes } from "@/constants/index.constant"
import { setDuration, typeChange } from "@/actions/exam.actions"
import { TimePickerInput } from "@/components/ui/time-picker-input"
import { Label } from "@/components/ui/label"
import { Check, CircleHelp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"


interface IOptionsProps {
    question: TQuestion
    examId: number
    examDuration: number
}

export default function Options({ question, examId, examDuration }: IOptionsProps) {
    const [questionType, setQuestionType] = useState(question.type)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [error, setError] = useState<string | undefined>();
    const minuteRef = useRef<HTMLInputElement>(null);
    const hourRef = useRef<HTMLInputElement>(null);
    const secondRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setQuestionType(question.type)
    }, [question.type])

    useEffect(() => {
        const hours = Math.floor(examDuration / 3600);
        const minutes = Math.floor((examDuration % 3600) / 60);
        const seconds = examDuration % 60;
        const initialDate = new Date();
        initialDate.setHours(hours, minutes, seconds, 0);
        setDate(initialDate);
    }, [examDuration]);

    const handleTypeChange = async (type: QuestionTypes) => {
        await typeChange(type, question.id)
    }

    const handleSaveDuration = async () => {
        if (!date) {
            setError('Please select a date')
            return false;
        }
        setError('')
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;

        await setDuration(totalSeconds, examId);
    }

    return (
        <div className="col-span-2 bg-white px-3 pt-2 relative flex flex-col gap-2">
            <h1>Options</h1>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" class="styles__QuizIllustration-sc-lcau33-0 gOWtgr"><g fill="none" fill-rule="evenodd"><path fill="#F2F2F2" d="M24,43.9996101 L24,43.9996101 C12.954,43.9996101 4,35.0456101 4,23.9996101 C4,12.9546101 12.954,3.9996101 24,3.9996101 C35.046,3.9996101 44,12.9546101 44,23.9996101 C44,35.0456101 35.046,43.9996101 24,43.9996101"></path><path fill="#333" d="M39.6035,43.9772101 L15.7985,47.9832101 C15.1675,48.0892101 14.5705,47.6652101 14.4645,47.0342101 L7.4475,5.3562101 C7.3415,4.7262101 7.7665,4.1282101 8.3965,4.0222101 L32.2015,0.0162100999 C32.8325,-0.0897899001 33.4295,0.3352101 33.5355,0.9652101 L40.5525,42.6442101 C40.6595,43.2742101 40.2335,43.8712101 39.6035,43.9772101"></path><path fill="#FFF" d="M38.1655,41.2228101 L16.2545,44.9108101 C15.9015,44.9698101 15.5674942,44.7318101 15.5085,44.3788101 L9.0765,6.1808101 C9.0175,5.8268101 9.2545,5.4928101 9.6085,5.4328101 L31.5185,1.7448101 C31.8715,1.6858101 32.2065,1.9238101 32.2655,2.2778101 L38.6975,40.4758101 C38.7565,40.8288101 38.5185,41.1638101 38.1655,41.2228101"></path><path fill="#26890C" class="cls-4" d="M36.9971,40.1002101 L27.6971,41.6652101 C27.5791,41.6852101 27.4671,41.6052101 27.4471,41.4872101 L24.6121,24.6492101 C24.5921,24.5312101 24.6721,24.4182101 24.7901,24.3982101 L34.0901,22.8332101 C34.2081,22.8132101 34.3201,22.8932101 34.3401,23.0122101 L37.1751,39.8502101 C37.1951,39.9682101 37.1151,40.0802101 36.9971,40.1002101"></path><path fill="#FFA602" class="cls-3" d="M25.9351,41.9620101 L16.6351,43.5270101 C16.5171,43.5470101 16.4051,43.4670101 16.3851,43.3490101 L13.5501,26.5110101 C13.5301,26.3930101 13.6101,26.2800101 13.7281,26.2600101 L23.0271,24.6950101 C23.1461,24.6750101 23.2581,24.7550101 23.2781,24.8740101 L26.1131,41.7120101 C26.1331,41.8300101 26.0531,41.9420101 25.9351,41.9620101"></path><path fill="#1368CE" class="cls-2" d="M33.8936,21.6701101 L24.5946,23.2351101 C24.4766,23.2551101 24.3636,23.1751101 24.3436,23.0571101 L21.2806,4.8671101 C21.2616,4.7481101 21.3406,4.6361101 21.4596,4.6161101 L30.7586,3.0511101 C30.8776,3.0311101 30.9896,3.1111101 31.0096,3.2291101 L34.0726,21.4201101 C34.0916,21.5381101 34.0126,21.6501101 33.8936,21.6701101"></path><path fill="#E11C3C" class="cls-1" d="M22.8315,23.5314101 L13.5325,25.0964101 C13.4135,25.1164101 13.3015,25.0364101 13.2815,24.9184101 L10.2185,6.7284101 C10.1985,6.6104101 10.2785,6.4974101 10.3975,6.4774101 L19.6965,4.9124101 C19.8145,4.8924101 19.9275,4.9724101 19.9475,5.0914101 L23.0095,23.2814101 C23.0295,23.3994101 22.9505,23.5114101 22.8315,23.5314101"></path><polygon fill="#FFF" points="14.635 17.353 16.215 13.008 19.088 16.631"></polygon><polygon fill="#FFF" points="27.191 10.873 30.028 12.832 28.033 15.643 25.195 13.684"></polygon><path fill="#FFF" d="M21.5791,33.4542101 C21.4081,32.3492101 20.3751,31.5912101 19.2731,31.7622101 C18.1721,31.9332101 17.4181,32.9672101 17.5891,34.0732101 C17.7611,35.1792101 18.7931,35.9362101 19.8951,35.7662101 C20.9961,35.5952101 21.7501,34.5602101 21.5791,33.4542101"></path><polygon fill="#FFF" points="33.237 33.685 29.257 34.362 28.577 30.368 32.557 29.691"></polygon></g></svg> */}
            <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center gap-1">
                    <CircleHelp size='14' />
                    <Label className="text-sm font-bold">Question Type</Label>
                </div>
                <Popover>
                    <PopoverTrigger className="w-full border-2 border-black rounded-sm text-start py-1 px-2 capitalize">{questionType}</PopoverTrigger>
                    <PopoverContent className="w-full grid grid-cols-2 gap-3">
                        {questionTypes.map((type) => (
                            <div
                                key={type.value}
                                onClick={() => {
                                    setQuestionType(type.value as QuestionTypes)
                                    handleTypeChange(type.value as QuestionTypes)
                                }}
                                className={`
                                flex flex-row gap-2 items-center w-full border-2 transition-all ease-in-out rounded-sm text-start py-1 px-2 hover:bg-gray-100 font-bold cursor-pointer
                                ${questionType === type.value && 'bg-gray-100 border-[#1368CE]'}
                            `}
                            >
                                <div dangerouslySetInnerHTML={{ __html: type.icon }} className="max-w-full" />
                                {type.labelEn}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-1">
                    <Clock size='14' />
                    <Label className="text-sm font-bold">Exam Duration</Label>
                </div>
                <div className="flex items-end gap-2">
                    <div className="grid gap-1 text-center">
                        <Label htmlFor="hours" className="text-xs">
                            Hours
                        </Label>
                        <TimePickerInput
                            picker="hours"
                            date={date}
                            setDate={setDate}
                            ref={hourRef}
                            onRightFocus={() => minuteRef.current?.focus()}
                        />
                    </div>
                    <div className="grid gap-1 text-center">
                        <Label htmlFor="minutes" className="text-xs">
                            Minutes
                        </Label>
                        <TimePickerInput
                            picker="minutes"
                            date={date}
                            setDate={setDate}
                            ref={minuteRef}
                            onLeftFocus={() => hourRef.current?.focus()}
                            onRightFocus={() => secondRef.current?.focus()}
                        />
                    </div>
                    <div className="grid gap-1 text-center">
                        <Label htmlFor="seconds" className="text-xs">
                            Seconds
                        </Label>
                        <TimePickerInput
                            picker="seconds"
                            date={date}
                            setDate={setDate}
                            ref={secondRef}
                            onLeftFocus={() => minuteRef.current?.focus()}
                        />
                    </div>
                    <div className="flex h-10 items-center">
                        <Button onClick={handleSaveDuration} variant={'outline'} className="w-fit p-2">
                            <Check />
                        </Button>
                    </div>
                </div>
                <div>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    )
}