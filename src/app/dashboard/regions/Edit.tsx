'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";
import { TEditSchema, editSchema } from "@/schemas/region.schema";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/formField";
import { Form, FormField as CFormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { governorates, years } from "@/constants/index.constant";
import { edit } from "@/actions/region.actions";

export default function Edit({ id, rowData, setPopOpen }: {
    id: number,
    rowData: { [key: string]: string } & TEditSchema & { governorates: string[] } & { years: string[] },
    setPopOpen: Dispatch<SetStateAction<boolean | undefined>>
}) {
    const [open, setOpen] = useState(false);
    const [selectedGovernorates, setSelectedGovernorates] = useState<string[]>(rowData.governorates || []);
    const [selectedYears, setSelectedYears] = useState<string[]>(rowData.years || []);
    const [error, setError] = useState<string | undefined>();

    const form = useForm<TEditSchema>({
        resolver: zodResolver(editSchema),
        defaultValues: {
            region: rowData.region || "",
        }
    });

    const arraysEqual = (a: string[], b: string[]) => {
        if (a.length !== b.length) return false;
        a.sort();
        b.sort();
        return a.every((value, index) => value === b[index]);
    };

    const onSubmit = async (data: TEditSchema) => {
        const hasRegionChanged = data.region !== rowData.region;
        const haveGovernoratesChanged = !arraysEqual(selectedGovernorates, rowData.governorates);
        const haveYearsChanged = !arraysEqual(selectedYears, rowData.years);

        if (!hasRegionChanged && !haveGovernoratesChanged && !haveYearsChanged) {
            setError('No changes detected');
            return;
        }

        if (selectedGovernorates.length === 0) {
            form.setError('governorates', { type: 'custom', message: 'One governorate at least is required!' });
            return;
        }

        if (selectedYears.length === 0) {
            form.setError('years', { type: 'custom', message: 'One year at least is required!' });
            return;
        }

        try {
            await edit(id, data, selectedGovernorates, selectedYears);
            form.reset();
            setOpen(false);
            setError(undefined);
            setPopOpen(false);
        } catch (err) {
            console.error("Error updating:", err);
            setError("An error occurred while updating");
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className='w-full capitalize'>Edit Region</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='capitalize'>Edit Region</DialogTitle>
                        <DialogDescription>
                            Anyone who has this link will be able to view this.
                        </DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-3">
                                    <FormField form={form} name='region' disabled={true} select={'region'} existing={[]} />
                                    <CFormField
                                        control={form.control}
                                        name='governorates'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="capitalize">Governorates</FormLabel>
                                                <FormControl>
                                                    <MultiSelect
                                                        options={governorates[rowData.region]}
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
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="capitalize">School Years</FormLabel>
                                                <FormControl>
                                                    <MultiSelect
                                                        options={years[rowData.region]}
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
                                    {error && <p className="text-red-500">{error}</p>}
                                    <Button className="w-full" type='submit'>Save</Button>
                                </div>
                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}