"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowUpDown,
    CheckCircle2,
    XCircle,
    MoreHorizontal,
    AlertTriangle,
    PenLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    useAdminsActionsQuery,
    useApproveStudentQuery,
    useDeleteUserQuery,
} from "@/features/queries";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback, useState } from "react";
import { ChangeStudentThemeDialog, DeleteUserAlert } from "../DeleteUserAlert";
import { Student, Teacher } from "@/data/types/UsersTypes";
import { Link } from "react-router-dom";
import {
    ADMIN_STUD_DOC_LINK,
    TEACHER_STUD_DOC_LINK,
} from "@/data/types/constants";

type TStudents = Student;
type TTeachers = Teacher;

export const StudentsListColumns: ColumnDef<TStudents>[] = [
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Почта
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "fio",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    ФИО
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "group",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Группа
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "graduate_year",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Год выпуска
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "teacher_approved",
    },
    {
        accessorKey: "theme",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-3"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Тема
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "status_label",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Этап выполнения
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <p className="font-medium">{row.original.status_label}</p>;
        },
    },
    {
        id: "action",
        enableHiding: false,
        cell: ({ row }) => {
            const student = row.original;
            localStorage.setItem(
                "current_student_info",
                JSON.stringify(student)
            );
            const [chStOpen, setChStOpen] = useState(false);
            const [newTheme, setNewTheme] = useState("");
            const { mutate: updateStudent, isPending } =
                useApproveStudentQuery();

            const handleThemeChange = (theme?: string) => {
                if (theme) setNewTheme(theme);
            };
            const handleChThemeSubmit = useCallback(() => {
                if (newTheme && newTheme !== student.theme)
                    updateStudent({
                        studEmail: student.email,
                        params: {
                            theme: newTheme,
                        },
                    });
            }, [newTheme]);

            return (
                <>
                    {student.teacher_approved ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-8 w-8 p-0">
                                        <span className="sr-only">
                                            Open menu
                                        </span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        className={
                                            student.theme_approved
                                                ? "text-red-700"
                                                : ""
                                        }
                                        onClick={() =>
                                            updateStudent({
                                                studEmail: student.email,
                                                params: {
                                                    theme_approved:
                                                        !student.theme_approved,
                                                },
                                            })
                                        }>
                                        {student.theme_approved
                                            ? "Отменить утверждение темы"
                                            : "Утвердить тему"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setChStOpen(true)}>
                                        <PenLine className="mr-2 h-4 w-4" />
                                        Изменить тему
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <Link to={TEACHER_STUD_DOC_LINK}>
                                        <DropdownMenuItem>
                                            Открыть работу
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <ChangeStudentThemeDialog
                                open={chStOpen}
                                setOpen={setChStOpen}
                                theme={student.theme}
                                isLoading={isPending}
                                handleChange={handleThemeChange}
                                handleSubmit={handleChThemeSubmit}
                            />
                        </>
                    ) : (
                        <Button
                            size={"sm"}
                            variant={"secondary"}
                            className="bg-neutral-300 border-neutral-700 text-neutral-900 hover:text-neutral-50 hover:bg-neutral-600"
                            onClick={() =>
                                updateStudent({
                                    studEmail: student.email,
                                    params: { teacher_approved: true },
                                })
                            }>
                            Подтвердить
                        </Button>
                    )}
                </>
            );
        },
    },
];

export const AdminStudentsColumns: ColumnDef<TStudents>[] = [
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-3"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Почта
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "fio",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-3"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    ФИО
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "group",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-3"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Группа
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "graduate_year",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-3"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Год выпуска
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "teacher_fullname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-3"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Преподаватель
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "teacher_approved",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-3"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Преподаватель{<br />}утвержден
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const approved = row.getValue("teacher_approved");
            return (
                <div className="flex justify-center w-full">
                    {approved ? (
                        <CheckCircle2 className="text-green-700" />
                    ) : (
                        <XCircle className="text-red-700" />
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "theme",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-3"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Тема
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "theme_approved",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-3"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Тема{<br />} утверждена
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const approved = row.getValue("theme_approved");
            return (
                <div className="flex justify-center w-full">
                    {approved ? (
                        <CheckCircle2 className="text-green-700" />
                    ) : (
                        <XCircle className="text-red-700" />
                    )}
                </div>
            );
        },
    },
    {
        id: "action",
        enableHiding: false,
        cell: ({ row }) => {
            const student = row.original;
            localStorage.setItem(
                "current_student_info",
                JSON.stringify(student)
            );
            const [open, setOpen] = useState(false);
            const [chStOpen, setChStOpen] = useState(false);
            const [newTheme, setNewTheme] = useState("");
            const { mutate: updataStudent, isPending } =
                useAdminsActionsQuery();
            const { mutate: deleteUser } = useDeleteUserQuery(
                "student",
                student.email
            );
            const handleThemeChange = (theme?: string) => {
                if (theme) setNewTheme(theme);
            };
            const handleChThemeSubmit = useCallback(() => {
                if (newTheme && newTheme !== student.theme)
                    updataStudent({
                        studEmail: student.email,
                        params: {
                            theme: newTheme,
                        },
                    });
            }, [newTheme]);

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className={
                                    student.teacher_approved
                                        ? "text-red-700"
                                        : ""
                                }
                                onClick={() =>
                                    updataStudent({
                                        studEmail: student.email,
                                        params: {
                                            teacher_approved:
                                                !student.teacher_approved,
                                        },
                                    })
                                }>
                                {student.teacher_approved
                                    ? "Отменить утверждение преподавателя"
                                    : "Утвердить преподавателя"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className={
                                    student.theme_approved ? "text-red-700" : ""
                                }
                                onClick={() =>
                                    updataStudent({
                                        studEmail: student.email,
                                        params: {
                                            theme_approved:
                                                !student.theme_approved,
                                        },
                                    })
                                }>
                                {student.theme_approved
                                    ? "Отменить утверждение темы"
                                    : "Утвердить тему"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setChStOpen(true)}>
                                <PenLine className="mr-2 h-4 w-4" />
                                Изменить тему
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <Link to={ADMIN_STUD_DOC_LINK}>
                                <DropdownMenuItem>
                                    Открыть работу
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                inset
                                className="text-red-700 font-medium"
                                onClick={() => setOpen(true)}>
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Удалить студента
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DeleteUserAlert
                        open={open}
                        setOpen={setOpen}
                        deleteUser={deleteUser}
                    />
                    <ChangeStudentThemeDialog
                        open={chStOpen}
                        setOpen={setChStOpen}
                        theme={student.theme}
                        isLoading={isPending}
                        handleChange={handleThemeChange}
                        handleSubmit={handleChThemeSubmit}
                    />
                </>
            );
        },
    },
];

export const TeachersListColumns: ColumnDef<TTeachers>[] = [
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-3"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Почта
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "fio",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-3"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    ФИО
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "department_label",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-3"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }>
                    Кафедра
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        id: "action",
        enableHiding: false,
        cell: ({ row }) => {
            const teacher = row.original;
            const [open, setOpen] = useState(false);
            const { mutate: deleteUser } = useDeleteUserQuery(
                "teacher",
                teacher.email
            );

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="text-red-700 font-medium"
                                onClick={() => setOpen(true)}>
                                <AlertTriangle className="mr-2 h-4" />
                                Удалить преподавателя
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DeleteUserAlert
                        open={open}
                        setOpen={setOpen}
                        deleteUser={deleteUser}
                    />
                </>
            );
        },
    },
];
