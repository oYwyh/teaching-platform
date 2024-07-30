import { DataTable } from "@/components/ui/table/DataTable";
import db from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { StudentsTableColumns } from "@/app/dashboard/_components/columns";
import Add from "@/app/dashboard/students/Add";
import { roleTable, studentTable, userTable } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { getById } from "@/actions/index.actions";

async function getData() {
    const joinedData = await db
        .select({
            user: userTable,
            role: roleTable,
            student: studentTable,
        })
        .from(userTable)
        .leftJoin(roleTable, eq(roleTable.userId, userTable.id))
        .leftJoin(studentTable, eq(studentTable.userId, userTable.id))
        .where(eq(roleTable.role, 'user'));

    const users = await Promise.all(joinedData.map(async (item) => ({
        id: item.user.id,
        firstname: item.user.firstname,
        lastname: item.user.lastname,
        email: item.user.email,
        phone: item.user.phone,
        region: await getById(item.user.regionId, 'region', true),
        regionId: item.user.regionId,
        governorate: await getById(item.user.governorateId, 'governorate', true),
        governorateId: item.user.governorateId,
        year: item.student?.yearId ? await getById(item.student?.yearId, 'year', true) : 'None',
        yearId: item.student?.yearId,
        subject: item.student?.subjectId ? await getById(item.student?.subjectId, 'subject', true) : 'None',
        subjectId: item.student?.subjectId,
        parentPhone: item.student?.parentPhone,
        context: item.student?.context,
        table: 'student'
    })));

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
                hiddenColumns={['id', 'table', 'regionId', 'yearId', 'subjectId', 'governorateId']}
                restrictedColumns={['table', 'regionId', 'yearId', 'subjectId', 'governorateId']}
            />
        </div>
    )
}