'use client'

import { createExam } from "@/actions/exam.actions";
import SelectPlaylists from "@/app/dashboard/courses/[courseId]/SelectPlaylists";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormField from "@/components/ui/formField";
import { examStatuses } from "@/schemas/index.schema";
import { TPlaylist } from "@/types/index.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CreateExam({ playlists, courseId }: { playlists: TPlaylist[], courseId: number }) {
    const [selectedPlaylists, setSelectedPlaylists] = useState<TPlaylist[]>([])

    const createSchema = z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
    })

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
    })

    const onSubmit = async (data: z.infer<typeof createSchema>) => {
        await createExam(data, selectedPlaylists, courseId)
    }

    return (
        <Dialog>
            <DialogTrigger className="px-2 py-1 outline outline-2 shadow-lg outline-white text-white rounded-sm">Create Exam</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Exam</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField form={form} name="title" />
                        <FormField form={form} name="description" />
                    </form>
                </Form>
                <SelectPlaylists form={form} playlists={playlists} setSelectedPlaylists={setSelectedPlaylists} courseId={courseId} />
                <DialogFooter className="pt-2">
                    <Button className="mt-2 w-full" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}