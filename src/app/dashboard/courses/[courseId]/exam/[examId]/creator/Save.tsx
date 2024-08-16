import { save } from "@/actions/exam.actions"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TExam } from "@/types/index.type"
import { useState } from "react"


export default function Save({ exam }: { exam: TExam }) {
    const [open, setOpen] = useState(false)

    const handleSaveWithPublish = async () => {
        await save(exam.courseId, exam.courseId, true)
    }

    const handleSaveWithoutPublish = async () => {
        await save(exam.courseId, exam.courseId, false)
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="px-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground">Save</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Save</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSaveWithPublish} className="bg-blue-500 hover:bg-blue-600">Save and publish</AlertDialogAction>
                    <AlertDialogAction onClick={handleSaveWithoutPublish} className="bg-green-500 hover:bg-green-600">Save without publish</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}