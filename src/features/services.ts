import { axiosPrivate, axiosPublic } from "@/features/useAxios";
import {
    LoginFields,
    TIdLabelFields,
    Student,
    Teacher,
    User,
    TEmailParamsFields,
} from "@/data/types/UsersTypes";

const REGISTER_URL = "/auth/register";
const LOGIN_URL = "/auth/login";
const LOGOUT_URL = "/auth/logout";
const USER_PROFILE_URL = "/account/profile";
const CHANGE_STUDENTS_CRED_URL = "/student/change/";
const STUDENTS_CHOOSE_LIST_URL = "/teacher/students-choose-list/";
const TEACHER_STUDENT_URL = "/teacher/student";
const STUDENTS_URL = "/students/";
const TEACHERS_URL = "/teachers/";
const INSTITUTE_URL = "/institute/";
const DIRECTIONS_URL = "/directions/";
const DEPARTMENTS_URL = "/departments/";
const STATUSES_URL = "/status";

const fetchStudents = async (): Promise<Student[]> => {
    return await axiosPrivate
        .get(STUDENTS_CHOOSE_LIST_URL)
        .then((res) => res.data);
};

const register = async (userData: Student | Teacher | User) => {
    return await axiosPrivate
        .post(REGISTER_URL, userData)
        .then((res) => res.data);
};

const login = async (userData: LoginFields) => {
    const response = await axiosPrivate.post(LOGIN_URL, userData);

    return response.data;
};

const logout = async () => {
    await axiosPrivate.post(LOGOUT_URL);
};

const getUserInfo = async () => {
    return await axiosPublic.get(USER_PROFILE_URL).then((res) => res.data);
};

const changeStudentThemeTeacherStatus = async (params: {
    theme?: string;
    prefer_teacher?: number;
    status?: string;
}) => {
    return await axiosPrivate
        .put(CHANGE_STUDENTS_CRED_URL, params)
        .then((res) => res.data);
};

const fetchAllTeachers = async (): Promise<Teacher[]> => {
    return await axiosPublic.get(TEACHERS_URL).then((res) => res.data);
};

const fetchAllStudents = async (): Promise<Student[]> => {
    return await axiosPublic.get(STUDENTS_URL).then((res) => res.data);
};

const fetchStatuses = async (): Promise<TIdLabelFields[]> => {
    return (await axiosPublic.get(STATUSES_URL)).data;
};

const approveStudent = async ({ studEmail, params }: TEmailParamsFields) => {
    return await axiosPrivate.put(
        `${TEACHER_STUDENT_URL}/${studEmail}/change/`,
        params
    );
};

const adminApproveActions = async ({
    studEmail,
    params,
}: TEmailParamsFields): Promise<Student> => {
    return await axiosPrivate
        .put(`/student/${studEmail}/change/`, params)
        .then((res) => res.data);
};

const deleteUser = async (who: "student" | "teacher", email: string) => {
    return await axiosPrivate
        .delete(`/${who}/${email}/change/`)
        .then((res) => res.data);
};

const fetchInstitutes = async (): Promise<TIdLabelFields[]> => {
    return await axiosPublic.get(INSTITUTE_URL).then((res) => res.data);
};

const fetchDirections = async (): Promise<TIdLabelFields[]> => {
    return await axiosPublic.get(DIRECTIONS_URL).then((res) => res.data);
};

const fetchDepartments = async (): Promise<TIdLabelFields[]> => {
    return await axiosPublic.get(DEPARTMENTS_URL).then((res) => res.data);
};

export const api = {
    fetchStudents,
    register,
    login,
    logout,
    getUserInfo,
    changeStudentThemeTeacherStatus,
    fetchAllTeachers,
    fetchAllStudents,
    fetchStatuses,
    approveStudent,
    fetchInstitutes,
    fetchDirections,
    fetchDepartments,
    deleteUser,
    adminApproveActions,
};
