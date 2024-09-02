'use client'

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { TPlaylist } from "@/types/index.type";
import { useForm } from "react-hook-form";
import { fileTypes, imageTypes } from "@/constants/index.constant";
import Image from "next/image";
import { getPreSignedUrl } from "@/lib/r2";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSchema, TAddSchema } from "@/schemas/link.schema";
import { add } from "@/actions/link.actions";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/formField";
import SelectPlaylists from "./SelectPlaylists";

export default function AddLink({ playlists, courseId }: { playlists: TPlaylist[], courseId: number }) {
    const [open, setOpen] = useState(false);
    const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

    const form = useForm<TAddSchema>({
        resolver: zodResolver(addSchema),
    })

    const onSubmit = async (data: TAddSchema) => {
        setOpen(false)
        await add(data, selectedPlaylists, courseId)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="px-2 py-1 outline outline-2 shadow-lg outline-white text-white rounded-sm">Add Link</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Link</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField form={form} name="title" />
                        <FormField form={form} name="link" placeholder="https://example.com" />
                        <FormField form={form} name='status' select='linkStatus' defaultValue="unpublished" />
                        <Button className="mt-2 w-full">Add</Button>
                    </form>
                </Form>
                <SelectPlaylists form={form} playlists={playlists} courseId={courseId} setSelectedPlaylists={setSelectedPlaylists} />
            </DialogContent>
        </Dialog >

    )
}