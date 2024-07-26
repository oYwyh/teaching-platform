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
import { TEditSchema, TPasswordSchema, editSchema, passwordSchema } from "@/schemas/student.schema";
import { edit, editPassword } from "@/actions/student.actions";
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
    const [studentType, setStudentType] = useState<string | undefined>(rowData.type ? rowData.type : '');
    const [selectedRegion, setSelectedRegion] = useState<string | undefined>(rowData.region ? rowData.region : '');
    const [regions, setRegions] = useState<{ labelAr: string; labelEn: string; value: string; }[]>({});
    const [governorates, setGovernorates] = useState<{ [key: string]: { labelAr: string; labelEn: string; value: string; }[] }>({});
    const [years, setYears] = useState<{ [key: string]: { labelAr: string; labelEn: string; value: string; }[] }>({});
    const [error, setError] = useState<string | undefined>();
    const [exams, setExams] = useState<{ labelAr: string; labelEn: string; value: string; }[]>([]);

    useEffect(() => {
        const fetchRegions = async () => {
            const regions = await getRegions();
            const governorates = await getGovernorates();
            const years = await getYears();
            const exams = await getExams()

            setRegions(regions);
            setGovernorates(governorates);
            setYears(years);
            setExams(exams)
        }

        fetchRegions();
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            accountForm.resetField('governorate');
            accountForm.resetField('year');
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
            year: (rowData?.year) || '',
            exam: (rowData?.exam) || '',
            type: rowData?.type || "",
        }
    })

    const passwordForm = useForm<TPasswordSchema>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const onEditAccount = async (data: TEditSchema) => {
        const changedData: { [key: string]: string | null } = {};

        const userFields = Object.keys(rowData).filter(key => key !== 'id' && key !== 'role');

        let hasChanges = false;

        userFields.forEach((field) => {
            const rowValue = rowData[field] ?? ""; // Treat null as an empty string
            const formValue = data[field] ?? ""; // Treat undefined as an empty string

            if (formValue.toLowerCase() !== rowValue.toLowerCase()) {
                changedData[field] = formValue;
                hasChanges = true;
            } else {
                changedData[field] = rowValue;
            }
        });

        // Check if the type field has changed
        if (data.type !== rowData.type) {
            hasChanges = true;
            if (data.type === 'school') {
                changedData.exam = null;
                changedData.parentPhone = data.parentPhone || null;
                changedData.year = data.year || null;
            } else if (data.type === 'exam') {
                changedData.parentPhone = null;
                changedData.year = null;
            }
        }

        if (!hasChanges) {
            setError("No changes detected.");
            return;
        }

        Object.entries(changedData).forEach(([key, value]) => {
            if (typeof value === 'string') {
                changedData[key] = value.toLowerCase();
            }
        });

        const result = await edit(changedData, id);

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
                                <ScrollArea className="max-h-[80vh] w-full rounded-md border p-4">
                                    <form onSubmit={accountForm.handleSubmit(onEditAccount)}>
                                        <div>
                                            <FormField form={accountForm} name='type' select={'studentType'} setState={setStudentType} />
                                        </div>
                                        {studentType && (
                                            <>
                                                <div className="flex flex-row gap-3">
                                                    <FormField form={accountForm} name='firstname' />
                                                    <FormField form={accountForm} name='lastname' />
                                                </div>
                                                <FormField form={accountForm} name="email" />
                                                <div className="flex flex-row gap-3">
                                                    <FormField form={accountForm} name="phone" />
                                                    {studentType == 'school' && (
                                                        <FormField form={accountForm} name='parentPhone' />
                                                    )}
                                                </div>
                                                <div className="flex flex-row gap-3 item-center">
                                                    <FormField form={accountForm} name='region' select='region' regions={regions} setState={setSelectedRegion} />
                                                    {selectedRegion && (
                                                        <FormField form={accountForm} name='governorate' select='governorate' governorates={governorates} region={selectedRegion} />
                                                    )}
                                                </div>
                                                <div className="flex flex-row gap-3 item-center">
                                                    {selectedRegion && (
                                                        <>
                                                            {studentType == 'school' && (
                                                                <FormField form={accountForm} name='year' select='year' region={selectedRegion} years={years} />
                                                            )}
                                                            {studentType == 'exam' && (
                                                                <FormField form={accountForm} name='exam' select='exam' exams={exams} />
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                {error && (<FormMessage>{error}</FormMessage>)}
                                                <Button className="mt-2 w-full" type='submit'>Save Changes</Button>
                                            </>
                                        )}
                                    </form>
                                </ScrollArea>
                            </Form>
                        </TabsContent>
                        <TabsContent value="password">
                            <Form {...passwordForm}>
                                <form onSubmit={passwordForm.handleSubmit(onEditPassword)}>
                                    <FormField form={passwordForm} name="password" />
                                    <FormField form={passwordForm} name="confirmPassword" />
                                    {/* {error && <FormMessage>{error}</FormMessage>} */}
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