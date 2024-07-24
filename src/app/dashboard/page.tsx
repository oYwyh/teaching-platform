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
        </>
    )
} 