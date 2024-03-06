export type TToken = {
    access: string;
    refresh: string;
};

export type User = {
    id?: number;
    email: string;
    last_name: string;
    first_name: string;
    patronymic?: string;
    role: string;
};

export type Student = User & {
    fio?: string;
    institute: string;
    direction: string;
    group: string;
    graduate_year: string;
    theme: string;
    theme_approved: boolean;
    prefer_teacher: number;
    teacher_email?: string;
    teacher_fullname?: string;
    teacher_approved: boolean;
    status: string;
    status_label?: string;
};

export type LoginFields = {
    email: string;
    password: string;
};

export type Teacher = User & {
    fio: string;
    institute: string;
    department: string;
};

export type TIdLabelFields = {
    id: string;
    label: string;
};

export type TEmailParamsFields = {
    studEmail: string;
    params: {
        teacher_approved?: boolean;
        theme_approved?: boolean;
    };
};

export type TUserTokenFields = TToken & User
export type TTeacherTokenFields = TToken & Teacher
export type TStudentTokenFields = TToken & Student
