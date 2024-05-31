import EditorJS from "@editorjs/editorjs";

export type EditorContextType = {
    editorInstanceRef: React.MutableRefObject<EditorJS | null>;
    initEditor: () => void;
};
