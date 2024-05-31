import Layout from "@/hocs/Layout";
import Navbars from "@/components/Navbars";
import { AdminStudentsColumns } from "@/components/ListDataTable/columns";
import { DataTable } from "@/components/ListDataTable/data-table";
import { useFetchAllStudents } from "@/features/queries";
import { SpinnerCenter } from "../Loading";
import { Toaster, toast } from "sonner";

const AdminStudentsListPage = () => {
    const { data: studentsList, isError, isPending } = useFetchAllStudents();

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
                        Список студентов
                    </h4>

                    {isPending ? (
                        <SpinnerCenter />
                    ) : isError ? (
                        toast.error(
                            "Ошибка! Попробуйте обновить страницу и попробовать снова."
                        )
                    ) : (
                        <DataTable
                            columns={AdminStudentsColumns}
                            data={studentsList}
                            admin={true}
                            adminStudents={true}
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
export default AdminStudentsListPage;
