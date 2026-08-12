import { Link } from "react-router-dom";
import {
    FaProjectDiagram,
    FaTools,
    FaCode,
    FaFilePdf
} from "react-icons/fa";

function AdminDashboard() {

    const cards = [
        {
            title: "Projects",
            description: "Manage your portfolio projects.",
            icon: FaProjectDiagram,
            link: "/admin/projects"
        },
        {
            title: "Skills",
            description: "Manage your technical skills.",
            icon: FaTools,
            link: "/admin/skills"
        },
        {
            title: "Technologies",
            description: "Manage project technologies.",
            icon: FaCode,
            link: "/admin/technologies"
        },
        {
            title: "Resume",
            description: "Upload and manage your resume.",
            icon: FaFilePdf,
            link: "/admin/resume"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">

            <div className="mb-10">

                <h1 className="text-3xl md:text-4xl font-bold">
                    Dashboard
                </h1>

                <p className="text-slate-400 mt-2">
                    Manage your portfolio content.
                </p>

            </div>


            <div
                className="
                    grid
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-6
                "
            >

                {cards.map((card) => {

                    const Icon = card.icon;

                    return (
                        <Link
                            key={card.title}
                            to={card.link}
                            className="
                                group
                                bg-slate-900
                                border
                                border-slate-800
                                rounded-2xl
                                p-6
                                hover:border-blue-500
                                hover:-translate-y-1
                                transition
                            "
                        >

                            <Icon
                                className="
                                    text-blue-400
                                    text-3xl
                                    mb-5
                                    group-hover:scale-110
                                    transition
                                "
                            />

                            <h2 className="text-xl font-bold">
                                {card.title}
                            </h2>

                            <p className="
                                text-slate-400
                                text-sm
                                mt-2
                                leading-6
                            ">
                                {card.description}
                            </p>

                        </Link>
                    );
                })}

            </div>

        </div>
    );
}

export default AdminDashboard;