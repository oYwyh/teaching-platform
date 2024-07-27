'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { TEditSchema, TPasswordSchema, editSchema, passwordSchema } from "@/schemas/instructor.schema";
import { edit, editPassword } from "@/actions/instructor.actions";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/formField";
import { Form, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getExams, getGovernorates, getRegions, getYears } from "@/actions/index.actions";

export default function Edit({ id, rowData, setPopOpen }: {
    id: string,
    rowData: { [key: string]: string } & TEditSchema
    setPopOpen: Dispatch<SetStateAction<boolean | undefined>>
}) {
    const [open, setOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState<string | undefined>(rowData.region ? rowData.region : '');
    const [regions, setRegions] = useState<{ labelAr: string; labelEn: string; value: string; }[]>({});
    const [governorates, setGovernorates] = useState<{ [key: string]: { labelAr: string; labelEn: string; value: string; }[] }>({});
    const [error, setError] = useState<string>();

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
        if (selectedRegion) {
            accountForm.resetField('governorate');
        }
    }, [selectedRegion])

    const accountForm = useForm<TEditSchema>({
        resolver: zodResolver(editSchema),
        defaultValues: {
            firstname: rowData?.firstname || "",
            lastname: rowData?.lastname || "",
            email: rowData?.email || "",
            phone: rowData?.phone || "",
            parentPhone: rowData?.parentPhone || '',
            region: (rowData?.region) || "",
            governorate: (rowData?.governorate) || "",
            bio: (rowData?.bio) || '',
            specialty: (rowData?.specialty) || '',
        }
    })

    const passwordForm = useForm<TPasswordSchema>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const onEditAccount = async (data: { [key: string]: string | null } & TEditSchema) => {
        let userFields = Object.keys(rowData).filter(key => key !== 'id' && key !== 'role') as (keyof TEditSchema)[];
        let fieldsNotToCompare: string[] = [];
        let fieldsToCompare: string[] = [];

        userFields.forEach((field) => {
            const dataValue = data[field];
            const rowDataValue = rowData[field];

            if (typeof dataValue === 'string' && typeof rowDataValue === 'string' && dataValue.toLowerCase() !== rowDataValue.toLowerCase()) {
                fieldsToCompare.push(String(field));
            } else {
                fieldsNotToCompare.push(String(field));
            }
        });

        for (const field of fieldsNotToCompare) {
            delete data[field];
        }

        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'string') {
                data[key] = value.toLowerCase();
            }
        });

        if (fieldsToCompare.length === 0) {
            setError("No changes detected");
            return;
        }
        setError('')

        const result = await edit(data, id);

        if (result?.error) {
            for (const [field, message] of Object.entries(result.error)) {
                accountForm.setError(field, {
                    type: "server",
                    message: message
                });
            }
            return;
        }
        accountForm.reset();
        setOpen(false);
        setPopOpen(false);
    };




    const onEditPassword = async (data: TPasswordSchema) => {
        const result = await editPassword(data, id);
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
                    <Button variant="outline" className='w-full capitalize'>Edit instructor</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='capitalize'>Edit instructor</DialogTitle>
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
                                <ScrollArea className="max-h-[80vh] w-full rounded-md border p-4">
                                    <form onSubmit={accountForm.handleSubmit(onEditAccount)}>
                                        <div className="flex flex-row gap-3">
                                            <FormField form={accountForm} name='firstname' />
                                            <FormField form={accountForm} name='lastname' />
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <FormField form={accountForm} name="email" />
                                            <FormField form={accountForm} name="phone" />
                                        </div>
                                        <div className="flex flex-row gap-3 item-center">
                                            <FormField form={accountForm} name='region' select='region' regions={regions} setState={setSelectedRegion} />
                                            {selectedRegion && (
                                                <FormField form={accountForm} name='governorate' select='governorate' governorates={governorates} region={selectedRegion} />
                                            )}
                                        </div>
                                        <div className="flex flex-row gap-3 item-center">
                                            <FormField form={accountForm} name='bio' textarea />
                                        </div>
                                        <FormField form={accountForm} name='specialty' select={'specialty'} />
                                        {error && <FormMessage>{error}</FormMessage>}
                                        <Button className="mt-2 w-full" type='submit'>Save Changes</Button>
                                    </form>
                                </ScrollArea>
                            </Form>
                        </TabsContent>
                        <TabsContent value="password">
                            <Form {...passwordForm}>
                                <form onSubmit={passwordForm.handleSubmit(onEditPassword)}>
                                    <FormField form={passwordForm} name="password" />
                                    <FormField form={passwordForm} name="confirmPassword" />
                                    <DialogFooter className="pt-4">
                                        <Button className="w-full" type="submit">Save changes</Button>
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