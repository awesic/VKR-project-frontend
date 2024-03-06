import { axiosPrivate, axiosPublic } from "@/features/useAxios";
import {
    LoginFields,
    TIdLabelFields,
    Student,
    Teacher,
    User,
    TEmailParamsFields,
    // TStudentTokenFields,
    // TTeacherTokenFields,
    // TUserTokenFields,
    // TToken,
} from "@/data/types/UsersTypes";

const REGISTER_URL = "/auth/register/";
const LOGIN_URL = "/auth/login/";
const LOGOUT_URL = "/auth/logout/";
const USER_PROFILE_URL = "/account/profile/";
const CHANGE_STUDENTS_CRED_URL = "/student/change/";
const STUDENTS_CHOOSE_LIST_URL = "/teacher/students-choose-list/";
const TEACHER_STUDENT_URL = "/teacher/student";
const STUDENTS_URL = "/students/";
const TEACHERS_URL = "/teachers/";
const INSTITUTE_URL = "/institute/";
const DIRECTIONS_URL = "/directions/";
const DEPARTMENTS_URL = "/departments/";
const STATUSES_URL = "/status/";
// const TOKEN_URL = "/token/";
const REFRESH_URL = "/token/refresh";
const VERIFY_URL = "/token/verify";

const refreshToken = async () => {
    const { data } = await axiosPublic.post(REFRESH_URL, {
        refresh: localStorage.getItem("refresh"),
    });
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    return data;
};

const verifyToken = async () => {
    const { data } = await axiosPublic.post(VERIFY_URL, {
        token: localStorage.getItem("access"),
    });
    return data;
};

const fetchStudents = async (): Promise<Student[]> => {
    return await axiosPrivate
        .get(STUDENTS_CHOOSE_LIST_URL)
        .then((res) => res.data);
};

const register = async (userData: Student | Teacher | User) => {
    const response = await axiosPrivate
        .post(REGISTER_URL, userData)
        .then((res) => res.data);

    localStorage.setItem("access", response.access);
    localStorage.setItem("refresh", response.refresh);

    return response;
};

const login = async (userData: LoginFields) => {
    const response = await axiosPrivate.post(LOGIN_URL, userData);

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    return response.data;
};

const logout = async () => {
    await axiosPrivate.post(LOGOUT_URL);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
};

const getUserInfo = async () => {
    return await axiosPrivate.get(USER_PROFILE_URL).then((res) => res.data);
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
    return await axiosPrivate.get(TEACHERS_URL).then((res) => res.data);
};

const fetchAllStudents = async (): Promise<Student[]> => {
    return await axiosPrivate.get(STUDENTS_URL).then((res) => res.data);
};

const fetchStatuses = async (): Promise<TIdLabelFields[]> => {
    return (await axiosPrivate.get(STATUSES_URL)).data;
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
    refreshToken,
    verifyToken,
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
