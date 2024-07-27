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
import { studentContexts } from "@/constants/index.constant"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { TCourse, TInstructor, TRegion, TStudent, TSubject, TUser } from "@/types/index.type"

const studentsColumns = baseColumns.concat('parentPhone', 'englishExam', 'year', 'table')
const instructorColumns = baseColumns.concat('bio', 'specialty', 'table')
const regionsColumns = ['id', 'region', 'governorates', 'years', 'table']
const subjectsColumns = ['ids', 'subject', 'regions', 'context', 'table']
const coursesColumns = [
    'id',
    'title',
    'description',
    'instructorId',
    'price',
    'currency',
    'category',
    'enrolledStudents',
    'regionId',
    'subjectId',
    'yearId',
    'context',
    'status',
    'releasedAt',
    'updatedAt',
    'scheduledPublishDate',
    'scheduledUnpublishDate',
    'table'
]

const StudentsActionsTableColumn = [
    {
        id: "actions",
        accessorKey: "actions",
        header: () => {
            return (
                <p>Actions </p>
            )
        },
        cell: ({ row, table }: { row: Row<any>, table: Table<any> }) => {
            const rowData = studentsColumns.reduce((acc: { [key: string]: TUser & TStudent }, column: string) => {
                acc[column] = row.getValue(column);
                // add type column as well
                acc['context'] = row.getValue('context')
                acc['table'] = 'user'
                return acc;
            }, {});

            return (
                <Actions row={row} rowData={rowData} />
            )
        },
    },
]
const InstructorActionsTableColumn = [
    {
        id: "actions",
        accessorKey: "actions",
        header: () => {
            return (
                <p>Actions </p>
            )
        },
        cell: ({ row, table }: { row: Row<any>, table: Table<any> }) => {
            const rowData = instructorColumns.reduce((acc: { [key: string]: TInstructor }, column: string) => {
                acc[column] = row.getValue(column);
                // add type column as well
                acc['table'] = 'instructor'
                return acc;
            }, {});

            return (
                <Actions row={row} rowData={rowData} />
            )
        },
    },
]
const RegionsActionTableColumn = [
    {
        id: "actions",
        accessorKey: "actions",
        header: () => {
            return (
                <p>Actions </p>
            )
        },
        cell: ({ row, table }: { row: Row<any>, table: Table<any> }) => {
            const rowData = regionsColumns.reduce((acc: { [key: string]: TRegion }, column: string) => {
                acc[column] = row.getValue(column);
                acc['table'] = 'region'
                return acc;
            }, {});
            return (
                <Actions row={row} rowData={rowData} />
            )
        },
    },
]
const SubjectsActionTableColumn = [
    {
        id: "actions",
        accessorKey: "actions",
        header: () => {
            return (
                <p>Actions </p>
            )
        },
        cell: ({ row, table }: { row: Row<any>, table: Table<any> }) => {
            const rowData = subjectsColumns.reduce((acc: { [key: string]: TSubject }, column: string) => {
                acc[column] = row.getValue(column);
                acc['table'] = 'subject'
                return acc;
            }, {});
            return (
                <Actions row={row} rowData={rowData} />
            )
        },
    },
]
const CoursesActionTableColumn = [
    {
        id: "actions",
        accessorKey: "actions",
        header: () => {
            return (
                <p>Actions </p>
            )
        },
        cell: ({ row, table }: { row: Row<any>, table: Table<any> }) => {
            const rowData = coursesColumns.reduce((acc: { [key: string]: TCourse }, column: string) => {
                acc[column] = row.getValue(column);
                acc['table'] = 'course'
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
            const formattedValue = value ? value.replace('_', ' ') : '';

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
                    {cell.column.id == 'table' && (
                        <>user</>
                    )}
                    {cell.column.id != 'governorate' && cell.column.id != 'year' && cell.column.id != 'parentPhone' && cell.column.id != 'englishExam' && cell.column.id != 'table' && (
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
    ...StudentsActionsTableColumn,
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
    ...InstructorActionsTableColumn,
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
    ...RegionsActionTableColumn,
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
    ...SubjectsActionTableColumn,
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
        cell: ({ cell, row }: { cell: Cell<any, any>, row: Row<any> }) => {
            return (
                <>

                    {cell.column.id == 'table' && (
                        <>region</>
                    )}
                    {
                        cell.column.id != 'table' && (
                            <>
                                <p>{cell.getValue()}</p>
                            </>
                        )
                    }
                </>
            )
        }
    })),
    ...CoursesActionTableColumn,
    ...ExportTableColumn
]