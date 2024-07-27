import { DataTable } from "@/components/ui/table/DataTable";
import db from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { CoursesTableColumns } from "@/app/dashboard/_components/columns";
import Add from "@/app/dashboard/courses/Add";
import { courseTable, instructorTable, roleTable, userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function getData() {
    const courses = await db
        .select()
        .from(courseTable)

    const data = await db.select()
        .from(userTable)
        .leftJoin(roleTable, eq(roleTable.userId, userTable.id))
        .leftJoin(instructorTable, eq(instructorTable.userId, userTable.id))
        .where(eq(roleTable.role, 'instructor'));

    const instructors = data.map((item: any) => ({
        id: item.instructor.id,
        value: item.user.firstname + ' ' + item.user.lastname
    }));

    return {
        courses,
        instructors
    };
}

export default async function CoursePage() {
    const user = await validateRequest();
    if (!user) throw new Error('Unauthorized');
    const { courses, instructors } = await getData();

    return (
        <div>
            <Add instructors={instructors} />
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