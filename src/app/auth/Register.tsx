'use client'

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


export default function Register({ insertedCredential }: { insertedCredential: TInsertedCredential | null }) {

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

        if (result) {
            if (result?.error) {
                for (const [field, message] of Object.entries(result.error)) {
                    form.setError(field as keyof TRegisterSchema, { type: 'server', message: message });
                }
            }
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-row gap-3">
                        <FormField form={form} name='firstname' />
                        <FormField form={form} name='lastname' />
                    </div>
                    <div className="flex flex-row gap-3">
                        {insertedCredential?.column === 'email' ? (
                            <FormField form={form} name="email" disabled={true} defaultValue={insertedCredential.credential} />
                        ) : (
                            <FormField form={form} name="email" />
                        )}
                        {insertedCredential?.column === 'phone' ? (
                            <FormField form={form} name="phone" disabled={true} defaultValue={insertedCredential.credential} />
                        ) : (
                            <FormField form={form} name="phone" />
                        )}
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
        </>
    )
}