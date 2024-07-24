'use client'

import { add } from "@/actions/dashboard.actions";
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
import { addSchema, TAddSchema } from "@/schemas/dashboard.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Add() {
    const [open, setOpen] = useState(false)

    const form = useForm<TAddSchema>({
        resolver: zodResolver(addSchema),
    })

    const onSubmit = async (data: TAddSchema) => {

        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'string') {
                data[key] = value.toLowerCase();
            }
        });

        const result = await add(data);

        if (result) {
            form.reset()
            setOpen(false);
            if (result?.error) {
                for (const [field, message] of Object.entries(result.error)) {
                    form.setError(field as keyof TAddSchema, { type: 'server', message: message });
                }
            }
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className='capitalize'>Add student</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='capitalize'>Add student</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-row gap-3">
                                <FormField form={form} name='firstname' />
                                <FormField form={form} name='lastname' />
                            </div>
                            <div className="flex flex-row gap-3">
                                <FormField form={form} name="email" />
                                <FormField form={form} name="phone" />
                            </div>
                            <div className="flex flex-row gap-3">
                                <FormField form={form} name='parentPhone' />
                                <FormField form={form} name='governorate' select='governorate' />
                            </div>
                            <div className="flex flex-row gap-3">
                                <FormField form={form} name='password' />
                                <FormField form={form} name='confirmPassword' />
                            </div>
                            <Button className="mt-2" type='submit'>Register</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}