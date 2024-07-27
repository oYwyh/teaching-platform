'use client'

import { add, edit } from "@/actions/subject.actions";
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
import { editSchema, TEditSchema } from "@/schemas/subject.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { error } from "console";

export default function Edit({
    ids,
    rowData,
    setPopOpen,
}: {
    ids: number[],
    rowData: { [key: string]: string } & TEditSchema & { regions: any[] },
    setPopOpen: Dispatch<SetStateAction<boolean | undefined>>
}) {

    const [open, setOpen] = useState(false)
    const [subjectContext, setSubjectContext] = useState<string>(rowData.subjectContext)
    const [selectedRegions, setSelectedRegions] = useState<string[]>(rowData.regions.map((item: any) => item.region));
    const [regions, setRegions] = useState<{ labelAr: string; labelEn: string; value: string; }[]>([]);

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
        }
    }, [subjectContext])

    useEffect(() => {
        setSubjectContext(rowData.context)
    }, [])

    const form = useForm<TEditSchema>({
        resolver: zodResolver(editSchema),
        defaultValues: {
            subjectContext: rowData.context,
            subject: rowData.subject,
        }
    })

    const onSubmit = async (data: TEditSchema) => {
        if (subjectContext == 'school' && selectedRegions.length == 0) {
            form.setError('regions', { type: 'server', message: 'One region at least is required!' })
            return;
        }

        await edit(data, selectedRegions);

        form.reset()
        setSelectedRegions([])
        setOpen(false);
        setPopOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className='capitalize'>Edit subject</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='capitalize'>Edit subject</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-3">
                                <>
                                    <FormField form={form} name='subjectContext' label='this subject is a' disabled />
                                    {subjectContext && (
                                        <>
                                            <FormField form={form} name='subject' disabled />
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
                                            <Button className="w-[100%]" type="submit">Edit</Button>

                                        </>
                                    )}
                                </>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    )
}
