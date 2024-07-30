import { TCreateSchema } from "@/schemas/course.schema";

export async function create(data: TCreateSchema) {
    console.log(`server action`)
    console.log(data)
    const { context, currency, description, instructorId, price, promo, region, status, subject, thumbnail, title, year } = data

    // const course = await db.insert(courseTable).values({
    //     title: data.title,
    // })  
}