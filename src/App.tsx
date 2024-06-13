import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LazyLayout from "@/hocs/LazyLayout";
import AdminStudentsListPage from "@/pages/admin/AdminStudentsListPage";
import AdminTeachersListPage from "@/pages/admin/AdminTeachersListPage";

const Homepage = lazy(() => import("@/pages/Homepage"));
const IntroPage = lazy(() => import("@/pages/IntroPage"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const PrivateRoute = lazy(() => import("@/hocs/PrivateRoute"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const ChooseStudentsPage = lazy(
    () => import("@/pages/teacher/ChooseStudentsPage")
);
const StudentsListPage = lazy(() => import("@/pages/teacher/StudentsListPage"));
const TextEditorPage = lazy(() => import("@/pages/TextEditorPage"));

const Roles = {
    admin: "admin",
    student: "student",
    teacher: "teacher",
};

export const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path={"/"} element={<LazyLayout />}>
                        <Route index element={<IntroPage />} />
                        <Route path="login" element={<Login />} />
                        <Route path={"sign-up"} element={<Signup />} />

                        <Route
                            element={
                                <PrivateRoute
                                    allowedRoles={[
                                        Roles.admin,
                                        Roles.student,
                                        Roles.teacher,
                                    ]}
                                />
                            }>
                            <Route path={"home"} element={<Homepage />} />
                        </Route>
                        <Route
                            path="student"
                            element={
                                <PrivateRoute allowedRoles={[Roles.student]} />
                            }>
                            <Route
                                path="edit-docs"
                                element={<TextEditorPage />}
                            />
                        </Route>
                        <Route
                            path={"teacher"}
                            element={
                                <PrivateRoute allowedRoles={[Roles.teacher]} />
                            }>
                            <Route
                                path={"choose-student"}
                                element={<ChooseStudentsPage />}
                            />
                            <Route
                                path={"students-list"}
                                element={<StudentsListPage />}
                            />
                            <Route
                                path="student-doc"
                                element={<TextEditorPage />}
                            />
                        </Route>
                        <Route
                            path={"admins"}
                            element={
                                <PrivateRoute allowedRoles={[Roles.admin]} />
                            }>
                            <Route
                                path={"students-list"}
                                element={<AdminStudentsListPage />}
                            />
                            <Route
                                path={"teachers-list"}
                                element={<AdminTeachersListPage />}
                            />
                            <Route
                                path="student-doc"
                                element={<TextEditorPage />}
                            />
                        </Route>

                        <Route path={"*"} element={<PageNotFound />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
};
