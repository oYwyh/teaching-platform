import { DataTable } from "@/components/ui/table/DataTable";
import db from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { CoursesTableColumns } from "@/app/dashboard/_components/columns";
import Add from "@/app/dashboard/courses/create/page";
import { courseTable, instructorTable, roleTable, userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { TCourse } from "@/types/index.type";

async function getData(): Promise<TCourse[]> {
    const courses = await db.query.courseTable.findMany().execute()

    return courses
}

export default async function CoursePage() {
    const user = await validateRequest();
    if (!user) throw new Error('Unauthorized');
    const courses = await getData();

    return (
        <div>
            <Add />
            <DataTable
                columns={CoursesTableColumns}
                search="title"
                data={courses}
                hiddenColumns={['id', 'regionId', 'yearId', 'instructorId', 'examId', 'table']}
                restrictedColumns={['table']}
            />
        </div>
    );
}