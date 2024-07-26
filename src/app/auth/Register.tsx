'use client'

import { getExams, getGovernorates, getRegions, getYears } from "@/actions/index.actions";
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


export default function Register({ insertedCredential }: { insertedCredential: TInsertedCredential | null }) {

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
            const exams = await getExams();

            setRegions(regions);
            setGovernorates(governorates);
            setYears(years);
            setExams(exams);
        }

        fetchRegions();
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            form.resetField('governorate');
            form.resetField('year');
        }
    }, [selectedRegion])

    const form = useForm<TRegisterSchema>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: { [key: string]: string | number } & TRegisterSchema) => {

        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'string') {
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
                        <FormField form={form} name='type' select={'studentType'} setState={setStudentType} />
                    </div>
                    {studentType && (
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
                                {studentType == 'school' && (
                                    <FormField form={form} name='parentPhone' />
                                )}
                            </div>
                            <div className="flex flex-row gap-3 item-center">
                                <FormField form={form} name='region' select='region' regions={regions} setState={setSelectedRegion} />
                                {selectedRegion && (
                                    <>
                                        <FormField form={form} name='governorate' select='governorate' governorates={governorates} region={selectedRegion} />
                                    </>
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
                            <Button className="mt-2" type='submit'>Register</Button>
                        </>
                    )}
                </form>
            </Form>
        </>
    )
}