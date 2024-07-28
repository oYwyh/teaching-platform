export type TIndex<T> = { [key: string]: T }
export type TOptions = { labelAr: string; labelEn: string; value: number | string }[]

export type TTables = "user" | "instructor" | "region" | "governorate" | "year" | 'course' | 'subject'
export type UserRoles = "admin" | "user" | "instructor"
export type StudentContexts = "school" | "englishExam"
export type CourseContexts = 'school' | 'englishExam'
export type CourseStatus = 'published' | 'unpublished' | 'scheduled'
export type SubjectContexts = 'school' | 'englishExam'
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
    parentPhone: string | null;
    year: string | null;
    englishExam: string | null;
    context: StudentContexts;
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
    englishExam?: string;
    year?: string;
    parentPhone?: string;
    context?: StudentContexts;
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

export type TSubject = {
    id: number;
    subject: string
    context: SubjectContexts
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