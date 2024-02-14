import Layout from "@/hocs/Layout";
import Navbars from "@/components/Navbars";
import { StudentsListColumns } from "@/components/ListDataTable/columns";
import { DataTable } from "@/components/ListDataTable/data-table";
import { useFetchStudentsQuery } from "@/features/queries";
import { SpinnerCenter } from "../Loading";
import { Toaster, toast } from "sonner";

const StudentsListPage = () => {
    const { data: studentsList, isError, isPending } = useFetchStudentsQuery();

    return (
        <>
            <Layout
                title={"Список студентов"}
                content={"Страница списка студентов"}>
                <Navbars />
                <div className={"container py-5"}>
                    <h4
                        className={
                            "scroll-m-20 text-xl font-semibold tracking-tight"
                        }>
                        Список студентов, которых Вы выбрали
                    </h4>

                    {isPending ? (
                        <SpinnerCenter />
                    ) : isError ? (
                        toast.error(
                            "Ошибка! Попробуйте обновить страницу и попробовать снова."
                        )
                    ) : (
                        <DataTable
                            columns={StudentsListColumns}
                            data={studentsList}
                            teacher_approved={true}
                            admin={false}
                            adminStudents={false}
                        />
                    )}
                    <Toaster
                        richColors
                        closeButton
                        toastOptions={{ duration: 1000 * 5 }}
                    />
                </div>
            </Layout>
        </>
    );
};
export default StudentsListPage;
