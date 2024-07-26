import { DataTable } from "@/components/ui/table/DataTable";
import db from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { RegionsTableColumns } from "@/app/dashboard/_components/columns";
import Add from "@/app/dashboard/regions/Add";
import { governorateTable, regionTable, yearTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { TGovernorate, TRegion, TYear } from "@/types/index.type";

async function getData() {
    const data = await db
        .select()
        .from(regionTable)
        .leftJoin(governorateTable, eq(regionTable.id, governorateTable.regionId))
        .leftJoin(yearTable, eq(regionTable.id, yearTable.regionId));


    // Structure the data into regions and their related governorates and school years
    const structuredData = data.reduce((acc: {
        [key: number]: {
            region: TRegion;
            governorates: Set<string>;
            years: Set<string>;
        }
    }, row) => {
        const region = row.region;
        const governorate = row.governorate;
        const year = row.year; // Change here to match the log data

        if (!region) return acc; // Skip if region is undefined

        const regionId = region.id;

        if (!acc[regionId]) {
            acc[regionId] = {
                region,
                governorates: new Set(),
                years: new Set()
            };
        }

        if (governorate) {
            acc[regionId].governorates.add(governorate.governorate);
        }

        if (year) {
            acc[regionId].years.add(year.year);
        }

        return acc;
    }, {});

    // Convert structured data to array format with governorates and years included in each region object
    const regionsWithGovernoratesAndYears = Object.values(structuredData).map(item => ({
        ...item.region,
        governorates: Array.from(item.governorates), // Convert Set to Array
        years: Array.from(item.years) // Convert Set to Array
    }));

    return regionsWithGovernoratesAndYears;
}

const getExistingRegions = async () => {
    const regions = await db
        .select()
        .from(regionTable);

    const regionNames = regions.map(region => region.region);
    return regionNames;
}

export default async function RegionsPage() {
    const user = await validateRequest();
    if (!user) throw new Error('Unauthorized');

    const data = await getData();

    console.log(data)
    const existingRegions = await getExistingRegions()


    return (
        <div>
            <Add existingRegions={existingRegions} />
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
