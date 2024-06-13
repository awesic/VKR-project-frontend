import { Fragment } from "react";
import Navbars from "@/components/Navbars";
import Layout from "@/hocs/Layout";
import { useGetUserInfo } from "@/features/queries";
import EditorModal from "@/components/EditorModal";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ADMIN_STUD_LIST_LINK, TEACHER_STUD_LIST_LINK } from "@/data/types/constants";

function TextEditorPage() {
    const { data: user } = useGetUserInfo();
    const navigate = useNavigate();
    const localStorageStudent = localStorage.getItem("current_student_info");
    const student = localStorageStudent
        ? JSON.parse(localStorageStudent)
        : user;
    return (
        <Layout
            title={"Редактировать документ"}
            content={"Редактировать документ"}>
            <Fragment>
                <Navbars />
                <div
                    className={
                        "container mt-4 h-full flex-grow min-h-[40rem] mb-20"
                    }>
                    <div className="w-full flex justify-between">
                        {user.role.toLowerCase() === "student" ? (
                            <></>
                        ) : (
                            <>
                                <Button
                                    variant={"outline"}
                                    className="mb-2"
                                    onClick={() =>
                                        {
                                            if(user.role.toLowerCase() === "admin") {
                                                navigate(ADMIN_STUD_LIST_LINK);
                                            } else if (user.role.toLowerCase() === "teacher") {
                                                navigate(TEACHER_STUD_LIST_LINK);
                                            } else {
                                                navigate("/home");
                                            }
                                        }
                                    }>
                                    Назад
                                </Button>
                                <div className="mr-4">
                                    <Label className="mr-2">
                                        ФИО студента:
                                    </Label>
                                    <Label className="text-xl">
                                        {student.fio}
                                    </Label>
                                </div>
                            </>
                        )}
                    </div>
                    <EditorModal user={user} student={student} />
                </div>
                {/* <Toaster
                    richColors
                    closeButton
                    toastOptions={{ duration: 1000 * 5 }}
                /> */}
            </Fragment>
        </Layout>
    );
}

export default TextEditorPage;
