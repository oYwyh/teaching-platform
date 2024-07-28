import { TCreateSchema } from "@/schemas/course.schema";

export async function create(data: TCreateSchema) {
    const { context, currency, description, instructorId, price, promo, region, status, subject, thumbnail, title, year } = data
    // const {  }

    // const course = await db.insert(courseTable).values({
    //     title: data.title,
    // })  
} 