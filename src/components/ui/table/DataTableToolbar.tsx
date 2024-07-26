

"use client"

import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { DataTableFacetedFilter } from "@/components/ui/table/DataTableFacetedFilter"
import { CirclePlus } from "lucide-react"
import { studentTypes } from "@/constants/index.constant"

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const typeColumnExists = table.getAllColumns().some(column => column.id === "type");

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {typeColumnExists && (
          <DataTableFacetedFilter
            column={table.getColumn("type")!}
            title="Types"
            options={studentTypes.map((type) => ({
              label: type.labelEn,
              value: type.value,
            }))}
          />
        )}
        {isFiltered && (
          <Button
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <CirclePlus className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}