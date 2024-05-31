import { Fragment } from "react";
import Navbars from "@/components/Navbars";
import Layout from "@/hocs/Layout";
import {
    FQWStatus,
    FQWTheme,
    PreferTeacher,
    TextEditorCard,
} from "@/pages/student/StudentPage";
import { StudentsCard, StudentsListCard } from "@/pages/teacher/TeacherPage";
import { useGetUserInfo } from "@/features/queries";
import {
    AdminStudentsListCard,
    AdminTeachersListCard,
} from "@/pages/admin/AdminPage";

function Homepage() {
    const { data: user } = useGetUserInfo();

    const studentLinks = (
        <>
            <FQWTheme user={user} />
            <PreferTeacher user={user} />
            <FQWStatus user={user} />
            <TextEditorCard user={user} />
        </>
    );

    const teacherLinks = (
        <>
            <StudentsCard />
            <StudentsListCard />
        </>
    );

    const adminLinks = (
        <>
            <AdminTeachersListCard />
            <AdminStudentsListCard />
        </>
    );

    return (
        <Layout title={"Главная"} content={"Главная страница"}>
            <Fragment>
                <Navbars />
                <div className={"container mt-4 mb-auto"}>
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                        {user?.role?.toString().toLowerCase() === "student"
                            ? studentLinks
                            : user?.role?.toString().toLowerCase() === "teacher"
                            ? teacherLinks
                            : adminLinks}
                    </div>
                </div>
                {/* <Toaster
                    richColors
                    closeButton
                    toastOptions={{ duration: 1000 * 10 }}
                /> */}
            </Fragment>
        </Layout>
    );
}

export default Homepage;
