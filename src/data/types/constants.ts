export const QUERY_KEY = {
    user: "user",
    teachers: "teachers",
    statusList: "statusList",
    students: "students",
    teachAppr: "teacherApproved",
    themeAppr: "themeApproved",
    all: "all",
    institutes: "institutes",
    directions: "directions",
    departments: "departments",
    forgejo: "forgejo",
};

export const BACKEND_DOMAIN = import.meta.env.VITE_API;
export const FORGEJO_LINK =
    "https://forgejo-production.up.railway.app/user/login";
export const EXTENDED_ADM_LINK = import.meta.env.VITE_EXTEND_ADM_LINK;

export const STUDENT_EDITOR_LINK = "/student/edit-docs";
export const TEACHER_CHOOSE_STUD_LINK = "/teacher/choose-student";
export const TEACHER_STUD_LIST_LINK = "/teacher/students-list";
export const TEACHER_STUD_DOC_LINK = "/teacher/student-doc";
export const ADMIN_STUD_LIST_LINK = "/admin/students-list";
export const ADMIN_TEACH_LIST_LINK = "/admin/teachers-list";
export const ADMIN_STUD_DOC_LINK = "/admin/student-doc";

// import Header from "@editorjs/header";
// import Header from "editorjs-header-with-alignment";
// import Title from "title-editorjs";
// import Paragraph from "@editorjs/paragraph";
// import NestedList from "@editorjs/nested-list";
// import Paragraph from "editorjs-paragraph-with-alignment";
// import SimpleImage from "simple-image-editorjs";
// import SimpleImage from "@editorjs/image";
// import Table from "editorjs-table";
// import Embed from "@editorjs/embed";
// import Underline from "@editorjs/underline";
// import ChangeCase from "editorjs-change-case";
// import Strikethrough from "@sotaproject/strikethrough";
// import Marker from "@editorjs/marker";
// import InlineCode from "@editorjs/inline-code";
// import ColorPlugin from "editorjs-text-color-plugin";
// import AlignmentBlockTune from "editorjs-text-alignment-blocktune";

// export const EDITOR_TOOLS = {
//     textAlignment: {
//         class: AlignmentBlockTune,
//         config: {
//             default: "left",
//             blocks: {
//                 header: "center",
//             },
//         },
//     },
//     header: {
//         class: Header,
//         shortcut: "CMD+SHIFT+H",
//         inlineToolbar: true,
//         // tunes: ["textAlignment"],
//         config: {
//             placeholder: "Введите заголовок...",
//             levels: [1, 2, 3, 4, 5, 6],
//             defaultLevel: 2,
//         },
//     },
//     title: Title,
//     paragraph: {
//         class: Paragraph,
//         inlineToolbar: true,
//         // tunes: ["textAlignment"],
//     },
//     list: {
//         class: NestedList,
//         inlineToolbar: true,
//         config: {
//             defaultStyle: "unordered",
//         },
//         shortcut: "CMD+SHIFT+L",
//     },
//     image: SimpleImage,
//     underline: Underline,
//     strikethrough: Strikethrough,
//     Marker: {
//         class: Marker,
//         shortcut: "CMD+SHIFT+M",
//     },
//     inlineCode: InlineCode,
//     changeCase: ChangeCase,
//     Color: {
//         class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
//         config: {
//             colorCollections: [
//                 "#EC7878",
//                 "#9C27B0",
//                 "#673AB7",
//                 "#3F51B5",
//                 "#0070FF",
//                 "#03A9F4",
//                 "#00BCD4",
//                 "#4CAF50",
//                 "#8BC34A",
//                 "#CDDC39",
//                 "#FFF",
//             ],
//             defaultColor: "#FF1300",
//             customPicker: true, // add a button to allow selecting any colour
//         },
//     },
// };
