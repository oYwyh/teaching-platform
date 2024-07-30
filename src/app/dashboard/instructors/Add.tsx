'use client'

import { getById, getGovernorates, getRegions, getYears } from "@/actions/index.actions";
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
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/formField";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addSchema, TAddSchema } from "@/schemas/instructor.schema";
import { TIndex, TOptions } from "@/types/index.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Add() {
    const [open, setOpen] = useState(false)

    const [selectedRegionId, setSelectedRegionId] = useState<number>();
    const [selectedRegion, setSelectedRegion] = useState<string>();
    const [regions, setRegions] = useState<TOptions>();
    const [governorates, setGovernorates] = useState<TIndex<TOptions>>();

    useEffect(() => {
        const fetchRegions = async () => {
            const regions = await getRegions();
            const governorates = await getGovernorates();

            setRegions(regions);
            setGovernorates(governorates);
        }

        fetchRegions();
    }, []);

    useEffect(() => {
        async function fetchRegion() {
            if (selectedRegionId) {
                const region = await getById(selectedRegionId, 'region', true)
                setSelectedRegion(region)
                fetchRegion()
            }
        }
    }, [selectedRegionId])

    const form = useForm<TAddSchema>({
        resolver: zodResolver(addSchema),
    })

    const onSubmit = async (data: { [key: string]: string | number } & TAddSchema) => {
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
                    <Button variant="outline" className='capitalize'>Add instructor</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='capitalize'>Add instructor</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <ScrollArea className="max-h-[80vh] w-full rounded-md border p-4">
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-row gap-3">
                                    <FormField form={form} name='firstname' />
                                    <FormField form={form} name='lastname' />
                                </div>
                                <div className="flex flex-row gap-3">
                                    <FormField form={form} name="email" />
                                    <FormField form={form} name="phone" />
                                </div>
                                <div className="flex flex-row gap-3 item-center">
                                    <FormField form={form} name='regionId' select='region' label="Region" regions={regions} setState={setSelectedRegionId} />
                                    {selectedRegion && (
                                        <FormField form={form} name='governorateId' label="Governorate" select='governorate' governorates={governorates} region={selectedRegion} />
                                    )}
                                </div>
                                <div className="flex flex-row gap-3 item-center">
                                    <FormField form={form} name='bio' textarea />
                                </div>
                                <FormField form={form} name='specialty' select={'specialty'} />
                                <div className="flex flex-row gap-3">
                                    <FormField form={form} name='password' />
                                    <FormField form={form} name='confirmPassword' />
                                </div>
                                <Button className="mt-2 w-full" type='submit'>Add</Button>
                            </form>
                        </ScrollArea>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    )
}