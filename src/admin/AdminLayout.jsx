import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaBars,
    FaTimes,
    FaTachometerAlt,
    FaProjectDiagram,
    FaTools,
    FaCode,
    FaFilePdf,
    FaSignOutAlt,
    FaExternalLinkAlt,
    FaUser
} from "react-icons/fa";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { user, logout } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const navigation = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: FaTachometerAlt
        },
        {
            name: "Projects",
            path: "/admin/projects",
            icon: FaProjectDiagram
        },
        {
            name: "Skills",
            path: "/admin/skills",
            icon: FaTools
        },
        {
            name: "Technologies",
            path: "/admin/technologies",
            icon: FaCode
        },
        {
            name: "Resume",
            path: "/admin/resume",
            icon: FaFilePdf
        },
        {
            name: "Personal Info",
            path: "/admin/profile",
            icon: FaUser
        }
    ];

    async function handleLogout() {
        await logout();
        navigate("/admin/login");
    }

    function isActive(path) {
        if (path === "/admin") {
            return location.pathname === "/admin";
        }

        return location.pathname.startsWith(path);
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Mobile Header */}

            <header
                className="
                    lg:hidden
                    fixed
                    top-0
                    left-0
                    right-0
                    h-16
                    bg-slate-900
                    border-b
                    border-slate-800
                    z-40
                    flex
                    items-center
                    justify-between
                    px-5
                "
            >

                <button
                    onClick={() => setSidebarOpen(true)}
                    className="
                        text-slate-300
                        hover:text-white
                    "
                >
                    <FaBars size={22} />
                </button>

                <span className="font-bold">
                    Portfolio Admin
                </span>

                <div className="w-6" />

            </header>


            {/* Mobile Overlay */}

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="
                        fixed
                        inset-0
                        bg-black/60
                        z-40
                        lg:hidden
                    "
                />
            )}


            {/* Sidebar */}

            <aside
                className={`
                    fixed
                    top-0
                    left-0
                    bottom-0
                    w-72
                    bg-slate-900
                    border-r
                    border-slate-800
                    z-50
                    transform
                    transition-transform
                    duration-300

                    lg:translate-x-0

                    ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >

                {/* Logo */}

                <div
                    className="
                        h-20
                        flex
                        items-center
                        justify-between
                        px-6
                        border-b
                        border-slate-800
                    "
                >

                    <div>

                        <h1 className="font-bold text-lg">
                            Portfolio Admin
                        </h1>

                        <p className="text-xs text-slate-500">
                            Management Panel
                        </p>

                    </div>


                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="
                            lg:hidden
                            text-slate-400
                            hover:text-white
                        "
                    >
                        <FaTimes size={20} />
                    </button>

                </div>


                {/* Navigation */}

                <nav className="p-4 space-y-2">

                    {navigation.map((item) => {

                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    flex
                                    items-center
                                    gap-4
                                    px-4
                                    py-3
                                    rounded-xl
                                    transition

                                    ${
                                        isActive(item.path)
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }
                                `}
                            >

                                <Icon />

                                <span className="font-medium">
                                    {item.name}
                                </span>

                            </Link>
                        );
                    })}

                </nav>


                {/* Bottom */}

                <div
                    className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        p-4
                        border-t
                        border-slate-800
                    "
                >

                    {/* User */}

                    <div
                        className="
                            px-4
                            py-3
                            mb-3
                            bg-slate-800/60
                            rounded-xl
                        "
                    >

                        <p className="text-xs text-slate-500">
                            Signed in as
                        </p>

                        <p
                            className="
                                text-sm
                                text-slate-300
                                truncate
                                mt-1
                            "
                        >
                            {user?.email}
                        </p>

                    </div>


                    {/* View Site */}

                    <Link
                        to="/"
                        target="_blank"
                        className="
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            text-slate-400
                            hover:bg-slate-800
                            hover:text-white
                            transition
                        "
                    >
                        <FaExternalLinkAlt />

                        <span>
                            View Website
                        </span>
                    </Link>


                    {/* Logout */}

                    <button
                        onClick={handleLogout}
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            text-red-400
                            hover:bg-red-500/10
                            transition
                        "
                    >

                        <FaSignOutAlt />

                        <span>
                            Sign Out
                        </span>

                    </button>

                </div>

            </aside>


            {/* Main Content */}

            <main
                className="
                    lg:ml-72
                    min-h-screen
                    pt-16
                    lg:pt-0
                "
            >

                <div className="p-6 md:p-10">

                    <Outlet />

                </div>

            </main>

        </div>
    );
}

export default AdminLayout;