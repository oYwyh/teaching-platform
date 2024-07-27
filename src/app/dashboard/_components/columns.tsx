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
import RegionDialog from "@/app/dashboard/regions/RegionDialog"
import { studentTypes } from "@/constants/index.constant"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { TCourse } from "@/types/index.type"

export type TStudentsColumns = BaseColumnsTypes & {
    parentPhone: string
    exam: string
    year: string
};
export type TInstructorColumns = BaseColumnsTypes & {
    bio: string
    specialty: string
};
export type TRegionsColumns = {
    id: number
    region: string
    governorates: any
    years: any
};
export type TGovernoratesColumns = {
    id: number
    governorate: string
};

export type TExamsColumns = {
    id: number
    exam: string
}

export type TCourseColumns = TCourse

const studentsColumns = baseColumns.concat('parentPhone', 'exam', 'year', 'table')
const instructorColumns = baseColumns.concat('bio', 'specialty', 'table')
const regionsColumns = ['id', 'region', 'governorates', 'years', 'table']
const examsColumns = ['id', 'exam', 'table']
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
    'examId',
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
            const rowData = studentsColumns.reduce((acc: { [key: string]: TStudentsColumns }, column: string) => {
                acc[column] = row.getValue(column);
                // add type column as well
                acc['type'] = row.getValue('type')
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
            const rowData = instructorColumns.reduce((acc: { [key: string]: TInstructorColumns }, column: string) => {
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
            const rowData = regionsColumns.reduce((acc: { [key: string]: TRegionsColumns }, column: string) => {
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
const ExamActionTableColumn = [
    {
        id: "actions",
        accessorKey: "actions",
        header: () => {
            return (
                <p>Actions </p>
            )
        },
        cell: ({ row, table }: { row: Row<any>, table: Table<any> }) => {
            const rowData = examsColumns.reduce((acc: { [key: string]: TRegionsColumns }, column: string) => {
                acc[column] = row.getValue(column);
                acc['table'] = 'exam'
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
            const rowData = coursesColumns.reduce((acc: { [key: string]: TCourseColumns }, column: string) => {
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

export const StudentsTableColumns: ColumnDef<TStudentsColumns>[] = [
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
                    {cell.column.id == 'parentPhone' && row.getValue('type') == 'school' && (
                        <p>{value}</p>
                    )}
                    {cell.column.id == 'parentPhone' && row.getValue('type') == 'exam' && (
                        <p>None</p>
                    )}
                    {cell.column.id == 'year' && row.getValue('type') == 'school' && (
                        <p>{formattedValue}</p>
                    )}
                    {cell.column.id == 'year' && row.getValue('type') == 'exam' && (
                        <p>None</p>
                    )}
                    {cell.column.id == 'exam' && row.getValue('type') == 'school' && (
                        <p>None</p>
                    )}
                    {cell.column.id == 'exam' && row.getValue('type') == 'exam' && (
                        <p>{formattedValue}</p>
                    )}
                    {cell.column.id == 'table' && (
                        <>user</>
                    )}
                    {cell.column.id != 'governorate' && cell.column.id != 'year' && cell.column.id != 'parentPhone' && cell.column.id != 'exam' && cell.column.id != 'table' && (
                        <p>{value}</p>
                    )}
                </>
            )
        }
    })),
    {
        accessorKey: "type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => {
            const type = studentTypes.find(
                (type) => type.value === row.getValue("type")
            )

            if (!type) {
                return null
            }

            return (
                <div className="flex w-[100px] items-center">
                    <span>{type.labelEn}</span>
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

export const InstructorTableColumns: ColumnDef<TInstructorColumns>[] = [
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


export const RegionsTableColumns: ColumnDef<TRegionsColumns>[] = [
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
                                <RegionDialog
                                    array={row.getValue('governorates') as string[]}
                                    region={row.getValue('region') as string}
                                    regionId={row.getValue('id') as number}
                                    name='governorate'
                                />
                            </>
                        )
                    }
                    {
                        cell.column.id == 'years' && (
                            <>
                                <RegionDialog
                                    array={row.getValue('years') as string[]}
                                    region={row.getValue('region') as string}
                                    regionId={row.getValue('id') as number}
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

export const ExamxTableColumns: ColumnDef<TExamsColumns>[] = [
    ...SelectTableColumn,
    ...examsColumns.map((column: string) => ({
        accessorKey: column,
        header: ({ column }: { column: any }) => {
            return (
                <DataTableColumnHeader column={column} title={column.name || column.id} />
            )
        },
        cell: ({ cell, row }: { cell: Cell<any, any>, row: Row<any> }) => {
            return (
                <>
                    {cell.column.id == 'table' ? (
                        <>exam</>
                    ) : (
                        <p>{cell.getValue()}</p>
                    )}
                </>
            )
        }
    })),
    ...ExamActionTableColumn,
    ...ExportTableColumn
]

export const CoursesTableColumns: ColumnDef<TCourseColumns>[] = [
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
                    {
                        cell.column.id == 'governorates' && (
                            <>
                                <RegionDialog
                                    array={row.getValue('governorates') as string[]}
                                    region={row.getValue('region') as string}
                                    regionId={row.getValue('id') as number}
                                    name='governorate'
                                />
                            </>
                        )
                    }
                    {
                        cell.column.id == 'years' && (
                            <>
                                <RegionDialog
                                    array={row.getValue('years') as string[]}
                                    region={row.getValue('region') as string}
                                    regionId={row.getValue('id') as number}
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
    ...CoursesActionTableColumn,
    ...ExportTableColumn
]