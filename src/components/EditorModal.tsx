import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
import { FC, useRef } from "react";
// import { EditorContext } from "@/components/EditorContext";
// import { EditorContextType } from "@/data/types/editorTypes";
import { Editor } from "@tinymce/tinymce-react";
import { Student, Teacher } from "@/data/types/UsersTypes";
import { Download } from "lucide-react";
// import { asBlob } from "html-docx-js-typescript";
import { asBlob } from "html-docx-ts";
import { saveAs } from "file-saver";
import { convertImagesToBase64 } from "@/data/helpers";
import {
    useGetForgejoFileContent,
    useUpdateForgejoFileContent,
} from "@/features/queries";
import { EDITOR_APIKEY } from "@/data/types/constants";

interface Props {
    user: Student | Teacher;
    student?: Student | null;
}

const EditorModal: FC<Props> = ({ user, student }) => {
    // const { initEditor, editorInstanceRef } = useContext(
    //     EditorContext
    // ) as EditorContextType;
    // const editorRef = useRef(false);

    // const handleClick = async () => {
    //     const data = await editorInstanceRef.current?.save();
    //     console.log(data);
    // };

    const editorRef = useRef<any>(null);

    const { data, isPending: isPendingGet } = useGetForgejoFileContent({
        email: student ? student.email : user.email,
        repo: "diplom",
        filepath: "diplom.html",
        method: "GET",
    });
    const { mutate: updateForgejoFileContent, isPending: isPendingUpt } =
        useUpdateForgejoFileContent();

    const handleSaveSubmit = () => {
        const formData = new FormData();
        formData.append("content", editorRef.current.getContent());

        updateForgejoFileContent({
            email: student ? student.email : user.email,
            repo: "diplom",
            filepath: data ? data.path : "diplom.html",
            data: formData,
            method: "PUT",
        });
    };

    const downloadDocx = async () => {
        const contentDocument = editorRef.current.getDoc();
        convertImagesToBase64(contentDocument);

        const htmlString =
            "<!DOCTYPE html>" + contentDocument.documentElement.outerHTML;

        const converted = await asBlob(htmlString, {
            orientation: "portrait",
        }).then((value) => value as Blob);
        saveAs(
            converted,
            `${user.fio ? user.fio.replace(/\s/g, "_") : user.last_name}.docx`
        );

        const link = document.createElement("a");
        link.href = URL.createObjectURL(converted);
        link.download = "document.docx";
        link.appendChild(
            document.createTextNode(
                "Нажмите сюда, если загрузка не началась автоматически"
            )
        );
        const downloadArea = document.getElementById("download-area");
        downloadArea!.innerHTML = "";
        downloadArea?.appendChild(link);
    };

    return (
        <>
            {/* <div id="editorjs" /> */}
            {/* <Switch
                checked={useDarkMode}
                onCheckedChange={handleTheme}
                color="grey"
            /> */}
            <Editor
                apiKey={EDITOR_APIKEY}
                onInit={(evt, editor) => {
                    if (user.role.toLocaleLowerCase() !== "student" && evt) {
                        editor
                            .getBody()
                            .setAttribute("contenteditable", "false");
                    }
                    editorRef.current = editor;
                }}
                initialValue={data?.content}
                //     user.theme
                //         ? `<h2 data-mce-style="text-align: center;" style="text-align: center;">${user.theme}</h2>`
                //         : undefined
                // }
                init={{
                    language: "ru",
                    height: "45rem",
                    content_css: "document",
                    plugins:
                        "preview importcss searchreplace autolink save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                    menubar: "file edit view insert format tools table help",
                    menu: {
                        file: {
                            title: "File",
                            items: "newdocument restoredraft | preview | save | print | deleteallconversations",
                        },
                        edit: {
                            title: "Edit",
                            items: "undo redo | cut copy paste pastetext | selectall | searchreplace",
                        },
                        view: {
                            title: "View",
                            items: "code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments",
                        },
                        insert: {
                            title: "Insert",
                            items: "image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
                        },
                        format: {
                            title: "Format",
                            items: "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat",
                        },
                        tools: {
                            title: "Tools",
                            items: "spellchecker spellcheckerlanguage | a11ycheck code wordcount",
                        },
                        table: {
                            title: "Table",
                            items: "inserttable | cell row column | advtablesort | tableprops deletetable",
                        },
                        help: { title: "Help", items: "help" },
                    },
                    toolbar:
                        "save undo redo | image | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist | table media link | lineheight outdent indent|  removeformat | charmap emoticons | code fullscreen preview | print | pagebreak anchor codesample | accordion accordionremove | ltr rtl",
                    tinycomments_mode: "embedded",
                    autosave_ask_before_unload: true,
                    a11y_advanced_options: true,
                    image_advtab: true,
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: "image",
                    file_picker_callback: (cb) => {
                        const input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");

                        input.addEventListener("change", (e) => {
                            const target = e.target as HTMLInputElement;
                            const file: any = target?.files?.[0];

                            const reader = new FileReader();
                            reader.addEventListener("load", () => {
                                const id = "blobid" + new Date().getTime();
                                const blobCache =
                                    editorRef.current.editorUpload.blobCache;
                                const base64 = reader.result
                                    ?.toString()
                                    .split(",")[1];
                                const blobInfo = blobCache.create(
                                    id,
                                    file,
                                    base64
                                );
                                blobCache.add(blobInfo);

                                /* call the callback and populate the Title field with the file name */
                                cb(blobInfo.blobUri(), {
                                    title: file?.name,
                                });
                            });
                            reader.readAsDataURL(file);
                        });

                        input.click();
                    },
                    quickbars_selection_toolbar:
                        "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                    toolbar_mode: "sliding",
                    contextmenu: "link image table",
                    // skin: useDarkMode ? "oxide-dark" : "oxide",
                    // content_css: useDarkMode ? "dark" : "default",
                    save_onsavecallback: () => {
                        handleSaveSubmit();
                    },
                }}
            />
            {/* <Button
                // id="saveButton"
                className="mt-3"
                onClick={handleSaveSubmit}
                disabled={isPendingGet || isPendingUpt}>
                Сохранить
            </Button> */}
            <Button
                className="my-2 ml-3"
                onClick={downloadDocx}
                variant={"outline"}
                disabled={isPendingGet || isPendingUpt}>
                Скачать .docx {<Download className="ml-2 h-4 w-4" />}
            </Button>
            <div id="download-area"></div>
        </>
    );
};

export default EditorModal;
