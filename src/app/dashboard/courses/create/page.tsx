'use client'

import { getGovernorates, getInstructors, getRegions, getSubjects, getYears } from "@/actions/index.actions";
import { add } from "@/actions/instructor.actions";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
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
import { createSchema, TCreateSchema } from "@/schemas/course.schema";
import { CourseContexts } from "@/types/index.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CurrencyInput from 'react-currency-input-field'
import { currencyLocales } from "@/constants/index.constant";
import FileUploader from "@/app/_components/FileUploader";
import ThumbnailUploadBox from "@/app/dashboard/_components/ThumbnailUploadBox";

export default function CourseCreatePage() {
    const [open, setOpen] = useState<boolean>();
    const [fileuploaderOpen, setFileuploaderOpen] = useState<boolean>(false);
    const [instructorId, setInstructorId] = useState<number | undefined>();
    const [currency, setCurrency] = useState<string | undefined>();
    const [courseContext, setCourseContext] = useState<CourseContexts>();
    const [selectedRegion, setSelectedRegion] = useState<string | undefined>();
    const [regions, setRegions] = useState<{ labelAr: string; labelEn: string; value: string; }[]>();
    const [governorates, setGovernorates] = useState<{ [key: string]: { labelAr: string; labelEn: string; value: string; }[] }>();
    const [years, setYears] = useState<{ [key: string]: { labelAr: string; labelEn: string; value: string; }[] }>();
    const [englishExams, setEnglishExams] = useState<{ labelAr: string; labelEn: string; value: string; }[]>([]);
    const [schoolSubjects, setSchoolSubjects] = useState<{ [key: string]: { labelAr: string; labelEn: string; value: string; }[] }>();
    const [instructors, setInstructors] = useState<{ id: number; instructor: string; }[]>();

    useEffect(() => {
        const fetchRegions = async () => {
            const regions = await getRegions();
            const governorates = await getGovernorates();
            const years = await getYears();
            const englishExams = await getSubjects('englishExam')
            const schoolSubjects = await getSubjects('school')
            const instructors = await getInstructors();

            setRegions(regions);
            setGovernorates(governorates);
            setYears(years);
            setEnglishExams(englishExams)
            setSchoolSubjects(schoolSubjects)
            setInstructors(instructors)
        }

        fetchRegions();
    }, []);

    useEffect(() => {
        console.log(schoolSubjects, englishExams)
    }, [schoolSubjects, englishExams]);

    useEffect(() => {
        if (selectedRegion) {
            setCurrency(currencyLocales[selectedRegion].currency);
            form.resetField('governorate');
            form.resetField('year');
        }
    }, [selectedRegion])

    const form = useForm<TCreateSchema>({
        resolver: zodResolver(createSchema),
    })

    const onSubmit = async (data: { [key: string]: string | number } & TCreateSchema) => {
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
            <Sheet open={open} onOpenChange={setOpen} side={'bottom'} className="h-screen">
                <SheetTrigger
                    className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90'
                >Create Course</SheetTrigger>
                <SheetContent side={'bottom'} className="h-screen">
                    <SheetHeader>
                        <SheetTitle>Course Creation Page</SheetTitle>
                        <SheetDescription>
                            Create a new course
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <ThumbnailUploadBox />
                        <Form {...form}>
                            <ScrollArea className="mt-5 max-h-[80vh] w-full rounded-md border p-4">
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
                                            {selectedRegion && (
                                                <>
                                                    {courseContext == 'school' && (
                                                        <FormField form={form} name='year' select='year' years={years} region={selectedRegion} />
                                                    )}
                                                    {courseContext == 'englishExam' && (
                                                        <FormField form={form} name='englishExam' select='englishExam' englishExams={englishExams} />
                                                    )}
                                                </>
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
                                            <FormField form={form} name='status' select='courseStatus' defaultValue="unpublished" />
                                            <Button className="mt-2 w-full" type='submit'>Add</Button>
                                        </>
                                    )}
                                </form>
                            </ScrollArea>
                        </Form>
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    )
}