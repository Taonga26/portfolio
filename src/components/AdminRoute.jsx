import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AdminRoute() {

    const {
        user,
        loading
    } = useAuth();


    if (loading) {
        return (
            <div className="
                min-h-screen
                bg-slate-950
                text-white
                flex
                items-center
                justify-center
            ">
                Loading...
            </div>
        );
    }


    if (!user) {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }


    return <Outlet />;
}

export default AdminRoute;