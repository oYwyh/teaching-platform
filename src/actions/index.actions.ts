import db from "@/lib/db";
import { columnsRegex } from "@/types/index.type";
import { revalidatePath } from "next/cache";

export const uniqueColumnsValidations = async (data: any) => {
    const columns = [
        data.email && { column: 'email', value: data?.email, regex: columnsRegex.email },
        data.phone && { column: 'phone', value: data?.phone, regex: columnsRegex.phone },
        data.parentPhone && { column: 'parentPhone', value: data?.parentPhone, regex: columnsRegex.phone },
    ].filter(Boolean) as { column: string; value: string; regex: RegExp; }[];

    const errors: Record<string, string> = {};

    for (const { column, value, regex } of columns) {
        const exist = await db.query.userTable.findFirst({
            columns: { [column]: true },
            where: (userTable: { [key: string]: any }, { eq }) => eq(userTable[column], value),
        });

        if (exist) {
            errors[column] = `${column.charAt(0).toUpperCase() + column.slice(1)} already exists`;
        }
        if (!regex.test(value)) {
            errors[column] = `${column.charAt(0).toUpperCase() + column.slice(1)} is invalid`;
        }

        // Additional check for phone in parentPhone and vice versa
        if (column === 'phone' || column === 'parentPhone') {
            const otherColumn = column === 'phone' ? 'parentPhone' : 'phone';
            const otherExist = await db.query.userTable.findFirst({
                columns: { [otherColumn]: true },
                where: (userTable: { [key: string]: any }, { eq }) => eq(userTable[otherColumn], value),
            });

            if (otherExist) {
                errors[column] = `${column.charAt(0).toUpperCase() + column.slice(1)} already exists as ${otherColumn}`;
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        return { error: errors };
    }
}

