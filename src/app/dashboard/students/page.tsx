import { DataTable } from "@/components/ui/table/DataTable";
import db from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { StudentsTableColumns } from "@/app/dashboard/_components/columns";
import Add from "@/app/dashboard/students/Add";
import { roleTable, studentTable, userTable } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";

async function getData() {
    const joinedData = await db.select()
        .from(userTable)
        .leftJoin(roleTable, eq(roleTable.userId, userTable.id))
        .leftJoin(studentTable, eq(studentTable.userId, userTable.id))
        .where(eq(roleTable.role, 'user'));

    const users = joinedData.map(item => ({
        ...item.user,
        year: item.student?.year,
        englishExam: item.student?.englishExam,
        parentPhone: item.student?.parentPhone,
        context: item.student?.context
    }));

    return users;
}

export default async function StudentsPage() {
    const user = await validateRequest()
    if (!user) throw new Error('Unauthorized')
    const data = await getData() as []

    return (
        <div>
            <Add />
            <DataTable
                columns={StudentsTableColumns}
                data={data}
                hiddenColumns={['id', 'table']}
                restrictedColumns={['table']}
            />
        </div>
    )
}