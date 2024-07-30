"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/table/DataTableColumnHeader"
import * as XLSX from 'xlsx'
import Name, { TNameSchema } from "@/components/ui/name"

export type BaseColumnsTypes = {
    id: string | number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    phone: string;
    nationalId: string;
    age: string;
    gender: string;
}

export const baseColumns = ['id', 'firstname', 'lastname', 'email', 'phone', 'region', 'regionId', 'governorate', 'governorateId']

export const SelectTableColumn = [
    {
        id: "select",
        accessorKey: "select",
        header: ({ table }: { table: any }) => (
            <>
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />

            </>
        ),
        cell: ({ row }: { row: any }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
]

export const ExportTableColumn = [{
    id: "export",
    accessorKey: "export",
    header: ({ table }: { table: any }) => {
        const onExport = (data: any, title: string) => {
            // Create Excel workbook and worksheet
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils?.json_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'test');
            // Save the workbook as an Excel file
            XLSX.writeFile(workbook, `${title}.xlsx`);
        }

        const handleExportClick = (data: TNameSchema) => {
            const selectedRows = table.getSelectedRowModel().rows.map((row: any) => row.original);
            onExport(selectedRows, data.name);
        }

        return (
            <>
                {
                    table.getIsSomeRowsSelected() == true && (
                        <Name handleClick={handleExportClick} title={'Export'} name={'File'} />
                    )}
                {
                    table.getIsAllRowsSelected() == true && (
                        <Name handleClick={handleExportClick} title={'Export'} name={'File'} />
                    )
                }
            </>
        )
    },
}]