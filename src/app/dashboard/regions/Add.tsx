'use client'

import { add } from "@/actions/region.actions";
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
import { governorates, regions, years } from "@/constants/index.constant";
import { addSchema, TAddSchema } from "@/schemas/region.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Add({ existingRegions }: { existingRegions: string[] }) {
    const [open, setOpen] = useState(false)
    const [selectedRegion, setSelectedRegion] = useState<string>('')
    const [selectedGovernorates, setSelectedGovernorates] = useState<string[]>([])
    const [selectedYears, setSelectedYears] = useState<string[]>([])

    const form = useForm<TAddSchema>({
        resolver: zodResolver(addSchema),
    })

    const onSubmit = async (data: TAddSchema) => {
        if (selectedGovernorates.length == 0) {
            form.setError('governorates', { type: 'custom', message: 'One governorate at least is required!' })
            return;
        }
        if (selectedYears.length == 0) {
            form.setError('years', { type: 'custom', message: 'One year at least is required!' })
            return;
        }

        await add(data, selectedGovernorates, selectedYears);

        form.reset()
        setSelectedGovernorates([])
        setSelectedYears([])
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className='capitalize'>Add region</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='capitalize'>Add region</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-3">
                                {existingRegions.length == regions.length ? (
                                    <p className="text-red-500">All regions are already added!</p>
                                ) : (
                                    <FormField form={form} name='region' select={'region'} existing={existingRegions} setState={setSelectedRegion} />
                                )}
                                {selectedRegion && (
                                    <>
                                        <CFormField
                                            control={form.control}
                                            name='governorates'
                                            render={({ field: { onChange, value } }) => (
                                                <FormItem>
                                                    <FormLabel className="capitalize">Governorates</FormLabel>
                                                    <FormControl>
                                                        <MultiSelect
                                                            options={governorates[selectedRegion]}
                                                            onValueChange={setSelectedGovernorates}
                                                            defaultValue={selectedGovernorates}
                                                            placeholder="Select governorates"
                                                            variant="inverted"
                                                            maxCount={3}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <CFormField
                                            control={form.control}
                                            name='years'
                                            render={({ field: { onChange, value } }) => (
                                                <FormItem>
                                                    <FormLabel className="capitalize">School Years</FormLabel>
                                                    <FormControl>
                                                        <MultiSelect
                                                            options={years[selectedRegion]}
                                                            onValueChange={setSelectedYears}
                                                            defaultValue={selectedYears}
                                                            placeholder="Select school years"
                                                            variant="inverted"
                                                            maxCount={3}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button className="w-full" type='submit'>Add</Button>
                                    </>
                                )
                                }
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    )
}