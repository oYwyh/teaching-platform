import { DataTable } from "@/components/ui/table/DataTable";
import db from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { InstructorTableColumns, StudentsTableColumns } from "@/app/dashboard/_components/columns";
import Add from "@/app/dashboard/instructors/Add";
import { instructorTable, roleTable, userTable } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";

async function getData() {
    const joinedData = await db.select()
        .from(userTable)
        .leftJoin(roleTable, eq(roleTable.userId, userTable.id))
        .leftJoin(instructorTable, eq(instructorTable.userId, userTable.id))
        .where(eq(roleTable.role, 'instructor'));

    const users = joinedData.map(item => ({
        ...item.user,
        bio: item.instructor?.bio,
        specialty: item.instructor?.specialty,
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
                columns={InstructorTableColumns}
                data={data}
                hiddenColumns={['id', 'table']}
                restrictedColumns={['table']}
            />
        </div>
    )
}