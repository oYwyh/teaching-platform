'use client'

import { getGovernorates, getRegions, getSubjects, getYears } from "@/actions/index.actions";
import { add } from "@/actions/student.actions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/formField";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addSchema, TAddSchema } from "@/schemas/student.schema";
import { StudentContexts, TIndex, TOptions } from "@/types/index.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Add() {
    const [open, setOpen] = useState(false)

    const [studentContext, setStudentContext] = useState<StudentContexts>();
    const [selectedRegion, setSelectedRegion] = useState<string | undefined>();
    const [regions, setRegions] = useState<TOptions>();
    const [governorates, setGovernorates] = useState<TIndex<TOptions>>();
    const [years, setYears] = useState<TIndex<TOptions>>();
    const [englishExams, setEnglishExams] = useState<TOptions>([]);

    useEffect(() => {
        const fetchRegions = async () => {
            const regions = await getRegions();
            const governorates = await getGovernorates();
            const years = await getYears();
            const englishExams = await getSubjects("englishExam")

            setRegions(regions);
            setGovernorates(governorates);
            setYears(years);
            setEnglishExams(englishExams)
        }

        fetchRegions();
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            form.resetField('governorateId');
            form.resetField('yearId');
        }
    }, [selectedRegion])

    const form = useForm<TAddSchema>({
        resolver: zodResolver(addSchema),
    })

    const onSubmit = async (data: { [key: string]: string | number } & TAddSchema) => {

        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'string' && key !== 'context') {
                data[key] = value.toLowerCase();
            }
        });

        const result = await add(data);

        if (result?.error) {
            for (const [field, message] of Object.entries(result.error)) {
                form.setError(field as string, { type: 'server', message: message });
            }
            return;
        }
        form.reset()
        setOpen(false);

    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className='capitalize'>Add student</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='capitalize'>Add student</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <ScrollArea className="max-h-[80vh] w-full rounded-md border p-4">
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div>
                                    <FormField form={form} name='context' select={'studentContext'} setState={setStudentContext} />
                                </div>
                                {studentContext && (
                                    <>
                                        <div className="flex flex-row gap-3">
                                            <FormField form={form} name='firstname' />
                                            <FormField form={form} name='lastname' />
                                        </div>
                                        <FormField form={form} name="email" />
                                        <div className="flex flex-row gap-3">
                                            <FormField form={form} name="phone" />
                                            {studentContext == 'school' && (
                                                <FormField form={form} name='parentPhone' />
                                            )}
                                        </div>
                                        <div className="flex flex-row gap-3 item-center">
                                            <FormField form={form} name='regionId' select='region' regions={regions} setState={setSelectedRegion} label='Region' />
                                            {selectedRegion && (
                                                <FormField form={form} name='governorateId' select='governorate' governorates={governorates} region={selectedRegion} label='Governorate' />
                                            )}
                                        </div>
                                        <div className="flex flex-row gap-3 item-center">
                                            {selectedRegion && (
                                                <>
                                                    {studentContext == 'school' && (
                                                        <FormField form={form} name='yearId' select='year' years={years} region={selectedRegion} label='Year' />
                                                    )}
                                                    {studentContext == 'englishExam' && (
                                                        <FormField form={form} name='subjectId' select='englishExam' subjects={englishExams} region={selectedRegion} label='Subject' />
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <FormField form={form} name='password' />
                                            <FormField form={form} name='confirmPassword' />
                                        </div>
                                        <Button className="mt-2 w-full" type='submit'>Add</Button>
                                    </>
                                )}
                            </form>
                        </ScrollArea>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    )
}