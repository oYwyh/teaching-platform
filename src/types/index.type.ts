export type TTables = "user" | "region" | "governorate" | "year" | "exam"
export type UserRoles = "admin" | "user"
export type UserTypes = "school" | "exam"

export type TUser = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    region: string;
    year: string;
    governorate: string;
    phone: string;
    parentPhone: string;
    exam: string;
    picture: string;
    type: UserTypes;
    role: UserRoles;
}

export type TRegion = {
    id: number;
    region: string;
}

export type TGovernorate = {
    id: number;
    governorate: string;
    regionId: number;
}

export type TYear = {
    id: number;
    year: string;
    regionId: number;
}

export type TExam = {
    id: number;
    exam: string
}

export const columnsRegex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^01[0-2,5]{1}[0-9]{8}$/,
}