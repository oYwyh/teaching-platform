'use client'

import { getExams, getGovernorates, getRegions, getYears } from "@/actions/index.actions";
import { add } from "@/actions/instructor.actions";
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
import { Form, FormLabel } from "@/components/ui/form";
import FormField from "@/components/ui/formField";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addSchema, TAddSchema } from "@/schemas/instructor.schema";
import { CourseContexts } from "@/types/index.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CurrencyInput from 'react-currency-input-field'
import { currencyLocales } from "@/constants/index.constant";

export default function Add({ instructors }: { instructors: { id: number, value: string }[] }) {
    const [open, setOpen] = useState(false)

    const [instructorId, setInstructorId] = useState<number | undefined>();
    const [currency, setCurrency] = useState<string | undefined>();
    const [courseContext, setCourseContext] = useState<CourseContexts>();
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
            setCurrency(currencyLocales[selectedRegion].currency);
            form.resetField('governorate');
            form.resetField('year');
        }
    }, [selectedRegion])

    useEffect(() => {
        if (courseContext) {
            form.resetField('category');
        }
    }, [courseContext])

    const form = useForm<any>({
    })

    const onSubmit = async (data: { [key: string]: string | number } & TAddSchema) => {
        console.log(data, instructorId)
        return;
        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'string') {
                data[key] = value.toLowerCase();
            }
        });

        const result = await add(data);

        if (result?.error) {
            for (const [field, message] of Object.entries(result.error)) {
                form.setError(field as string, { type: 'server', message });
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
                    <Button variant="outline" className='capitalize'>Add course</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='capitalize'>Add course</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <ScrollArea className="max-h-[80vh] w-full rounded-md border p-4">
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-row gap-3 item-center">
                                    <FormField form={form} name="courseContext" select="courseContext" setState={setCourseContext} />
                                </div>
                                {courseContext && (
                                    <>
                                        <FormField form={form} name="title" />
                                        <FormField form={form} name="description" textarea />
                                        <FormField form={form} name='instructor' select={'instructor'} instructors={instructors} setState={setInstructorId} />
                                        <div className="flex flex-row gap-3 item-center">
                                            <FormField form={form} name='region' select='region' regions={regions} setState={setSelectedRegion} />
                                            {selectedRegion && (
                                                <FormField form={form} name='governorate' select='governorate' governorates={governorates} region={selectedRegion} />
                                            )}
                                        </div>
                                        {selectedRegion && courseContext == 'school' && (
                                            <FormField form={form} name='year' select='year' region={selectedRegion} years={years} />
                                        )}
                                        {selectedRegion && courseContext == 'exam' && (
                                            <FormField form={form} name='exam' select='exam' exams={exams} />
                                        )}
                                        {selectedRegion && currencyLocales.hasOwnProperty(selectedRegion) && (
                                            <div>
                                                <FormLabel>Price</FormLabel>
                                                <CurrencyInput
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    id="price"
                                                    name="price"
                                                    placeholder="price"
                                                    intlConfig={currencyLocales[selectedRegion]}
                                                    onValueChange={(value, name, values) => console.log(value, name, values)}
                                                />
                                            </div>
                                        )}
                                        {courseContext && (
                                            <FormField form={form} name='category' select='courseCategory' context={courseContext} />
                                        )}
                                        <FormField form={form} name='status' select='courseStatus' />
                                        <Button className="mt-2 w-full" type='submit'>Add</Button>
                                    </>
                                )}
                            </form>
                        </ScrollArea>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}