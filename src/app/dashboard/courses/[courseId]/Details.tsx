import Promo from "@/app/dashboard/courses/[courseId]/Promo";
import { TCourse } from "@/types/index.type";

export default function Details({ course }: { course: any }) {
    return (
        <>
            <div className="col-span-1 shadow-2xl bg-white p-2 rounded-lg capitalize flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <Promo thumbnail={course.thumbnail} promo={course.promo} />
                    <div>
                        <h1 className="text-2xl font-bold">{course.title}</h1>
                        <p className="text-gray-700">{course.description}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <span className="font-semibold">Price: </span>
                        <span>{course.price} {course.currency}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Instructor: </span>
                        <span>{course.instructor}</span> {/* Replace with instructor name if available */}
                    </div>
                    <div>
                        <span className="font-semibold">Region: </span>
                        <span>{course.region}</span> {/* Replace with instructor name if available */}
                    </div>
                    <div>
                        <span className="font-semibold">Year: </span>
                        <span>{String(course.year).replace('_', ' ')}</span> {/* Replace with instructor name if available */}
                    </div>
                    <div>
                        <span className="font-semibold">Subject: </span>
                        <span>{course.subject}</span> {/* Replace with instructor name if available */}
                    </div>
                    <div>
                        <span className="font-semibold">Students Enrolled: </span>
                        <span>{course.enrolledStudents}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Status: </span>
                        <span>{course.status}</span>
                    </div>
                </div>
            </div>

        </>
    )
}