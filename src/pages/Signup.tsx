import { Link } from "react-router-dom";
import Layout from "@/hocs/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSignupForm from "@/components/AdminSignUpForm";
import StudentSignupForm from "@/components/StudentSignUpForm";
import TeacherSignupForm from "@/components/TeacherSignUpForm";

const Signup = () => {
    return (
        <Layout title={"Регистрация"} content={"Странтца регистрации"}>
            <div
                className={
                    "container justify-content-center align-items-center flex flex-column h-[90%] my-20"
                }>
                <div
                    className={
                        "justify-content-center align-items-center fs-1 fw-bold mb-4"
                    }>
                    <div>Регистрация</div>
                </div>
                <Tabs defaultValue="student" className="min-w-min">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="student">Студент</TabsTrigger>
                        <TabsTrigger value="teacher">Преподаватель</TabsTrigger>
                        <TabsTrigger value="admin">Админ</TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="student"
                        className="justify-center flex">
                        <StudentSignupForm />
                    </TabsContent>
                    <TabsContent
                        value="teacher"
                        className="justify-center flex">
                        <TeacherSignupForm />
                    </TabsContent>
                    <TabsContent value="admin" className="justify-center flex">
                        <AdminSignupForm />
                    </TabsContent>
                </Tabs>

                <div className={"mt-3 mb-3"}>
                    <p className={"mb-0 text-center"}>
                        Уже есть аккаунт?{" "}
                        <Link to={"/login"} className={"text-primary fw-bold"}>
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};
export default Signup;
