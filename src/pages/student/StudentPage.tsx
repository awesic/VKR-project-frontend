import { FC, useCallback, useState } from "react";
import { Badge } from "react-bootstrap";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    CardDescription,
} from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Student } from "@/data/types/UsersTypes";
import { TeachersSelect } from "@/components/students/PreferTeacherSelect";
import { StatusCombobox } from "@/components/students/StatusCombobox";
import CSRFToken from "@/components/CSRFToken";
import { useChangeStudentsThemeTeacherStatus } from "@/features/queries";
import { Loader2 } from "lucide-react";

interface Props {
    user: Student;
}

export const FQWTheme: FC<Props> = ({ user }) => {
    const [newTheme, setNewTheme] = useState("");
    const { mutate: changeStudentTheme, isPending: isLoading } =
        useChangeStudentsThemeTeacherStatus();

    const handleSubmit = useCallback(() => {
        if (newTheme && newTheme !== user.theme)
            changeStudentTheme({ theme: newTheme });
    }, [newTheme]);

    return (
        <>
            <Card className="h-min">
                <CardHeader>
                    <CardTitle>Тема ВКР</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={"flex justify-content-between"}>
                        {user.theme ? user.theme : "Введите тему ↙️"}
                        {user.theme_approved ? (
                            <div className="min-h-min">
                                <Badge
                                    pill
                                    className={
                                        "bg-success-subtle border border-success-subtle text-success-emphasis"
                                    }>
                                    Утверждена
                                </Badge>
                            </div>
                        ) : (
                            <div className="min-h-min">
                                <Badge
                                    pill
                                    className={
                                        "bg-warning-subtle border border-warning-subtle text-warning-emphasis"
                                    }>
                                    Не утверждена
                                </Badge>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="hover:bg-neutral-950 hover:text-primary-foreground"
                                variant="outline">
                                Изменить
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Изменить тему</DialogTitle>
                            </DialogHeader>
                            <div className="py-4 items-center">
                                <CSRFToken />
                                <Textarea
                                    autoFocus
                                    name="theme"
                                    placeholder={
                                        user.theme
                                            ? user.theme
                                            : "Введите тему..."
                                    }
                                    defaultValue={user.theme}
                                    className="col-span-3"
                                    onChange={(e) =>
                                        setNewTheme(e.target.value)
                                    }
                                />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        disabled={isLoading}
                                        onClick={handleSubmit}>
                                        {isLoading ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : null}
                                        Сохранить
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </>
    );
};

export const PreferTeacher: FC<Props> = ({ user }) => {
    const [teacher, setTeacher] = useState(
        user.prefer_teacher ? user.prefer_teacher : undefined
    );

    const { mutate: changeStudentTheme, isPending: isLoading } =
        useChangeStudentsThemeTeacherStatus();

    const handleSubmit = useCallback(() => {
        if (teacher && teacher !== user.prefer_teacher)
            changeStudentTheme({ prefer_teacher: teacher });
    }, [teacher]);

    return (
        <>
            <Card className="h-min">
                <CardHeader>
                    <CardTitle>Научный руководитель</CardTitle>
                    <CardDescription>
                        *Нельзя изменить преподавателя после его утверждения.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className={"flex justify-content-between"}>
                        {user.teacher_fullname
                            ? user.teacher_fullname
                            : "Выберите преподавателя ↙️"}
                        {user.teacher_approved ? (
                            <div className="min-h-min">
                                <Badge
                                    pill
                                    className={
                                        "bg-success-subtle border border-success-subtle text-success-emphasis"
                                    }>
                                    Утвержден
                                </Badge>
                            </div>
                        ) : (
                            <div className="min-h-min">
                                <Badge
                                    pill
                                    className={
                                        "bg-warning-subtle border border-warning-subtle text-warning-emphasis"
                                    }>
                                    Не утвержден
                                </Badge>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <CardFooter>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    disabled={user.teacher_approved}
                                    className="hover:bg-neutral-950 hover:text-primary-foreground"
                                    variant="outline">
                                    Изменить
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        Выбрать научного руководителя
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="py-3 items-center flex justify-center">
                                    {/* <CSRFToken /> */}
                                    <TeachersSelect
                                        preferTeacher={teacher}
                                        setPreferTeacher={setTeacher}
                                    />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            disabled={isLoading}
                                            onClick={handleSubmit}>
                                            {isLoading ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : null}
                                            Сохранить
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </CardFooter>
            </Card>
        </>
    );
};

export const FQWStatus: FC<Props> = ({ user }) => {
    const status = {
        id: user.status,
        label: user.status_label!,
    };

    const { mutate: changeStudentStatus } =
        useChangeStudentsThemeTeacherStatus();

    const handleSubmit = (status: string) => {
        if (status && status !== user.status)
            changeStudentStatus({ status: status });
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Статус выполнения ВКР</CardTitle>
                    {user.teacher_approved ? (
                        <CardDescription>
                            *Этапы упорядочены по мере завершённости.
                        </CardDescription>
                    ) : (
                        <CardDescription>
                            *Изменение статуса доступно только после утверждения
                            преподавателя.
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <div className={"flex justify-center"}>
                        <StatusCombobox
                            status={status}
                            onStatusSelect={handleSubmit}
                            disabled={!user.teacher_approved}
                        />
                    </div>
                </CardContent>
            </Card>
        </>
    );
};
