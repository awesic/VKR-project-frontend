import Layout from "@/hocs/Layout";
import Navbars from "@/components/Navbars";
import { TeachersListColumns } from "@/components/ListDataTable/columns";
import { DataTable } from "@/components/ListDataTable/data-table";
import { useFetchAllTeachers } from "@/features/queries";
import { SpinnerCenter } from "../Loading";
import { toast } from "sonner";

const AdminTeachersListPage = () => {
    const { data: teachersList, isError, isPending } = useFetchAllTeachers();

    return (
        <>
            <Layout
                title={"Список преподавателей"}
                content={"Страница списка преподавателей"}>
                <Navbars />
                <div className={"container py-5"}>
                    <h4
                        className={
                            "scroll-m-20 text-xl font-semibold tracking-tight"
                        }>
                        Список преподавателей
                    </h4>

                    {isPending ? (
                        <SpinnerCenter />
                    ) : isError ? (
                        toast.error(
                            "Ошибка! Попробуйте обновить страницу и попробовать снова."
                        )
                    ) : (
                        <DataTable
                            columns={TeachersListColumns}
                            data={teachersList}
                            admin={true}
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
export default AdminTeachersListPage;
