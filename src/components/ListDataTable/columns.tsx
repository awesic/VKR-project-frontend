"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowUpDown,
    CheckCircle2,
    XCircle,
    MoreHorizontal,
    AlertTriangle,
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
import { useState } from "react";
import { DeleteUserAlert } from "../DeleteUserAlert";
import { Student, Teacher } from "@/data/types/UsersTypes";

type TStudents = Student;
// {
//     id: number;
//     email: string;
//     fio: string;
//     group: string;
//     graduate_year: number;
//     teacher_approved: boolean;
//     teacher_fullname: string;
//     theme: string;
//     theme_approved: boolean;
//     status_label: string;
//     // action?: any;
// };

type TTeachers = Teacher;
// {
//     id: number;
//     email: string;
//     fio: string;
//     department_label: string;
// };

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
            const value = row.original.status_label;

            return <p className="font-medium">{value}</p>;
        },
    },
    {
        id: "action",
        enableHiding: false,
        cell: ({ row }) => {
            const student = row.original;
            const { mutate: approveStudent } = useApproveStudentQuery();

            return (
                <>
                    {student.teacher_approved ? (
                        student.theme_approved ? (
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                className="hover:text-neutral-50 hover:bg-neutral-600"
                                onClick={() =>
                                    approveStudent({
                                        studEmail: student.email,
                                        params: { theme_approved: false },
                                    })
                                }>
                                Отменить утверждение темы
                            </Button>
                        ) : (
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                className="hover:text-neutral-50 hover:bg-neutral-600"
                                onClick={() =>
                                    approveStudent({
                                        studEmail: student.email,
                                        params: { theme_approved: true },
                                    })
                                }>
                                Утвердить тему
                            </Button>
                        )
                    ) : (
                        <Button
                            size={"sm"}
                            variant={"secondary"}
                            className="bg-neutral-300 border-neutral-700 text-neutral-900 hover:text-neutral-50 hover:bg-neutral-600"
                            onClick={() =>
                                approveStudent({
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
                    Утвержден
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
                    Утверждена
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
            const [open, setOpen] = useState(false);
            const { mutate: updataStudent } = useAdminsActionsQuery();
            const { mutate: deleteUser } = useDeleteUserQuery(
                "student",
                student.email
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
                            <DropdownMenuLabel>Действия</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    updataStudent({
                                        studEmail: student.email,
                                        params: { teacher_approved: true },
                                    })
                                }>
                                Утвердить преподавателя
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    updataStudent({
                                        studEmail: student.email,
                                        params: { theme_approved: true },
                                    })
                                }>
                                Утвердить тему
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                inset
                                className="text-red-700 font-medium"
                                onClick={() => setOpen(true)}>
                                <AlertTriangle className="mr-2" />
                                Удалить студента
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
                            <DropdownMenuLabel>Действия</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-700 font-medium"
                                onClick={() => setOpen(true)}>
                                <AlertTriangle className="mr-2" />
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
