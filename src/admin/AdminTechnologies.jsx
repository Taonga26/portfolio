import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import SkillIcon from "../components/SkillIcon";


function AdminTechnologies() {

    const navigate = useNavigate();

    const [technologies, setTechnologies] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        async function loadTechnologies() {

            setLoading(true);
            setError("");


            const {
                data,
                error
            } = await supabase
                .from("technologies")
                .select(`
                    id,
                    name,
                    icon
                `)
                .order("name");


            if (error) {

                console.error(error);

                setError(error.message);

                setLoading(false);

                return;
            }


            setTechnologies(data || []);

            setLoading(false);
        }

        loadTechnologies();

    }, []);


    async function deleteTechnology(id) {

        const confirmed =
            window.confirm(
                "Delete this technology?"
            );


        if (!confirmed) {
            return;
        }


        const {
            error
        } = await supabase
            .from("technologies")
            .delete()
            .eq("id", id);


        if (error) {

            console.error(error);

            setError(error.message);

            return;
        }


        setTechnologies(current =>
            current.filter(
                technology =>
                    technology.id !== id
            )
        );
    }


    if (loading) {

        return (
            <div className="p-8 text-slate-400">
                Loading technologies...
            </div>
        );
    }


    return (

        <div className="
            max-w-7xl
            mx-auto
            p-6
            md:p-8
        ">

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

                    <h1 className="
                        text-2xl
                        md:text-3xl
                        font-bold
                    ">
                        Technologies
                    </h1>

                    <p className="
                        text-slate-400
                        mt-2
                    ">
                        Manage the technologies used
                        throughout your projects.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/admin/technologies/create"
                        )
                    }
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
                        transition
                    "
                >
                    <FaPlus />

                    Add Technology
                </button>

            </div>


            {error && (

                <div className="
                    mb-6
                    p-4
                    rounded-xl
                    bg-red-500/10
                    border
                    border-red-500/30
                    text-red-400
                ">
                    {error}
                </div>

            )}


            {/* Technologies */}

            <div className="
                grid
                sm:grid-cols-2
                lg:grid-cols-3
                gap-4
            ">

                {technologies.map(
                    technology => (

                    <div
                        key={technology.id}
                        className="
                            flex
                            items-center
                            justify-between
                            gap-4
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-2xl
                            p-5
                            hover:border-blue-500
                            transition
                        "
                    >

                        <div className="
                            flex
                            items-center
                            gap-4
                            min-w-0
                        ">

                            <div className="
                                w-12
                                h-12
                                shrink-0
                                rounded-xl
                                bg-blue-600/10
                                border
                                border-blue-500/20
                                flex
                                items-center
                                justify-center
                                text-blue-400
                            ">

                                <SkillIcon
                                    icon={technology.icon}
                                    className="text-2xl"
                                />

                            </div>


                            <div className="min-w-0">

                                <h3 className="
                                    font-semibold
                                    truncate
                                ">
                                    {technology.name}
                                </h3>

                                <p className="
                                    text-xs
                                    text-slate-500
                                    mt-1
                                ">
                                    {technology.icon}
                                </p>

                            </div>

                        </div>


                        <div className="
                            flex
                            gap-1
                        ">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/admin/technologies/${technology.id}/edit`
                                    )
                                }
                                className="
                                    p-3
                                    rounded-xl
                                    text-slate-400
                                    hover:text-blue-400
                                    hover:bg-blue-500/10
                                    transition
                                "
                            >
                                <FaEdit />
                            </button>


                            <button
                                type="button"
                                onClick={() =>
                                    deleteTechnology(
                                        technology.id
                                    )
                                }
                                className="
                                    p-3
                                    rounded-xl
                                    text-slate-400
                                    hover:text-red-400
                                    hover:bg-red-500/10
                                    transition
                                "
                            >
                                <FaTrash />
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}


export default AdminTechnologies;