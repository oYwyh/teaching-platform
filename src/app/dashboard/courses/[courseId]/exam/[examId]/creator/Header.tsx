import Save from "@/app/dashboard/courses/[courseId]/exam/[examId]/creator/Save";
import Settings from "@/app/dashboard/courses/[courseId]/exam/[examId]/creator/Settings";
import { Button } from "@/components/ui/button";
import { TExam, TPlaylist } from "@/types/index.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

export default function Header({ exam, playlists }: { exam: TExam, playlists: TPlaylist[] }) {

    return (
        <>
            <div className="col-span-8 bg-white shadow-lg p-2 px-5">
                <div className="flex justify-between">
                    <div className="text-3xl font-bold">{exam.title}</div>
                    <div className="flex flex-row gap-2">
                        <Settings exam={exam} playlists={playlists} />
                        <Save exam={exam} />
                    </div>
                </div>
            </div>
        </>
    )
}