export type TIndex<T> = { [key: string]: T }
export type TOptions = { labelAr: string; labelEn: string; value: number | string }[]

export type TTables = "user" | "instructor" | "region" | "governorate" | "year" | 'course' | 'subject'
export type UserRoles = "admin" | "user" | "instructor"
export type StudentContexts = "school" | "englishExam"
export type CourseContexts = 'school' | 'englishExam'
export type QuestionTypes = 'choose' | 'written' | 'trueOrFalse'
export type PlaylistStatuses = 'published' | 'unpublished' | 'scheduled'
export type ExamStatuses = 'published' | 'unpublished' | 'scheduled' | 'draft'
export type FileStatuses = 'published' | 'unpublished' | 'scheduled'
export type VideoStatuses = 'published' | 'unpublished' | 'scheduled'
export type CourseStatuses = 'published' | 'unpublished' | 'scheduled'
export type SubjectContexts = 'school' | 'englishExam'

export type TUser = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    regionId: number;
    governorateId: number;
    phone: string;
    picture: string;
    role: UserRoles;
}

export type TStudent = {
    parentPhone: string | null;
    yearId: number | null;
    subjectId: number | null;
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
    regionId: number;
    governorateId: number;
    picture: string;
    role: UserRoles;
    subjectId?: number;
    yearId?: number;
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
    price: string;
    currency: string;
    enrolledStudents: number;
    regionId: number;
    yearId: number;
    subjectId: number;
    context: CourseContexts;
    status: CourseStatuses;
    thumbnail: string;
    promo: string;
    releasedAt: Date;
    updatedAt: Date;
    scheduledPublishDate: Date | null;
    scheduledUnpublishDate: Date | null;
}

export type TVideo = {
    id: number;
    title: string;
    description: string;
    video: string;
    thumbnail: string;
    viewCount: number;
    status: VideoStatuses;
    playlistIds: number;
    courseId: number;
    releasedAt: Date;
    updatedAt: Date;
    scheduledPublishDate: Date | null;
    scheduledUnpublishDate: Date | null;
}

export type TPlaylist = {
    id: number;
    title: string;
    description: string;
    courseId: number;
    status: PlaylistStatuses;
    scheduledPublishDate: Date | null;
    scheduledUnpublishDate: Date | null;
    files: TFile[],
    videos: TVideo[],
    exams: TExam[],
}

export type TFile = {
    id: number;
    title: string;
    file: string;
    type: string;
    size: number;
    playlistIds: number;
    courseId: number
    status: FileStatuses;
    scheduledPublishDate: Date | null;
    scheduledUnpublishDate: Date | null;
}

export type TExam = {
    id: number;
    title: string;
    description: string;
    duration: number;
    playlistIds: number;
    courseId: number;
    releasedAt: Date;
    updatedAt: Date;
    scheduledPublishDate: Date | null;
    scheduledUnpublishDate: Date | null;
    status: ExamStatuses;
}

export type TQuestion = {
    id: number;
    question: string;
    type: QuestionTypes;
    image: string | null,
    answers: TAnswer[];
    examId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type TAnswer = {
    id: number;
    answer: string;
    isCorrect: boolean;
    questionId: number;
    createdAt: Date;
    updatedAt: Date;
}



export const columnsRegex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^01[0-2,5]{1}[0-9]{8}$/,
}