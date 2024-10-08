'use client'

import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dispatch, SetStateAction, useState } from "react";
import { deleteAction } from "@/actions/index.actions";
import { TTables } from "@/types/index.type";

export default function Delete({ id, table, setPopOpen }: { id: string | number, table: TTables, setPopOpen: Dispatch<SetStateAction<boolean | undefined>>; }) {

    const [open, setOpen] = useState<boolean>()

    const onSubmit = async () => {
        await deleteAction(id, table);
        setOpen(false)
        setPopOpen(false)
    }

    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild><Button variant={'destructive'}>Delete</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant='destructive' onClick={onSubmit}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}