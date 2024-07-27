import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <>
            <Link href="/dashboard/students">
                <Button>
                    Students
                </Button>
            </Link>
            <Link href="/dashboard/instructors">
                <Button>
                    Instructors
                </Button>
            </Link>
            <Link href="/dashboard/regions">
                <Button>
                    Regions
                </Button>
            </Link>
            <Link href="/dashboard/exams">
                <Button>
                    Exams
                </Button>
            </Link>
            <Link href="/dashboard/courses">
                <Button>
                    Courses
                </Button>
            </Link>
        </>
    )
} 