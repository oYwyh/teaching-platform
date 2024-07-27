import { DataTable } from "@/components/ui/table/DataTable";
import db from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { RegionsTableColumns, SubjectsTableColumns } from "@/app/dashboard/_components/columns";
import Add from "@/app/dashboard/subjects/Add";
import { regionTable, subjectTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function getData() {
    const data = await db.select().from(subjectTable)
        .leftJoin(regionTable, eq(regionTable.id, subjectTable.regionId));

    // Create a map to store subjects with their combined region information
    const subjectsMap = new Map();

    data.forEach(({ subject, region }) => {
        const key = `${subject.subject}-${subject.context}`; // Use subject and context as the key

        if (!subjectsMap.has(key)) {
            subjectsMap.set(key, {
                ids: [],
                subject: subject.subject,
                context: subject.context,
                createdAt: subject.createdAt,
                updatedAt: subject.updatedAt,
                regions: []
            });
        }

        const subjectData = subjectsMap.get(key);
        subjectData.ids.push({ subjectId: subject.id, regionId: subject.regionId });

        if (region) {
            subjectData.regions.push({ id: region.id, region: region.region, subjectId: subject.id });
        }
    });

    // Convert the map to an array
    const subjectsArray = Array.from(subjectsMap.values());

    return subjectsArray;
}

const getExistingSubjects = async () => {
    const subjects = await db
        .select()
        .from(subjectTable);

    const subjectsNames = subjects.map(subject => subject.subject);
    return subjectsNames;
}

export default async function ExamPage() {
    const user = await validateRequest();
    if (!user) throw new Error('Unauthorized');

    const data = await getData();
    const existingSubjects = await getExistingSubjects()


    return (
        <div>
            <Add existingSubjects={existingSubjects} />
            <DataTable
                columns={SubjectsTableColumns}
                search="subject"
                data={data}
                hiddenColumns={['ids', 'table']}
                restrictedColumns={['ids', 'table']}
            />
        </div>
    );
}