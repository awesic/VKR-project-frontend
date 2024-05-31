// "use client";

// import EditorJS from "@editorjs/editorjs";
// import { createContext, useRef } from "react";
// import { EDITOR_TOOLS } from "@/data/types/constants";
// import DragDrop from "editorjs-drag-drop";
// import Undo from "editorjs-undo";
// import { EditorContextType } from "@/data/types/editorTypes";

// export const EditorContext = createContext<EditorContextType | null>(null);

// function EditorContextProvider({ children }: { children: React.ReactNode }) {
//     const editorInstanceRef = useRef<null | EditorJS>(null);
//     const initEditor = async () => {
//         const editor = new EditorJS({
//             holder: "editorjs",
//             autofocus: true,
//             tools: EDITOR_TOOLS,

//             onReady: () => {
//                 new Undo({ editor });
//                 new DragDrop(editor);
//             },
//         });
//         editorInstanceRef.current = editor;
//     };

//     return (
//         <EditorContext.Provider value={{ initEditor, editorInstanceRef }}>
//             {children}
//         </EditorContext.Provider>
//     );
// }

// export default EditorContextProvider;
