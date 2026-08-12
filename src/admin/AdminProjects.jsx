import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";
import { supabase } from "../utils/supabase";
import { getProjectImage } from "../utils/storage";
import Loader from "../components/Loader";

function AdminProjects() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadProjects() {

            setLoading(true);
            setError("");

            const { data, error } = await supabase
                .from("projects")
                .select(`
                    id,
                    title,
                    short_description,
                    cover_image,
                    published,
                    created_at,
                    project_technologies(
                        technologies(
                            id,
                            name,
                            icon
                        )
                    )
                `)
                .order("created_at", {
                    ascending: false
                });

            if (error) {
                console.error(error);
                setError(error.message);
            } else {
                setProjects(data || []);
            }

            setLoading(false);
        }
            loadProjects();
    }, []);


    async function deleteProject(project) {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${project.title}"?`
        );

        if (!confirmed) {
            return;
        }


        const { error } = await supabase
            .from("projects")
            .delete()
            .eq("id", project.id);


        if (error) {
            alert(error.message);
            return;
        }


        setProjects(current =>
            current.filter(
                item => item.id !== project.id
            )
        );
    }


    async function togglePublished(project) {

        const { data, error } = await supabase
            .from("projects")
            .update({
                published: !project.published
            })
            .eq("id", project.id)
            .select()
            .single();


        if (error) {
            alert(error.message);
            return;
        }


        setProjects(current =>
            current.map(item =>
                item.id === project.id
                    ? {
                        ...item,
                        published: data.published
                    }
                    : item
            )
        );
    }


    if (loading) {
        return (
            <Loader/>
        );
    }


    return (
        <div className="max-w-7xl mx-auto">

            {/* Header */}

            <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
                mb-8
            ">

                <div>

                    <h1 className="text-3xl font-bold ">
                        Projects
                    </h1>

                    <p className="
                        text-slate-400
                        mt-2
                    ">
                        Manage the projects displayed on your portfolio.
                    </p>

                </div>


                <Link
                    to="/admin/projects/create"
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        bg-blue-600
                        hover:bg-blue-700
                        px-5
                        py-3
                        rounded-xl
                        font-medium
                        transition
                    "
                >
                    <FaPlus />

                    Add Project
                </Link>

            </div>


            {/* Error */}

            {error && (
                <div className="
                    bg-red-500/10
                    border
                    border-red-500/30
                    text-red-400
                    p-4
                    rounded-xl
                    mb-6
                ">
                    {error}
                </div>
            )}


            {/* Empty */}

            {projects.length === 0 && !error && (
                <div className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-10
                    text-center
                ">

                    <h2 className="text-xl font-bold">
                        No projects yet
                    </h2>

                    <p className="
                        text-slate-400
                        mt-2
                        mb-6
                    ">
                        Add your first portfolio project.
                    </p>

                    <Link
                        to="/admin/projects/create"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            bg-blue-600
                            px-5
                            py-3
                            rounded-xl
                        "
                    >
                        <FaPlus />
                        Add Project
                    </Link>

                </div>
            )}


            {/* Desktop Table */}

            {projects.length > 0 && (
                <div className="
                    hidden
                    lg:block
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    overflow-hidden
                ">

                    <table className="w-full">

                        <thead className="bg-slate-800/70">

                            <tr>

                                <th className="
                                    text-left
                                    px-6
                                    py-4
                                    text-sm
                                    text-slate-400
                                ">
                                    Project
                                </th>

                                <th className="
                                    text-left
                                    px-6
                                    py-4
                                    text-sm
                                    text-slate-400
                                ">
                                    Technologies
                                </th>

                                <th className="
                                    text-left
                                    px-6
                                    py-4
                                    text-sm
                                    text-slate-400
                                ">
                                    Status
                                </th>

                                <th className="
                                    text-right
                                    px-6
                                    py-4
                                    text-sm
                                    text-slate-400
                                ">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {projects.map(project => (

                                <tr
                                    key={project.id}
                                    className="
                                        border-t
                                        border-slate-800
                                    "
                                >

                                    {/* Project */}

                                    <td className="px-6 py-5">

                                        <div className="
                                            flex
                                            items-center
                                            gap-4
                                        ">

                                            <img
                                                src={getProjectImage(
                                                    project.cover_image
                                                )}
                                                alt={project.title}
                                                className="
                                                    w-16
                                                    h-12
                                                    object-cover
                                                    rounded-lg
                                                    bg-slate-800
                                                "
                                            />

                                            <div>

                                                <h3 className="font-semibold">
                                                    {project.title}
                                                </h3>

                                                <p className="
                                                    text-xs
                                                    text-slate-500
                                                    mt-1
                                                    max-w-xs
                                                    truncate
                                                ">
                                                    {project.short_description}
                                                </p>

                                            </div>

                                        </div>

                                    </td>


                                    {/* Technologies */}

                                    <td className="px-6 py-5">

                                        <div className="
                                            flex
                                            flex-wrap
                                            gap-2
                                        ">

                                            {project.project_technologies
                                                ?.map(({ technologies }) => (
                                                    <span
                                                        key={technologies.id}
                                                        className="
                                                            text-xs
                                                            bg-blue-500/10
                                                            text-blue-400
                                                            px-2
                                                            py-1
                                                            rounded-full
                                                        "
                                                    >
                                                        {technologies.name}
                                                    </span>
                                                ))
                                            }

                                        </div>

                                    </td>


                                    {/* Status */}

                                    <td className="px-6 py-5">

                                        <button
                                            onClick={() =>
                                                togglePublished(project)
                                            }
                                            className={`
                                                inline-flex
                                                items-center
                                                gap-2
                                                px-3
                                                py-1.5
                                                rounded-full
                                                text-xs
                                                font-medium

                                                ${
                                                    project.published
                                                        ? "bg-green-500/10 text-green-400"
                                                        : "bg-slate-700 text-slate-400"
                                                }
                                            `}
                                        >

                                            {project.published
                                                ? <FaEye />
                                                : <FaEyeSlash />
                                            }

                                            {project.published
                                                ? "Published"
                                                : "Draft"
                                            }

                                        </button>

                                    </td>


                                    {/* Actions */}

                                    <td className="px-6 py-5">

                                        <div className="
                                            flex
                                            justify-end
                                            gap-2
                                        ">

                                            <Link
                                                to={`/project/${project.id}`}
                                                target="_blank"
                                                className="
                                                    p-3
                                                    rounded-lg
                                                    bg-slate-800
                                                    text-slate-300
                                                    hover:text-white
                                                    transition
                                                "
                                                title="View"
                                            >
                                                <FaEye />
                                            </Link>


                                            <Link
                                                to={`/admin/projects/${project.id}/edit`}
                                                className="
                                                    p-3
                                                    rounded-lg
                                                    bg-blue-500/10
                                                    text-blue-400
                                                    hover:bg-blue-500/20
                                                    transition
                                                "
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </Link>


                                            <button
                                                onClick={() =>
                                                    deleteProject(project)
                                                }
                                                className="
                                                    p-3
                                                    rounded-lg
                                                    bg-red-500/10
                                                    text-red-400
                                                    hover:bg-red-500/20
                                                    transition
                                                "
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            )}


            {/* Mobile Cards */}

            <div className="
                lg:hidden
                space-y-4
            ">

                {projects.map(project => (

                    <div
                        key={project.id}
                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-2xl
                            overflow-hidden
                        "
                    >

                        <img
                            src={getProjectImage(
                                project.cover_image
                            )}
                            alt={project.title}
                            className="
                                w-full
                                h-48
                                object-cover
                            "
                        />


                        <div className="p-5">

                            <div className="
                                flex
                                justify-between
                                gap-4
                            ">

                                <div>

                                    <h3 className="font-bold text-lg">
                                        {project.title}
                                    </h3>

                                    <p className="
                                        text-sm
                                        text-slate-400
                                        mt-1
                                    ">
                                        {project.short_description}
                                    </p>

                                </div>


                                <button
                                    onClick={() =>
                                        togglePublished(project)
                                    }
                                    className={`
                                        shrink-0
                                        h-fit
                                        p-2
                                        rounded-lg

                                        ${
                                            project.published
                                                ? "text-green-400 bg-green-500/10"
                                                : "text-slate-500 bg-slate-800"
                                        }
                                    `}
                                >
                                    {project.published
                                        ? <FaEye />
                                        : <FaEyeSlash />
                                    }
                                </button>

                            </div>


                            {/* Technologies */}

                            <div className="
                                flex
                                flex-wrap
                                gap-2
                                mt-5
                            ">

                                {project.project_technologies
                                    ?.map(({ technologies }) => (
                                        <span
                                            key={technologies.id}
                                            className="
                                                text-xs
                                                bg-blue-500/10
                                                text-blue-400
                                                px-2
                                                py-1
                                                rounded-full
                                            "
                                        >
                                            {technologies.name}
                                        </span>
                                    ))
                                }

                            </div>


                            {/* Actions */}

                            <div className="
                                flex
                                gap-2
                                mt-5
                            ">

                                <Link
                                    to={`/project/${project.id}`}
                                    target="_blank"
                                    className="
                                        flex-1
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        bg-slate-800
                                        py-3
                                        rounded-xl
                                        text-sm
                                    "
                                >
                                    <FaEye />
                                    View
                                </Link>


                                <Link
                                    to={`/admin/projects/${project.id}/edit`}
                                    className="
                                        flex-1
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        bg-blue-600
                                        py-3
                                        rounded-xl
                                        text-sm
                                    "
                                >
                                    <FaEdit />
                                    Edit
                                </Link>


                                <button
                                    onClick={() =>
                                        deleteProject(project)
                                    }
                                    className="
                                        px-4
                                        bg-red-500/10
                                        text-red-400
                                        rounded-xl
                                    "
                                >
                                    <FaTrash />
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default AdminProjects;