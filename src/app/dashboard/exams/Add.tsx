'use client'

import { add } from "@/actions/exam.actions";
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
import { exams, governorates, regions, years } from "@/constants/index.constant";
import { addSchema, TAddSchema } from "@/schemas/exam.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Add({ existingExams }: { existingExams: string[] }) {
    const [open, setOpen] = useState(false)

    const form = useForm<TAddSchema>({
        resolver: zodResolver(addSchema),
    })

    const onSubmit = async (data: TAddSchema) => {
        await add(data);

        form.reset()
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className='capitalize'>Add exam</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='capitalize'>Add exam</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-3">
                                {existingExams.length == exams.length ? (
                                    <p className="text-red-500">All exams are already added!</p>
                                ) : (
                                    <>
                                        <FormField form={form} name='exam' select={'exam'} existing={existingExams} />
                                        <Button className="w-[100%]" type="submit">Add</Button>
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