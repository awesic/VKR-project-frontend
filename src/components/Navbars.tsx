import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, LogOut, Sparkle } from "lucide-react";
import { useGetUserInfo, useLogOutQuery } from "@/features/queries";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
// import CSRFToken from "@/components/CSRFToken";

const Navbars = () => {
    const { data: user } = useGetUserInfo();

    const teacherLinks = (
        <>
            <NavLink to={"/home"} className={"nav-link"}>
                Главная
            </NavLink>
            <NavLink to={"/teacher/choose-student"} className={"nav-link"}>
                Выбрать студентов
            </NavLink>
            <NavLink to={"/teacher/students-list"} className={"nav-link"}>
                Список студентов
            </NavLink>
        </>
    );

    const adminLinks = (
        <>
            <NavLink to={"/home"} className={"nav-link"}>
                Главная
            </NavLink>
            <NavLink to={"/admin/students"} className={"nav-link"}>
                Студенты
            </NavLink>
            <NavLink to={"/admin/teachers"} className={"nav-link"}>
                Преподаватели
            </NavLink>
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
                        {user?.role?.toString().toLowerCase() === "teacher"
                            ? teacherLinks
                            : user?.role?.toString().toLowerCase() === "admin"
                            ? adminLinks
                            : null}
                    </Nav>
                    <Nav>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size={"sm"} variant={"ghost"}>
                                    {user?.email}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {/* <CSRFToken /> */}
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
