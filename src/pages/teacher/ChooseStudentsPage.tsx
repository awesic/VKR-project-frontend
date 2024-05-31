import Layout from "@/hocs/Layout";
import Navbars from "@/components/Navbars";
import { DataTable } from "@/components/ListDataTable/data-table";
import { StudentsListColumns } from "@/components/ListDataTable/columns";
import { useFetchStudentsQuery } from "@/features/queries";
import { SpinnerCenter } from "@/pages/Loading";
import { Toaster, toast } from "sonner";

const ChooseStudentsPage = () => {
    const { data: studentsList, isPending, isError } = useFetchStudentsQuery();

    return (
        <>
            <Layout
                title={"Выбор студентов"}
                content={"Страница утверждения науч. рук."}>
                <Navbars />
                <div className={"container py-5"}>
                    <h4
                        className={
                            "scroll-m-20 text-xl font-semibold tracking-tight"
                        }>
                        Список студентов, которые выбрали Вас
                    </h4>
                    {isError ? (
                        toast.error(
                            "Ошибка! Попробуйте обновить страницу и попробовать снова."
                        )
                    ) : isPending ? (
                        <SpinnerCenter />
                    ) : (
                        <DataTable
                            columns={StudentsListColumns}
                            data={studentsList}
                            teacher_approved={false}
                            admin={false}
                            adminStudents={false}
                        />
                    )}
                    {/* <Toaster
                        richColors
                        closeButton
                        toastOptions={{ duration: 1000 * 5 }}
                    /> */}
                </div>
            </Layout>
        </>
    );
};
export default ChooseStudentsPage;
