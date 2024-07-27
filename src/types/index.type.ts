export type TTables = "user" | "instructor" | "region" | "governorate" | "year" | "exam" | 'course'
export type UserRoles = "admin" | "user" | "instructor"
export type UserTypes = "school" | "exam"
export type CourseContexts = 'school' | 'exam'
export type CourseStatus = 'published' | 'unpublished' | 'scheduled'

export type TUser = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    region: string;
    governorate: string;
    phone: string;
    picture: string;
    role: UserRoles;
}

export type TStudent = {
    parentPhone: string;
    year: string;
    exam: string;
    type: UserTypes;
}

export type TInstructor = {
    bio: string;
    specialty: string;
}

export type TFullUserData = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    region: string;
    governorate: string;
    picture: string;
    role: UserRoles;
    exam?: string;
    year?: string;
    parentPhone?: string;
    type?: UserTypes;
    bio?: string;
    qualifications?: string;
    experience?: number;
    specialty?: string;
    contactInfo?: string;
    officeLocation?: string;
};

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

export type TCourse = {
    id: number;
    title: string;
    description: string;
    instructorId: number;
    price: number;
    currency: string;
    category: string;
    enrolledStudents: number;
    regionId: number | null;
    yearId: number | null;
    examId: number | null;
    context: CourseContexts;
    status: CourseStatus;
    releasedAt: string;
    updatedAt: string;
    scheduledPublishDate: string;
    scheduledUnpublishDate: string;
}

export const columnsRegex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^01[0-2,5]{1}[0-9]{8}$/,
}