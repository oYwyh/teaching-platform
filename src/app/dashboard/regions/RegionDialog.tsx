'use client'

import { deleteAction } from "@/actions/index.actions"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import db from "@/lib/db"
import { Trash2 } from "lucide-react"
import { useState } from "react"

export default function RegionDialog({ array, region, regionId, name }: { array: string[], region: string, regionId: number, name: 'governorate' | 'year' }) {
    console.log(array)
    const [error, setError] = useState<string>('')

    const gradeOrder = [
        "first_grade", "second_grade", "third_grade", "fourth_grade", "fifth_grade",
        "sixth_grade", "seventh_grade", "eighth_grade", "ninth_grade",
        "tenth_grade", "eleventh_grade", "twelfth_grade"
    ];

    const sortedArray = array.sort((a, b) => gradeOrder.indexOf(a) - gradeOrder.indexOf(b));

    const onSubmit = async (id: string) => {
        if (array.length == 1) {
            setError('One' + " " + name + " " + 'at least is required!')
            return;
        }

        await deleteAction(id, name)
    }

    return (
        <>
            <Dialog>
                <div className="flex flex-row items-center gap-2">
                    <DialogTrigger className="p-2 shadow-md border-black rounded-md transition-all ease-in-out hover:shadow-lg">View</DialogTrigger>
                </div>
                <DialogContent>
                    <DialogHeader className="flex flex-row gap-1">
                        <DialogTitle>
                            List of <span className="capitalize">{region}'<span className="lowercase">s</span></span> {name}s
                        </DialogTitle>
                    </DialogHeader>
                    <Separator />
                    {sortedArray.length > 0 ? (
                        <>
                            <ScrollArea className="max-h-[300px] w-full rounded-md border p-4">
                                <div className="flex flex-col gap-2">
                                    {sortedArray.map((value) => (
                                        <div key={value} className="flex flex-row items-center justify-between">
                                            <p className="capitalize">{value.replace('_', ' ')}</p>
                                            <Trash2
                                                className="w-fit h-fit px-1 py-1 cursor-pointer transition-all ease-in-out rounded-sm hover:shadow-md"
                                                onClick={() => onSubmit(value)}
                                                color="red"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            {error && <p className="text-red-500">{error}</p>}
                        </>
                    ) : (
                        <p>No {name}s found</p>
                    )}
                </DialogContent>
            </Dialog >
        </>
    )
}