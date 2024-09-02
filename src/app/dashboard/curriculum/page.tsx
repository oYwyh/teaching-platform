import { DataTable } from "@/components/ui/table/DataTable";
import { validateRequest } from "@/lib/auth";
import { RegionsTableColumns } from "@/app/dashboard/_components/columns";
import Add from "@/app/dashboard/curriculum/Add";
import db from "@/lib/db";
import { curriculumTable } from "@/lib/db/schema";

const getData = async () => {
    const rawData = await db.select().from(curriculumTable);

    const data = Object.values(rawData).map(item => ({
        ...item,
        table: 'region',
    }));

    return data
}

export default async function CurriculumPage() {
    const user = await validateRequest();
    if (!user) throw new Error('Unauthorized');

    const data = await getData();

    return (
        <div>
            <Add />
            <DataTable
                columns={RegionsTableColumns}
                search="region"
                data={data}
                hiddenColumns={['id', 'table']}
                restrictedColumns={['table']}
            />
        </div>
    );
}