"use client"

import { Cell, ColumnDef, flexRender, Row, Table } from "@tanstack/react-table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DataTableColumnHeader } from "@/components/ui/table/DataTableColumnHeader"
import { baseColumns, BaseColumnsTypes, SelectTableColumn, ExportTableColumn } from "@/constants/columns"
import Actions from "@/app/dashboard/_components/Actions"
import { getGovernorateArabicName } from "@/lib/funcs"
import RemoveDialog from "@/app/dashboard/_components/RemoveDialog"
import { courseContexts, studentContexts, subjectContexts } from "@/constants/index.constant"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { TCourse, TInstructor, TRegion, TStudent, TSubject, TUser } from "@/types/index.type"

const studentsColumns = baseColumns.concat('parentPhone', 'subject', 'subjectId', 'year', 'yearId', 'context', 'table')
const instructorColumns = baseColumns.concat('bio', 'specialty', 'table')
const regionsColumns = ['id', 'region', 'governorates', 'years', 'table']
const subjectsColumns = ['ids', 'subject', 'regions', 'table']
const coursesColumns = [
    'id',
    'title',
    'description',
    'instructor',
    'instructorId',
    'price',
    'currency',
    'enrolledStudents',
    'region',
    'regionId',
    'subject',
    'subjectId',
    'year',
    'yearId',
    'status',
    'releasedAt',
    'updatedAt',
    'scheduledPublishDate',
    'scheduledUnpublishDate',
    'table'
]

const ActionsTableColumn = [
    {
        id: "actions",
        accessorKey: "actions",
        header: () => {
            return (
                <p>Actions </p>
            )
        },
        cell: ({ row }: { row: Row<any> }) => {

            const tablesMap = {
                user: baseColumns,
                student: studentsColumns,
                instructor: instructorColumns,
                region: regionsColumns,
                subject: subjectsColumns,
                course: coursesColumns
            };

            const table: keyof typeof tablesMap = row.getValue('table')

            const rowData = tablesMap[table].reduce((acc: { [key: string]: TUser & TStudent }, column: string) => {
                acc[column] = row.getValue(column);
                return acc;
            }, {});

            return (
                <Actions row={row} rowData={rowData} />
            )
        },
    },
]

