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
                        {/*<Route path={"loading"} element={<Loading/>}/>*/}
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
                        </Route>
                        <Route
                            path={"admin"}
                            element={
                                <PrivateRoute allowedRoles={[Roles.admin]} />
                            }>
                            <Route
                                path={"students"}
                                element={<AdminStudentsListPage />}
                            />
                            <Route
                                path={"teachers"}
                                element={<AdminTeachersListPage />}
                            />
                        </Route>

                        <Route path={"*"} element={<PageNotFound />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
};
