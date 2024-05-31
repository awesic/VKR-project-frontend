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
        { id: "department_label", label: "Кафедра" },
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

export function convertImagesToBase64(contentDocument: Document) {
    const MAX_WIDTH = 640;
    var regularImages = contentDocument.querySelectorAll(
        "img"
    ) as NodeListOf<HTMLImageElement>;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    [].forEach.call(regularImages, (img: HTMLImageElement) => {
        // preparing canvas for drawing
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        if (img.width > MAX_WIDTH) {
            canvas.width = MAX_WIDTH;
            canvas.height = Math.floor(canvas.width * (img.height / img.width));
        } else {
            canvas.width = img.width;
            canvas.height = img.height;
        }

        // let scale = Math.min(
        //     canvas.width / img.naturalWidth,
        //     canvas.height / img.naturalHeight
        // );
        // let width = img.naturalWidth * scale;
        // let height = img.naturalHeight * scale;

        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // var dataURL = canvas.toDataURL("image/jpeg", 1.0);
        // img.setAttribute("src", dataURL);
        img.src = canvas.toDataURL("image/jpeg", 1.0);
    });
    canvas.remove();
}
