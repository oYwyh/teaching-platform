"use client"

import { Cell, ColumnDef, flexRender, Row, Table } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/table/DataTableColumnHeader"
import { baseColumns, BaseColumnsTypes, SelectTableColumn, ExportTableColumn } from "@/constants/columns"
import Actions from "@/app/dashboard/_components/Actions"
import { getGovernorateArabicName } from "@/lib/funcs"
import RegionDialog from "@/app/dashboard/regions/RegionDialog"
import { studentTypes } from "@/constants/index.constant"

export type TStudentsColumns = BaseColumnsTypes;
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

const studentsColumns = baseColumns.concat('table')
const regionsColumns = ['id', 'region', 'governorates', 'years', 'table']
const examsColumns = ['id', 'exam', 'table']

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
            const rowData = baseColumns.reduce((acc: { [key: string]: TStudentsColumns }, column: string) => {
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