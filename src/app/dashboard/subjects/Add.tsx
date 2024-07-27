'use client'

import { add } from "@/actions/subject.actions";
import { getGovernorates, getRegions, getYears } from "@/actions/index.actions";
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
import { Form, FormField as CFormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import FormField from "@/components/ui/formField";
import { MultiSelect } from "@/components/ui/multi-select";
import { subjects, governorates, regions, years } from "@/constants/index.constant";
import { addSchema, TAddSchema } from "@/schemas/subject.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { error } from "console";

export default function Add({ existingSubjects }: { existingSubjects: string[] }) {
    const [open, setOpen] = useState(false)
    const [subjectsArray, setSubjectsArray] = useState<{ labelAr: string, labelEn: string, value: string }[]>([
        ...subjects.englishExam,
        ...subjects.school,
    ])
    const [subjectContext, setSubjectContext] = useState<string>()
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [regions, setRegions] = useState<{ labelAr: string; labelEn: string; value: string; }[]>([]);

    useEffect(() => {
        console.log(subjectContext)
    }, [subjectContext])

    useEffect(() => {
        const fetchRegions = async () => {
            const regions = await getRegions();

            setRegions(regions);
        }

        fetchRegions();
    }, []);


    useEffect(() => {
        if (subjectContext) {
            form.resetField('subject')
            setSelectedRegions([])
        }
    }, [subjectContext])

    useEffect(() => {
        console.log(selectedRegions)
    }, [selectedRegions])

    const form = useForm<TAddSchema>({
        resolver: zodResolver(addSchema),
    })

    const onSubmit = async (data: TAddSchema) => {
        if (subjectContext == 'school' && selectedRegions.length == 0) {
            form.setError('regions', { type: 'server', message: 'One region at least is required!' })
            return;
        }
        await add(data, selectedRegions);

        form.reset()
        setSelectedRegions([])
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className='capitalize'>Add subject</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='capitalize'>Add subject</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-3">
                                {existingSubjects.length == subjectsArray.length ? (
                                    <p className="text-red-500">All subjects are already added!</p>
                                ) : (
                                    <>
                                        <FormField form={form} name='subjectContext' select="subjectContext" setState={setSubjectContext} />
                                        {subjectContext && (
                                            <>
                                                <FormField
                                                    form={form}
                                                    name='subject'
                                                    select={'subject'}
                                                    context={subjectContext}
                                                    existing={existingSubjects}
                                                />
                                                {subjectContext == 'school' && (
                                                    <>
                                                        <CFormField
                                                            control={form.control}
                                                            name='regions'
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="capitalize">Regions</FormLabel>
                                                                    <FormControl>
                                                                        <MultiSelect
                                                                            options={regions}
                                                                            onValueChange={setSelectedRegions}
                                                                            defaultValue={selectedRegions}
                                                                            placeholder="Select regions"
                                                                            variant="inverted"
                                                                            maxCount={3}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </>
                                                )}
                                                <Button className="w-[100%]" type="submit">Add</Button>

                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    )
}
