import { DataTable } from "@/components/ui/table/DataTable";
import db from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { ExamxTableColumns, RegionsTableColumns } from "@/app/dashboard/_components/columns";
import Add from "@/app/dashboard/exams/Add";
import { examTable } from "@/lib/db/schema";

async function getData() {
    const data = await db
        .select()
        .from(examTable)

    return data;
}

const getExistingExams = async () => {
    const exams = await db
        .select()
        .from(examTable);

    const examNames = exams.map(exam => exam.exam);
    return examNames;
}

export default async function ExamPage() {
    const user = await validateRequest();
    if (!user) throw new Error('Unauthorized');

    const data = await getData();
    const existingExams = await getExistingExams()

    return (
        <div>
            <Add existingExams={existingExams} />
            <DataTable
                columns={ExamxTableColumns}
                search="exam"
                data={data}
                hiddenColumns={['id', 'table']}
                restrictedColumns={['table']}
            />
        </div>
    );
}
