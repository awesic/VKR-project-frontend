import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetUserInfo } from "@/features/queries";

interface IRoles {
    allowedRoles: Array<string>;
}

const PrivateRoute = ({ allowedRoles }: IRoles) => {
    const location = useLocation();
    const { data: user, isSuccess } = useGetUserInfo();

    return isSuccess &&
        allowedRoles?.includes(user?.role?.toString().toLowerCase()) ? (
        <Outlet />
    ) : (
        <Navigate to={"/login"} state={{ from: location }} />
    );
};
export default PrivateRoute;
