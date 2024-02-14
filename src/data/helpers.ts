import {
    BookHeart,
    Flame,
    Ghost,
    LucideIcon,
    PartyPopper,
    ScanEye,
    Sparkles,
} from "lucide-react";

export const getErrorMessage = (error: unknown): string => {
    let message: string;

    if (error instanceof Error) {
        message = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
        message = String(error.message);
    } else if (typeof error === "string") message = error;
    else {
        message = "Something went wrong.";
    }
    return message;
};

export const mapStudentColumnsHeaders = (columnId: string) => {
    const headers = [
        { id: "email", label: "Почта" },
        { id: "fio", label: "ФИО" },
        { id: "group", label: "Группа" },
        { id: "graduate_year", label: "Год выпуска" },
        { id: "teacher_approved", label: "Преподаватель утвержден" },
        { id: "teacher_fullname", label: "ФИО преподавателя" },
        { id: "theme", label: "Тема" },
        { id: "theme_approved", label: "Тема утверждена" },
        { id: "status_label", label: "Этап" },
    ];
    return headers.find((head) => head.id === columnId)?.label || columnId;
};

export const getStatusIcon = (status: string): LucideIcon => {
    const statusIcons = [
        {
            id: "topic_choice",
            icon: BookHeart,
        },
        {
            id: "theoretical_aspects",
            icon: ScanEye,
        },
        {
            id: "data_collection_and_analysis",
            icon: Ghost,
        },
        {
            id: "main_wokr",
            icon: Flame,
        },
        {
            id: "decorator_fqw",
            icon: Sparkles,
        },
        {
            id: "finished",
            icon: PartyPopper,
        },
    ];
    return statusIcons.find((icon) => icon.id === status)?.icon || BookHeart;
};
