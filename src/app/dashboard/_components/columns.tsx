"use client"

import { Cell, ColumnDef, Row, Table } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/table/DataTableColumnHeader"
import { baseColumns, BaseColumnsTypes, SelectTableColumn, ExportTableColumn } from "@/constants/columns"
import Actions from "@/app/dashboard/_components/Actions"
import { getGovernorateArabicName } from "@/lib/funcs"


export type StudentsColumnsTypes = BaseColumnsTypes;

const studentsColumns = baseColumns

const ActionsTableColumn = [
    {
        id: "actions",
        accessorKey: "actions",
        header: () => {
            return (
                <p>Actions </p>
            )
        },
        cell: ({ row, table }: { row: Row<any>, table: Table<any> }) => {
            const rowData = baseColumns.reduce((acc: { [key: string]: StudentsColumnsTypes }, column: string) => {
                acc[column] = row.getValue(column);
                return acc;
            }, {});

            return (
                <Actions row={row} rowData={rowData} />
            )
        },
    },
]
export const StudentsTableColumns: ColumnDef<StudentsColumnsTypes>[] = [
    ...SelectTableColumn,
    ...studentsColumns.map((column: string) => ({
        accessorKey: column,
        header: ({ column }: { column: any }) => {
            return (
                <DataTableColumnHeader column={column} title={column.name || column.id} />
            )
        },
        cell: ({ cell }: { cell: Cell<any, any> }) => {
            console.log()
            return (
                <>
                    {cell.column.id == 'governorate' ? (
                        <p>{getGovernorateArabicName(cell.getValue())}</p >
                    ) : (
                        <p>{cell.getValue()}</p >
                    )}
                </>
            )
        }
    })),
    ...ActionsTableColumn,
    ...ExportTableColumn
]