'use client'

import { getSubjects, getGovernorates, getRegions, getYears } from "@/actions/index.actions";
import { login, register } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/formField";
import { registerSchema, TRegisterSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TInsertedCredential } from "@/types/auth.type";
import { useEffect, useState } from "react";
import { TIndex, TOptions } from "@/types/index.type";


export default function Register({ insertedCredential }: { insertedCredential: TInsertedCredential | null }) {

    const [studentContext, setStudentContext] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [regions, setRegions] = useState<TOptions>([]);
    const [governorates, setGovernorates] = useState<TIndex<TOptions>>({});
    const [years, setYears] = useState<TIndex<TOptions>>({});
    const [englishExams, setEnglishExams] = useState<TOptions>([]);

    useEffect(() => {
        const fetchRegions = async () => {
            const regions = await getRegions();
            const governorates = await getGovernorates();
            const years = await getYears();
            const englishExams = await getSubjects('englishExam');

            setRegions(regions);
            setGovernorates(governorates);
            setYears(years);
            setEnglishExams(englishExams);
        }

        fetchRegions();
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            form.resetField('governorateId');
            form.resetField('yearId');
        }
    }, [selectedRegion])

    const form = useForm<TRegisterSchema>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: TIndex<string | number> & TRegisterSchema) => {
        console.log(data)
        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'string' && key != 'context') {
                data[key] = value.toLowerCase();
            }
        });

        const result = await register(data)

        if (result?.error) {
            for (const [field, message] of Object.entries(result.error)) {
                form.setError(field as keyof TRegisterSchema, { type: 'server', message: message });
            }
        }
    }

    return (
        <>
            <Form {...form}>
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
                            {insertedCredential?.column === 'email' ? (
                                <FormField form={form} name="email" disabled={true} defaultValue={insertedCredential.credential} />
                            ) : (
                                <FormField form={form} name="email" />
                            )}
                            <div className="flex flex-row gap-3">
                                {insertedCredential?.column === 'phone' ? (
                                    <FormField form={form} name="phone" disabled={true} defaultValue={insertedCredential.credential} />
                                ) : (
                                    <FormField form={form} name="phone" />
                                )}
                                {studentContext == 'school' && (
                                    <FormField form={form} name='parentPhone' />
                                )}
                            </div>
                            <div className="flex flex-row gap-3 item-center">
                                <FormField form={form} name='regionId' select='region' regions={regions} setState={setSelectedRegion} label="Region" />
                                {selectedRegion && (
                                    <>
                                        <FormField form={form} name='governorateId' select='governorate' governorates={governorates} region={selectedRegion} label="governorate" />
                                    </>
                                )}
                            </div>
                            <div className="flex flex-row gap-3 item-center">
                                {selectedRegion && (
                                    <>
                                        {studentContext == 'school' && (
                                            <FormField form={form} name='yearId' select='year' years={years} region={selectedRegion} label={'year'} />
                                        )}
                                        {studentContext == 'englishExam' && (
                                            <FormField form={form} name='subjectId' select='englishExam' subjects={englishExams} label="English Exam" />
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="flex flex-row gap-3">
                                <FormField form={form} name='password' />
                                <FormField form={form} name='confirmPassword' />
                            </div>
                            <Button className="mt-2" type='submit'>Register</Button>
                        </>
                    )}
                </form>
            </Form>
        </>
    )
}