export const StudentsTableColumns: ColumnDef<TUser & TStudent>[] = [
    ...SelectTableColumn,
    ...studentsColumns.map((column: string) => ({
        accessorKey: column,
        header: ({ column }: { column: any }) => {
            return (
                <DataTableColumnHeader column={column} title={column.name || column.id} />
            )
        },
        cell: ({ cell, row }: { cell: Cell<any, any>, row: Row<any> }) => {
            const value = cell.getValue();
            const formattedValue = value;

            return (
                <>
                    {cell.column.id == 'governorate' && (
                        <p>{formattedValue}</p>
                    )}
                    {cell.column.id == 'parentPhone' && row.getValue('context') == 'school' && (
                        <p>{value}</p>
                    )}
                    {cell.column.id == 'parentPhone' && row.getValue('context') == 'englishExam' && (
                        <p>None</p>
                    )}
                    {cell.column.id == 'year' && row.getValue('context') == 'school' && (
                        <p>{formattedValue}</p>
                    )}
                    {cell.column.id == 'year' && row.getValue('context') == 'englishExam' && (
                        <p>None</p>
                    )}
                    {cell.column.id == 'englishExam' && row.getValue('context') == 'school' && (
                        <p>None</p>
                    )}
                    {cell.column.id == 'englishExam' && row.getValue('context') == 'englishExam' && (
                        <p>{formattedValue}</p>
                    )}
                    {cell.column.id != 'governorate' && cell.column.id != 'year' && cell.column.id != 'parentPhone' && cell.column.id != 'englishExam' && (
                        <p>{value}</p>
                    )}
                </>
            )
        }
    })),
    {
        accessorKey: "context",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Context" />
        ),
        cell: ({ row }) => {
            const context = studentContexts.find(
                (context) => context.value === row.getValue("context")
            )

            if (!context) {
                return null
            }

            return (
                <div className="flex w-[100px] items-center">
                    <span>{context.labelEn}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    ...ActionsTableColumn,
    ...ExportTableColumn
];

export const InstructorTableColumns: ColumnDef<TInstructor>[] = [
    ...SelectTableColumn,
    ...instructorColumns.map((column: string) => ({
        accessorKey: column,
        header: ({ column }: { column: any }) => {
            return (
                <DataTableColumnHeader column={column} title={column.name || column.id} />
            )
        },
        cell: ({ cell, row }: { cell: Cell<any, any>, row: Row<any> }) => {
            return (
                <>
                    {cell.column.id == 'bio' && (
                        <Dialog>
                            <DialogTrigger className="cursor-pointer p-2 border shadow-sm rounded-sm">View</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Instructor Bio</DialogTitle>
                                </DialogHeader>
                                <ScrollArea className="max-h-[80vh] w-full rounded-md border p-4">
                                    {cell.getValue()}
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    )}
                    {cell.column.id == 'table' && (
                        <>instructor</>
                    )}
                    {cell.column.id != 'table' && cell.column.id != 'bio' && (
                        <p>{row.getValue(column)}</p>
                    )}
                </>
            )
        }
    })),
    ...ActionsTableColumn,
    ...ExportTableColumn
];

export const RegionsTableColumns: ColumnDef<TRegion>[] = [
    ...SelectTableColumn,
    ...regionsColumns.map((column: string) => ({
        accessorKey: column,
        header: ({ column }: { column: any }) => {
            return (
                <DataTableColumnHeader column={column} title={column.name || column.id} />
            )
        },
        cell: ({ cell, row }: { cell: Cell<any, any>, row: Row<any> }) => {
            return (
                <>
                    {
                        cell.column.id == 'governorates' && (
                            <>
                                <RemoveDialog
                                    array={row.getValue('governorates')}
                                    region={{ id: row.getValue('id'), region: row.getValue('region') }}
                                    name='governorate'
                                />
                            </>
                        )
                    }
                    {
                        cell.column.id == 'years' && (
                            <>
                                <RemoveDialog
                                    array={row.getValue('years')}
                                    region={{ id: row.getValue('id'), region: row.getValue('region') }}
                                    name='year'
                                />
                            </>
                        )
                    }
                    {cell.column.id == 'table' && (
                        <>region</>
                    )}
                    {
                        cell.column.id != 'years' && cell.column.id != 'governorates' && cell.column.id != 'table' && (
                            <>
                                <p>{cell.getValue()}</p>
                            </>
                        )
                    }
                </>
            )
        }
    })),
    ...ActionsTableColumn,
    ...ExportTableColumn
]

export const SubjectsTableColumns: ColumnDef<TSubject>[] = [
    ...SelectTableColumn,
    ...subjectsColumns.map((column: string) => ({
        accessorKey: column,
        header: ({ column }: { column: any }) => {
            return (
                <DataTableColumnHeader column={column} title={column.name || column.id} />
            )
        },
        cell: ({ cell, row }: { cell: Cell<any, any>, row: Row<any> }) => {
            return (
                <>
                    {cell.column.id == 'table' && (
                        <>subject</>
                    )}
                    {cell.column.id == 'ids' && (
                        <>{JSON.stringify(cell.getValue())}</>
                    )}
                    {cell.column.id == 'regions' && (
                        <>
                            {row.getValue('context') == 'school' ? (
                                <RemoveDialog regions={cell.getValue()} name="subject" />
                            ) : (
                                <div className="p-2">None</div>
                            )}
                        </>
                    )}
                    {cell.column.id != 'table' && cell.column.id != 'regions' && cell.column.id != 'ids' && (
                        <p>{cell.getValue()}</p>
                    )}
                </>
            )
        }
    })),
    {
        accessorKey: "context",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Context" />
        ),
        cell: ({ row }) => {
            const context = subjectContexts.find(
                (context) => context.value === row.getValue("context")
            )

            if (!context) {
                return null
            }

            return (
                <div className="flex w-[100px] items-center">
                    <span>{context.labelEn}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    ...ActionsTableColumn,
    ...ExportTableColumn
]

export const CoursesTableColumns: ColumnDef<TCourse>[] = [
    ...SelectTableColumn,
    ...coursesColumns.map((column: string) => ({
        accessorKey: column,
        header: ({ column }: { column: any }) => {
            return (
                <DataTableColumnHeader column={column} title={column.name || column.id} />
            )
        },
    })),
    {
        accessorKey: "context",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Context" />
        ),
        cell: ({ row }) => {
            const context = courseContexts.find(
                (context) => context.value === row.getValue("context")
            )

            if (!context) {
                return null
            }

            return (
                <div className="flex w-[100px] items-center">
                    <span>{context.labelEn}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    ...ActionsTableColumn,
    ...ExportTableColumn
]