import { create } from "@/actions/playlist.actions"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import FormField from "@/components/ui/formField"
import { createSchema, TCreateSchema } from "@/schemas/playlist.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function CreatePlaylist({ courseId, triggerClassName = 'outline-white text-white' }: { courseId: number, triggerClassName?: string }) {
    const [open, setOpen] = useState(false);

    const playlistCreationForm = useForm<TCreateSchema>({
        resolver: zodResolver(createSchema),
    })

    const onSubmit = async (data: TCreateSchema) => {
        setOpen(false)
        await create(data, courseId)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={`px-2 py-1 outline outline-2 shadow-lg  rounded-sm ${triggerClassName}`}>
                Create a playlist
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a playlist</DialogTitle>
                </DialogHeader>
                <Form {...playlistCreationForm}>
                    <form onSubmit={playlistCreationForm.handleSubmit(onSubmit)}>
                        <FormField form={playlistCreationForm} name="title" />
                        <FormField form={playlistCreationForm} name="description" textarea />
                        <FormField form={playlistCreationForm} name="status" select="playlistStatus" />
                        <Button className="w-full mt-2">Create</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
