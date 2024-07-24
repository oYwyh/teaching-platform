'use client'

import { login, register } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/formField";
import { registerSchema, loginSchema, TLoginSchema, TRegisterSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TInsertedCredential } from "@/types/auth.type";
import { redirect } from "next/navigation";

export default function Login({ insertedCredential }: { insertedCredential: TInsertedCredential | null }) {
    if (!insertedCredential) redirect('/')

    const form = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: { [key: string]: string | number } & TLoginSchema) => {

        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'string') {
                data[key] = value.toLowerCase();
            }
        });

        const result = await login(data);

        if (result?.error) {
            form.setError("password", { type: 'server', message: 'Invalid Password' });
        }
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField form={form} name="column" type={'hidden'} disabled={true} defaultValue={insertedCredential.column} />
                    <FormField form={form} name="credential" disabled={true} defaultValue={insertedCredential.credential} />
                    <FormField form={form} name="password" />
                    <Button className="mt-2" type="submit">Login</Button>
                </form>
            </Form>
        </>
    )
}