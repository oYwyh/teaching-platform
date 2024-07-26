'use client'

import { getExams, getGovernorates, getRegions, getYears } from "@/actions/index.actions";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Add() {
    const [open, setOpen] = useState(false)

    const [studentType, setStudentType] = useState<string | undefined>();
    const [selectedRegion, setSelectedRegion] = useState<string | undefined>();
    const [regions, setRegions] = useState<{ labelAr: string; labelEn: string; value: string; }[]>({});
    const [governorates, setGovernorates] = useState<{ [key: string]: { labelAr: string; labelEn: string; value: string; }[] }>({});
    const [years, setYears] = useState<{ [key: string]: { labelAr: string; labelEn: string; value: string; }[] }>({});
    const [exams, setExams] = useState<{ labelAr: string; labelEn: string; value: string; }[]>([]);

    useEffect(() => {
        const fetchRegions = async () => {
            const regions = await getRegions();
            const governorates = await getGovernorates();
            const years = await getYears();
            const exams = await getExams()

            setRegions(regions);
            setGovernorates(governorates);
            setYears(years);
            setExams(exams)
        }

        fetchRegions();
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            form.resetField('governorate');
            form.resetField('year');
        }
    }, [selectedRegion])

    const form = useForm<TAddSchema>({
        resolver: zodResolver(addSchema),
    })

    const onSubmit = async (data: { [key: string]: string | number } & TAddSchema) => {

        if (studentType === 'school') {
            if (!data.year) {
                form.setError('year', { type: 'server', message: 'Year is required' });
                return;
            }
            if (!data.parentPhone) {
                form.setError('parentPhone', { type: 'server', message: 'Parent Phone is required' });
                return;
            }
        }

        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'string') {
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
                                    <FormField form={form} name='type' select={'studentType'} setState={setStudentType} />
                                </div>
                                {studentType && (
                                    <>
                                        <div className="flex flex-row gap-3">
                                            <FormField form={form} name='firstname' />
                                            <FormField form={form} name='lastname' />
                                        </div>
                                        <FormField form={form} name="email" />
                                        <div className="flex flex-row gap-3">
                                            <FormField form={form} name="phone" />
                                            {studentType == 'school' && (
                                                <FormField form={form} name='parentPhone' />
                                            )}
                                        </div>
                                        <div className="flex flex-row gap-3 item-center">
                                            <FormField form={form} name='region' select='region' regions={regions} setState={setSelectedRegion} />
                                            {selectedRegion && (
                                                <FormField form={form} name='governorate' select='governorate' governorates={governorates} region={selectedRegion} />
                                            )}
                                        </div>
                                        <div className="flex flex-row gap-3 item-center">
                                            {selectedRegion && (
                                                <>
                                                    {studentType == 'school' && (
                                                        <FormField form={form} name='year' select='year' region={selectedRegion} years={years} />
                                                    )}
                                                    {studentType == 'exam' && (
                                                        <FormField form={form} name='exam' select='exam' exams={exams} />
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