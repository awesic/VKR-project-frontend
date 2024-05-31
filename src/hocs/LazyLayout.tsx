import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loading } from "@/pages/Loading";

const LazyLayout = () => {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
        </>
    );
};
export default LazyLayout;
