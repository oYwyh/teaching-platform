import { DataTable } from "@/components/ui/table/DataTable";
import db from "@/lib/db";
// import AddPage from "./Add";
import { validateRequest } from "@/lib/auth";
import { StudentsTableColumns } from "@/app/dashboard/_components/columns";
import Add from "@/app/dashboard/_components/Add";

async function getData() {
    const users = await db.query.userTable.findMany({
        columns: {
            password: false
        },
        where: (userTable, { eq }) => eq(userTable.role, 'user'),
    });
    return users;
}

export default async function StudentsPage() {
    const user = await validateRequest()
    if (!user) throw new Error('Unauthorized')
    const data = await getData() as []

    return (
        <div>
            <Add />
            <DataTable columns={StudentsTableColumns} data={data} hiddenColumns={['id', 'role']} />
        </div>
    )
}
