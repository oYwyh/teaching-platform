import { DataTable } from "@/components/ui/table/DataTable";
import db from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { InstructorTableColumns, StudentsTableColumns } from "@/app/dashboard/_components/columns";
import Add from "@/app/dashboard/instructors/Add";
import { instructorTable, roleTable, userTable } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { getById } from "@/actions/index.actions";

async function getData() {
    const joinedData = await db.select()
        .from(userTable)
        .leftJoin(roleTable, eq(roleTable.userId, userTable.id))
        .leftJoin(instructorTable, eq(instructorTable.userId, userTable.id))
        .where(eq(roleTable.role, 'instructor'));

    const users = Promise.all(joinedData.map(async (item) => ({
        id: item.user.id,
        firstname: item.user.firstname,
        lastname: item.user.lastname,
        email: item.user.email,
        phone: item.user.phone,
        region: await getById(item.user.regionId, 'region', true),
        regionId: item.user.regionId,
        governorate: await getById(item.user.governorateId, 'governorate', true),
        governorateId: item.user.governorateId,
        bio: item.instructor?.bio,
        specialty: item.instructor?.specialty,
        table: 'instructor'
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
                columns={InstructorTableColumns}
                data={data}
                hiddenColumns={['id', 'table', 'governorateId', 'regionId']}
                restrictedColumns={['table', 'governorateId', 'regionId']}
            />
        </div>
    )
}