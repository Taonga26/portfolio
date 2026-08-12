import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { supabase } from "../utils/supabase";
import SkillIcon from "../components/SkillIcon";
import { iconRegistry } from "../utils/iconRegistry";


function AdminTechnologyForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const editing = Boolean(id);


    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");

    const [loading, setLoading] = useState(
        editing
    );

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");




    /*
    |--------------------------------------------------------------------------
    | Load existing technology
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!editing) {
            return;
        }


        async function loadTechnology() {

            setLoading(true);


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
                .eq("id", id)
                .single();


            if (error) {

                console.error(error);

                setError(
                    error.message
                );

                setLoading(false);

                return;
            }


            setName(data.name || "");
            setIcon(data.icon || "");

            setLoading(false);

        }


        loadTechnology();

    }, [id, editing]);


    /*
    |--------------------------------------------------------------------------
    | Save
    |--------------------------------------------------------------------------
    */

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");


        if (!name.trim()) {

            setError(
                "Technology name is required."
            );

            return;
        }



        if (!icon) {

            setError(
                "Please select an icon."
            );

            return;
        }

        const technology = {
            name: name.trim(),
            icon
        };


        setSaving(true);


        let result;


        if (editing) {

            result = await supabase
                .from("technologies")
                .update(technology)
                .eq("id", id);

        } else {

            result = await supabase
                .from("technologies")
                .insert(technology);

        }


        if (result.error) {

            console.error(
                result.error
            );

            setError(
                result.error.message
            );

            setSaving(false);

            return;
        }


        navigate("/admin/technologies");

    }


    if (loading) {

        return (

            <div className="
                p-8
                text-slate-400
            ">
                Loading technology...
            </div>

        );

    }


    return (

        <div className="
            max-w-4xl
            mx-auto
            p-6
            md:p-8
        ">

            {/* Back */}

            <button
                type="button"
                onClick={() =>
                    navigate("/admin/technologies")
                }
                className="
                    inline-flex
                    items-center
                    gap-2
                    text-slate-400
                    hover:text-white
                    transition
                    mb-8
                "
            >
                <FaArrowLeft />

                Back to technologies

            </button>


            {/* Header */}

            <div className="mb-8">

                <h1 className="
                    text-2xl
                    md:text-3xl
                    font-bold
                ">
                    {editing
                        ? "Edit Technology"
                        : "Add Technology"
                    }
                </h1>

                <p className="
                    text-slate-400
                    mt-2
                ">
                    {editing
                        ? "Update the technology information."
                        : "Add a new technology to your portfolio."
                    }
                </p>

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


            <form
                onSubmit={handleSubmit}
                className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-6
                    md:p-8
                    space-y-8
                "
            >

                {/* Name */}

                <div>

                    <label className="
                        block
                        text-sm
                        font-medium
                        mb-2
                    ">
                        Technology Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={e =>
                            setName(
                                e.target.value
                            )
                        }
                        placeholder="e.g. React"
                        className="
                            w-full
                            bg-slate-800
                            border
                            border-slate-700
                            rounded-xl
                            px-4
                            py-3
                            outline-none
                            focus:border-blue-500
                        "
                    />

                </div>



                {/* Icon */}

                <div>

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-3
                    ">

                        <label className="
                            block
                            text-sm
                            font-medium
                        ">
                            Icon
                        </label>


                        {icon && (

                            <div className="
                                flex
                                items-center
                                gap-2
                                text-blue-400
                                text-sm
                            ">

                                <SkillIcon
                                    icon={icon}
                                    className="text-xl"
                                />

                                {icon}

                            </div>

                        )}

                    </div>


                    <div className="
                        grid
                        grid-cols-4
                        sm:grid-cols-6
                        md:grid-cols-8
                        gap-3
                        max-h-80
                        overflow-y-auto
                        p-2
                    ">

                        {Object.keys(
                            iconRegistry
                        ).map(iconName => {

                            const selected =
                                icon === iconName;

                            return (

                                <button
                                    key={iconName}
                                    type="button"
                                    title={iconName}
                                    onClick={() =>
                                        setIcon(
                                            iconName
                                        )
                                    }
                                    className={`
                                        aspect-square
                                        rounded-xl
                                        border
                                        flex
                                        items-center
                                        justify-center
                                        transition

                                        ${
                                            selected
                                                ? `
                                                    bg-blue-600/20
                                                    border-blue-500
                                                    text-blue-400
                                                `
                                                : `
                                                    bg-slate-800
                                                    border-slate-700
                                                    text-slate-400
                                                    hover:border-blue-500
                                                    hover:text-blue-400
                                                `
                                        }
                                    `}
                                >

                                    <SkillIcon
                                        icon={iconName}
                                        className="
                                            text-2xl
                                            md:text-3xl
                                        "
                                    />

                                </button>

                            );

                        })}

                    </div>

                </div>


                {/* Actions */}

                <div className="
                    flex
                    flex-col-reverse
                    sm:flex-row
                    sm:justify-end
                    gap-3
                    pt-4
                    border-t
                    border-slate-800
                ">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin/technologies"
                            )
                        }
                        className="
                            px-5
                            py-3
                            rounded-xl
                            bg-slate-800
                            hover:bg-slate-700
                            transition
                        "
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        disabled={saving}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            px-5
                            py-3
                            rounded-xl
                            bg-blue-600
                            hover:bg-blue-700
                            disabled:opacity-50
                            transition
                        "
                    >

                        <FaSave />

                        {saving
                            ? "Saving..."
                            : editing
                                ? "Update Technology"
                                : "Save Technology"
                        }

                    </button>

                </div>

            </form>

        </div>

    );

}


export default AdminTechnologyForm;