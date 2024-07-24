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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TEditSchema, TPasswordSchema, editSchema, passwordSchema } from "@/schemas/dashboard.schema";
import { edit, editPassword } from "@/actions/dashboard.actions";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/formField";
import { Form } from "@/components/ui/form";

export default function Edit({ userId, userData, setPopOpen }: {
    userId: string,
    userData: { [key: string]: string } & TEditSchema
    setPopOpen: Dispatch<SetStateAction<boolean | undefined>>
}) {
    const [open, setOpen] = useState(false);

    const accountForm = useForm<TEditSchema>({
        resolver: zodResolver(editSchema),
        defaultValues: {
            firstname: userData?.firstname || "",
            lastname: userData?.lastname || "",
            email: userData?.email || "",
            phone: userData?.phone || "",
            parentPhone: userData?.parentPhone || "",
            governorate: (userData?.governorate) || "",
        }
    });

    const passwordForm = useForm<TPasswordSchema>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });


    const onEditAccount = async (data: TEditSchema) => {
        const userFields = Object.keys(userData).filter(key => key !== 'id' && key !== 'role');
        const changedData: { [key: string]: string } = {};

        userFields.forEach((field) => {
            if (data[field]?.toLowerCase() !== userData[field]?.toLowerCase()) {
                changedData[field] = data[field];
            }
        });

        Object.entries(changedData).forEach(([key, value]) => {
            if (typeof value === 'string') {
                changedData[key] = value.toLowerCase();
            }
        });

        const result = await edit(changedData, userId);

        if (result?.done) {
            accountForm.reset();
            setOpen(false);
            setPopOpen(false);
        } else if (result?.error) {
            for (const [field, message] of Object.entries(result.error)) {
                accountForm.setError(field, {
                    type: "server",
                    message: message
                });
            }
        }
    };

    const onEditPassword = async (data: TPasswordSchema) => {
        const result = await editPassword(data, userId);
        if (result?.done) {
            passwordForm.reset();
            setOpen(false);
            setPopOpen(false);
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className='w-full capitalize'>Edit Student</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='capitalize'>Edit Student</DialogTitle>
                        <DialogDescription>
                            Anyone who has this link will be able to view this.
                        </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="account" className="w-[100%]">
                        <TabsList className="w-[100%]">
                            <TabsTrigger className="w-[100%]" value="account">Account</TabsTrigger>
                            <TabsTrigger className="w-[100%]" value="password">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <Form {...accountForm}>
                                <form onSubmit={accountForm.handleSubmit(onEditAccount)}>
                                    <div className="flex flex-row gap-3">
                                        <FormField form={accountForm} name='firstname' />
                                        <FormField form={accountForm} name='lastname' />
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <FormField form={accountForm} name="email" />
                                        <FormField form={accountForm} name="phone" />
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <FormField form={accountForm} name='parentPhone' />
                                        <FormField form={accountForm} name='governorate' select='governorate' />
                                    </div>
                                    <Button className="mt-2" type='submit'>Register</Button>
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="password">
                            <Form {...passwordForm}>
                                <form onSubmit={passwordForm.handleSubmit(onEditPassword)}>
                                    <FormField form={passwordForm} name="password" />
                                    <FormField form={passwordForm} name="confirmPassword" />
                                    {/* {error && <FormMessage>{error}</FormMessage>} */}
                                    <DialogFooter className="pt-4">
                                        <Button type="submit">Save changes</Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </div>
    );
}