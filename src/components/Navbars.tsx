import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Github, LogOut, Sparkle } from "lucide-react";
import { useGetUserInfo, useLogOutQuery } from "@/features/queries";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    ADMIN_STUD_LIST_LINK,
    ADMIN_TEACH_LIST_LINK,
    EXTENDED_ADM_LINK,
    FORGEJO_LINK,
    STUDENT_EDITOR_LINK,
    TEACHER_CHOOSE_STUD_LINK,
    TEACHER_STUD_LIST_LINK,
} from "@/data/types/constants";

const Navbars = () => {
    const { data: user } = useGetUserInfo();
    const user_role = user?.role?.toString().toLowerCase();

    const teacherLinks = (
        <>
            <NavLink to={TEACHER_CHOOSE_STUD_LINK} className={"nav-link"}>
                Выбрать студентов
            </NavLink>
            <NavLink to={TEACHER_STUD_LIST_LINK} className={"nav-link"}>
                Список студентов
            </NavLink>
        </>
    );

    const adminLinks = (
        <>
            <NavLink to={ADMIN_STUD_LIST_LINK} className={"nav-link"}>
                Студенты
            </NavLink>
            <NavLink to={ADMIN_TEACH_LIST_LINK} className={"nav-link"}>
                Преподаватели
            </NavLink>
        </>
    );

    const studentLinks = (
        <>
            <NavLink to={STUDENT_EDITOR_LINK} className={"nav-link"}>
                Редактор
            </NavLink>
        </>
    );

    const adminExtendedVersion = (
        <>
            <Link to={EXTENDED_ADM_LINK}>
                <Button
                    size={"sm"}
                    className="bg-blue-600 hover:bg-blue-900 text-white mr-2"
                    variant={"outline"}>
                    Расширенная версия
                </Button>
            </Link>
        </>
    );

    const studentForgejoLink = (
        <>
            <Link to={FORGEJO_LINK}>
                <Button
                    size={"sm"}
                    className="bg-orange-700 hover:bg-red-900 text-white mr-2"
                    variant={"outline"}>
                    <Github className="mr-2 h-4 w-4" />
                    Перейти в репозиторий
                </Button>
            </Link>
        </>
    );

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <Link
                        to={"/home"}
                        className={"navbar-brand fw-medium flex"}>
                        {<Sparkle className="mr-2 self-center" />}FQW Tracker
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={"/home"} className={"nav-link"}>
                            Главная
                        </NavLink>
                        {user_role === "teacher"
                            ? teacherLinks
                            : user_role === "admin"
                            ? adminLinks
                            : studentLinks}
                    </Nav>
                    <Nav>
                        {user_role === "admin"
                            ? adminExtendedVersion
                            : user_role === "student"
                            ? studentForgejoLink
                            : null}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size={"sm"} variant={"ghost"}>
                                    {user?.email}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    onClick={useLogOutQuery()}
                                    className="flex justify-center text-red-700 font-semibold">
                                    Выйти
                                    <LogOut className="ml-2 h-4 w-4" />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default Navbars;
