import { LoginFields, Student, Teacher, User } from "./UsersTypes";

export type UserStore = {
    user: Student | Teacher | User | undefined;
    loading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
    setUser: (user: Student | Teacher | User) => void;
    setLoading: (loading: boolean) => void;
    setIsError: (isError: boolean) => void;
    setIsSuccess: (isSuccess: boolean) => void;
    setMessage: (message: string) => void;
    login: (userData: LoginFields) => void;
    getUserInfo: () => void;
    logout: () => void;
    register: (userData: Student | Teacher | User) => void;
    changeStudentTheme: (new_theme: { theme: string }) => void;
    changeStudentTeacher: (prefer_teacher: { prefer_teacher: number }) => void;
    changeStudentStatus: (status: { status: string }) => void;
    reset: () => void;
};

export type TeacherStore = {
    students: Student[];
    isError: boolean;
    isSuccess: boolean;
    message: string;
    setIsError: (isError: boolean) => void;
    setIsSuccess: (isSuccess: boolean) => void;
    setMessage: (message: string) => void;
    fetchAllTeachersStudents: () => void;
    // fetchAllNotApprovedStudents: () => void;
    approveStudent: (email: string) => void;
    approveTheme: (email: string) => void;
    reset: () => void;
};
