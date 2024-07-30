'use client'

import { check } from "@/actions/auth.actions";
import Login from "@/app/auth/Login";
import Register from "@/app/auth/Register";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import FormField from "@/components/ui/formField";
import { destroy, seed } from "@/lib/db/seed";
import { checkSchema, TCheckSchema } from "@/schemas/auth.schema";
import { TInsertedCredential } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { Bean, RemoveFormattingIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AuthPage() {
    const [credentialExist, setCredentialExist] = useState<boolean>();
    const [credential, setCredential] = useState<TInsertedCredential | null>();

    const form = useForm<TCheckSchema>({
        resolver: zodResolver(checkSchema)
    });

    const onSubmit = async (data: TCheckSchema) => {
        const result = await check(data)
        console.log(result)
        if (result) {
            if (!result.error) {
                setCredential({
                    column: result?.column as 'email' | 'phone',
                    credential: data.credential,
                });
                if (result.exists) {
                    // login
                    setCredentialExist(true)
                } else {
                    // register
                    setCredentialExist(false)
                }
            } else {
                form.setError('credential', { type: 'custom', message: result.error })
            }
        }
    }

    const seedAction = async () => {
        await seed();
    }

    const destroyAction = async () => {
        await destroy();
    }

    return (
        <>
            {!credentialExist && !credential && (
                <>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField form={form} name='credential' />
                            <Button className="mt-2 w-full" type='submit' >Submit</Button>
                        </form>
                    </Form>
                    <Button className="flex flex-row-reverse gap-2 mt-5 w-screen" variant={'outline'} onClick={seedAction}>
                        <Bean size={18} />
                        Seed
                    </Button>
                    <Button className="flex flex-row-reverse gap-2 mt-5 w-screen" variant={'outline'} onClick={destroyAction}>
                        Destroy Db
                        <Trash2 size={18} />
                    </Button>
                </>
            )}
            {credentialExist && credential && (
                <Login insertedCredential={credential} />
            )}
            {!credentialExist && credential && (
                <Register insertedCredential={credential} />
            )}
        </>
    )
}