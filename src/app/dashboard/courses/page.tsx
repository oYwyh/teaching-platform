import { DataTable } from "@/components/ui/table/DataTable";
import db from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { CoursesTableColumns } from "@/app/dashboard/_components/columns";
import Add from "@/app/dashboard/courses/create/page";
import { courseTable, instructorTable, roleTable, userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { TCourse } from "@/types/index.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getById } from "@/actions/index.actions";
import { ItemIndicator } from "@radix-ui/react-select";

async function getData() {
    const data = await db.select().from(courseTable)


    const courses = Promise.all(data.map(async (item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        instructor: await getById(item.instructorId, 'instructor', true),
        price: item.price,
        currency: item.currency,
        enrolledStudents: item.enrolledStudents,
        region: await getById(item.regionId || undefined, 'region', true),
        regionId: item.regionId,
        year: await getById(item.yearId || undefined, 'year', true),
        yearId: item.yearId,
        subject: await getById(item.subjectId || undefined, 'subject', true),
        subjectId: item.subjectId,
        context: item.context,
        status: item.status,
        releasedAt: new Date(item.releasedAt).toLocaleDateString(),
        updatedAt: new Date(item.updatedAt).toLocaleDateString(),
        scheduledPublishDate: item.scheduledPublishDate ? new Date(item.scheduledPublishDate).toLocaleDateString() : null,
        scheduledUnpublishDate: item.scheduledUnpublishDate ? new Date(item.scheduledUnpublishDate).toLocaleDateString() : null,
        table: 'course'
    })))

    return courses;
}

export default async function CoursePage() {
    const user = await validateRequest();
    if (!user) throw new Error('Unauthorized');
    const courses = await getData();

    return (
        <div>
            <Link href="/dashboard/courses/create">
                <Button>create</Button>
            </Link>
            <DataTable
                columns={CoursesTableColumns}
                search="title"
                data={courses}
                hiddenColumns={['id', 'regionId', 'yearId', 'instructorId', 'subjectId', 'table']}
                restrictedColumns={['table']}
            />
        </div>
    );
}