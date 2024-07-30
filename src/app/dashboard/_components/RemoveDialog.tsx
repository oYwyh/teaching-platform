'use client'

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
import { Trash2 } from "lucide-react"
import { useState } from "react"

interface RegionDialogProps {
    array?: { id: number, year?: string, governorate?: string }[],
    region?: { id: number, region: string },
    name?: 'governorate' | 'year' | 'subject',
    regions?: { id: number, region: string, subjectId: number }[]
}


export default function RemoveDialog({ array, region, name, regions }: RegionDialogProps) {
    const [dialogOpen, setDialogOpen] = useState<boolean | undefined>()
    const [alertOpen, setAlertOpen] = useState<boolean | undefined>()
    const [error, setError] = useState<string>('')
    const [subjectId, setSubjectId] = useState<number>(0)

    const gradeOrder = [
        "first_grade", "second_grade", "third_grade", "fourth_grade", "fifth_grade",
        "sixth_grade", "seventh_grade", "eighth_grade", "ninth_grade",
        "tenth_grade", "eleventh_grade", "twelfth_grade"
    ];

    const sortedArray = array ? array.sort((a, b) => gradeOrder.indexOf(a.year || '') - gradeOrder.indexOf(b.year || '')) : [];

    const handleDelete = async (id: number, type: 'governorate' | 'year' | 'subject') => {
        if (type !== 'subject' && array && array.length === 1) {
            setError('One ' + name + ' at least is required!')
            setAlertOpen(false)
            return;
        }
        if (type == 'subject' && regions?.length == 1) {
            setError('No Regions = No School Subject, if you wish to remove it continue this actin trough the action column' /* since i was the lazy to implement this functionality here */)
            setAlertOpen(false)
            return;
        }

        await deleteAction(id, type)
        setError('')
        setAlertOpen(false)
        setDialogOpen(false)
    }

    return (
        <>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <div className="flex flex-row items-center gap-2">
                    <DialogTrigger className="p-2 shadow-md border-black rounded-md transition-all ease-in-out hover:shadow-lg">View</DialogTrigger>
                </div>
                <DialogContent>
                    <DialogHeader className="flex flex-row gap-1">
                        <DialogTitle>
                            {region && name && `List of ${region.region}'s ${name}s`}
                            {name == 'subject' && `List of Regions`}
                        </DialogTitle>
                    </DialogHeader>
                    <Separator />
                    {regions ? (
                        <ScrollArea className="max-h-[300px] w-full rounded-md border p-4">
                            <div className="flex flex-col gap-2">
                                {regions.map((region) => (
                                    <div key={region.id} className="flex flex-row items-center justify-between">
                                        <p className="capitalize">{region.region.replace('_', ' ')}</p>
                                        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                                            <AlertDialogTrigger asChild>
                                                <Trash2
                                                    className="w-fit h-fit px-1 py-1 cursor-pointer transition-all ease-in-out rounded-sm hover:shadow-md"
                                                    color="red"
                                                    onClick={() => setSubjectId(region.subjectId)}
                                                />
                                            </AlertDialogTrigger>
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
                                                    <Button
                                                        variant='destructive'
                                                        onClick={(e) => handleDelete(subjectId, 'subject')}
                                                    >
                                                        Remove
                                                    </Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    ) : sortedArray.length > 0 && name ? (
                        <>
                            < ScrollArea className="max-h-[300px] w-full rounded-md border p-4">
                                <div className="flex flex-col gap-2">
                                    {sortedArray.map((value) => (
                                        <div key={value.id} className="flex flex-row items-center justify-between">
                                            <p className="capitalize">{name === 'governorate' ? value.governorate?.replace('_', ' ') : value.year?.replace('_', ' ')}</p>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Trash2
                                                        className="w-fit h-fit px-1 py-1 cursor-pointer transition-all ease-in-out rounded-sm hover:shadow-md"
                                                        color="red"
                                                    />
                                                </AlertDialogTrigger>
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
                                                        <Button
                                                            variant='destructive'
                                                            onClick={() => handleDelete(value.id, name)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </>
                    ) : (
                        <p>No {name || 'regions'} found</p>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                </DialogContent>
            </Dialog >
        </>
    )
}