import { updateExam } from "@/actions/exam.actions"
import SelectPlaylists from "@/app/dashboard/courses/[courseId]/SelectPlaylists"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import FormField from "@/components/ui/formField"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { examStatuses } from "@/schemas/index.schema"
import { TExam, TPlaylist } from "@/types/index.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


export default function Settings({ exam, playlists }: { exam: TExam, playlists: TPlaylist[] }) {
    const [open, setOpen] = useState(false)
    const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>(exam.playlistIds.toString().split(','));
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        console.log(selectedPlaylists)
    }, [selectedPlaylists])

    const settingsSchema = z.object({
        title: z.string(),
        description: z.string(),
    })

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            title: exam.title,
            description: exam.description,
        }
    })

    const onSubmit = async (data: z.infer<typeof settingsSchema>) => {
        const changedData: Partial<z.infer<typeof settingsSchema>> = {};
        for (const key in data) {
            if (data[key as keyof z.infer<typeof settingsSchema>] !== exam[key as keyof z.infer<typeof settingsSchema>]) {
                changedData[key as keyof z.infer<typeof settingsSchema>] = data[key as keyof z.infer<typeof settingsSchema>];
            }
        }

        if (Object.keys(changedData).length === 0) {
            setError('No changes made')
            return;
        }
        setError('')

        await updateExam(changedData, selectedPlaylists, exam.id)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="px-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground">Exam Settings</DialogTrigger>
            <DialogContent>
                <DialogHeader>Exam Settings</DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField form={form} name="title" />
                        <FormField form={form} name="description" />
                        <SelectPlaylists form={form} playlists={playlists} setSelectedPlaylists={setSelectedPlaylists} courseId={exam.courseId} selectedPlaylists={selectedPlaylists} />
                        <div className="flex flex-col gap-1">
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <Button variant="outline" className="w-full">Save</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}