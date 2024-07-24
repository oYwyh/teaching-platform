export type UserRoles = "admin" | "user"

export type TUser = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    governorate: string;
    phone: string;
    parentPhone: string;
    picture: string;
    role: UserRoles;
}

export const columnsRegex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^01[0-2,5]{1}[0-9]{8}$/,
}  