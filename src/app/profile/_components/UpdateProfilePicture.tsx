'use client'

import { useState } from "react";
import FileUploader from "@/app/_components/FileUploader";
import { User } from "lucia";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UpdateProfilePicture({ user }: { user: User }) {
    if (!user) throw new Error('User not found')
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Avatar onClick={() => setOpen(open == true ? false : true)} className="w-[100px] h-[100px] cursor-pointer">
                <AvatarImage alt="Avatar" src={`${user.picture != 'default.jpg' ? `${process.env.NEXT_PUBLIC_R2_FILES_URL}/${user.picture}` : '/default.jpg'}`} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {user.role != 'user' && (
                <FileUploader open={open} setOpen={setOpen} pfp={true} picToDelete={user.picture != 'default.jpg' ? user.picture : undefined} />
            )}
        </div>
    )
}