import { axiosPrivate, axiosPublic } from "@/features/useAxios";
import {
    LoginFields,
    TIdLabelFields,
    Student,
    Teacher,
    User,
    TEmailParamsFields,
    TForgejoPathFields,
} from "@/data/types/UsersTypes";

const REGISTER_URL = "/auth/register/";
const LOGIN_URL = "/auth/login/";
const LOGOUT_URL = "/auth/logout/";
const USER_PROFILE_URL = "/profile/";
const CHANGE_STUDENTS_CRED_URL = "/student/change/";
const STUDENTS_CHOOSE_LIST_URL = "/teacher/students-choose-list/";
const TEACHER_STUDENT_URL = "/teacher/student";
const STUDENTS_URL = "/students/";
const TEACHERS_URL = "/teachers/";
const INSTITUTE_URL = "/institute/";
const DIRECTIONS_URL = "/directions/";
const DEPARTMENTS_URL = "/departments/";
const STATUSES_URL = "/status/";
const REFRESH_URL = "/auth/token/refresh";
const VERIFY_URL = "/auth/token/verify";

const FORGEJO_REPO_URL = "/forgejo/repos/";

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
    console.log(response);
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    return response.data;
};

const logout = async () => {
    await axiosPrivate.post(LOGOUT_URL);
    localStorage.clear();
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

const teacherUpdateStudentsActions = async ({
    studEmail,
    params,
}: TEmailParamsFields) => {
    return await axiosPrivate.put(
        `${TEACHER_STUDENT_URL}/${studEmail}/change/`,
        params
    );
};

const adminUpdateStudentsActions = async ({
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

//---------------------------- FORGEJO -------------------------------------

const uploadFileToForgejo = async ({
    email,
    repo,
    data,
}: TForgejoPathFields): Promise<any> => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };

    return await axiosPrivate
        .post(`${FORGEJO_REPO_URL}${email}/${repo}/upload-file/`, data, config)
        .then((res) => res.data);
};

const getForgejoFileContent = async ({
    email,
    repo,
    filepath,
}: TForgejoPathFields) => {
    return await axiosPrivate
        .get(`${FORGEJO_REPO_URL}${email}/${repo}/contents/${filepath}/`)
        .then((res) => res.data);
};

const crudForgejoFileContent = async ({
    email,
    repo,
    filepath,
    data,
    method,
}: TForgejoPathFields) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    switch (method) {
        case "GET":
            return await axiosPrivate
                .get(
                    `${FORGEJO_REPO_URL}${email}/${repo}/contents/${filepath}/`
                )
                .then((res) => res.data);

        case "POST":
            return await axiosPrivate
                .post(
                    `${FORGEJO_REPO_URL}${email}/${repo}/contents/${filepath}/`,
                    data
                )
                .then((res) => res.data);

        case "PATCH":
            return await axiosPrivate
                .patch(
                    `${FORGEJO_REPO_URL}${email}/${repo}/contents/${filepath}/`,
                    data,
                    config
                )
                .then((res) => res.data);

        case "PUT":
            return await axiosPrivate
                .put(
                    `${FORGEJO_REPO_URL}${email}/${repo}/contents/${filepath}/`,
                    data,
                    config
                )
                .then((res) => res.data);
    }
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
    teacherUpdateStudentsActions,
    fetchInstitutes,
    fetchDirections,
    fetchDepartments,
    deleteUser,
    adminUpdateStudentsActions,
    uploadFileToForgejo,
    getForgejoFileContent,
    crudForgejoFileContent,
};
