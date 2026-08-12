import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { supabase } from "../utils/supabase";
import SkillIcon from "../components/SkillIcon";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function AdminSkills() {

    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const navigate = useNavigate();


    useEffect(() => {

        async function loadSkills() {

            setLoading(true);
            setError("");


            const {
                data,
                error
            } = await supabase
                .from("skills")
                .select(`
                    id,
                    category,
                    name,
                    icon
                `)
                .order("category")
                .order("name");


            if (error) {

                console.error(error);

                setError(
                    error.message
                );

                setLoading(false);

                return;
            }


            setSkills(data || []);

            setLoading(false);
        }

        loadSkills();

    }, []);


    async function deleteSkill(id) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this skill?"
            );


        if (!confirmed) {
            return;
        }


        const {
            error
        } = await supabase
            .from("skills")
            .delete()
            .eq("id", id);


        if (error) {

            console.error(error);

            setError(
                error.message
            );

            return;
        }


        setSkills(current =>
            current.filter(
                skill =>
                    skill.id !== id
            )
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Group skills by category
    |--------------------------------------------------------------------------
    */

    const groupedSkills =
        skills.reduce(
            (groups, skill) => {

                if (!groups[skill.category]) {
                    groups[skill.category] = [];
                }

                groups[skill.category].push(
                    skill
                );

                return groups;

            },
            {}
        );


    if (loading) {

        return (

            <Loader />

        );

    }

    

    return (

        <div className="
            p-6
            md:p-8
            max-w-7xl
            mx-auto
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
                        Skills
                    </h1>

                    <p className="
                        text-slate-400
                        mt-2
                    ">
                        Manage the skills displayed
                        on your portfolio.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/admin/skills/create"
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

                    Add Skill

                </button>

            </div>


            {/* Error */}

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


            {/* Skills */}

            <div className="space-y-8">

                {Object.entries(
                    groupedSkills
                ).map(
                    ([category, categorySkills]) => (

                    <section
                        key={category}
                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-2xl
                            overflow-hidden
                        "
                    >

                        <div className="
                            px-6
                            py-4
                            border-b
                            border-slate-800
                        ">

                            <h2 className="
                                text-lg
                                font-semibold
                                text-blue-400
                            ">
                                {category}
                            </h2>

                        </div>


                        <div>
                            
                            {categorySkills.map(
                                skill => (
                                    
                                <div
                                    key={skill.id}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        px-6
                                        py-4
                                        border-b
                                        border-slate-800
                                        last:border-b-0
                                        hover:bg-slate-800/50
                                        transition
                                    "
                                >

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                    ">

                                        <div className="
                                            w-10
                                            h-10
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
                                                    icon={skill.icon}
                                                    className="
                                                        text-sm
                                                        text-blue-400"
                                            />
                                        </div>


                                        <div>

                                            <h3 className="
                                                font-medium
                                            ">
                                                {skill.name}
                                            </h3>

                                        </div>

                                    </div>


                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                    ">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/skills/${skill.id}/edit`
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
                                            title="Edit skill"
                                        >
                                            <FaEdit />
                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteSkill(
                                                    skill.id
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
                                            title="Delete skill"
                                        >
                                            <FaTrash />
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>

                ))}

            </div>

        </div>

    );

}


export default AdminSkills;