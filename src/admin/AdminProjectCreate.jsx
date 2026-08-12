import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaArrowLeft,
    FaImage,
    FaTimes,
    FaPlus
} from "react-icons/fa";

import { supabase } from "../utils/supabase";
import { getProjectImage } from "../utils/storage";

function AdminProjectCreate() {

    const navigate = useNavigate();

    const [technologies, setTechnologies] = useState([]);

    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [github, setGithub] = useState("");
    const [demo, setDemo] = useState("");
    const [published, setPublished] = useState(true);
    const [featured, setFeatured] = useState(false);
    

    const [selectedTechnologies, setSelectedTechnologies] = useState([]);

    const [coverImage, setCoverImage] = useState(null);
    const [screenshots, setScreenshots] = useState([]);

    const [loadingTechnologies, setLoadingTechnologies] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");


    /*
    |--------------------------------------------------------------------------
    | Load Technologies
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        async function loadTechnologies() {

            const {
                data,
                error
            } = await supabase
                .from("technologies")
                .select("id, name, icon")
                .order("name");

            if (error) {
                setError(error.message);
            } else {
                setTechnologies(data || []);
            }

            setLoadingTechnologies(false);
        }

        loadTechnologies();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Technology Selection
    |--------------------------------------------------------------------------
    */

    function toggleTechnology(id) {

        setSelectedTechnologies(current => {

            if (current.includes(id)) {

                return current.filter(
                    technologyId => technologyId !== id
                );

            }

            return [
                ...current,
                id
            ];

        });

    }


    /*
    |--------------------------------------------------------------------------
    | Cover Image
    |--------------------------------------------------------------------------
    */

    function handleCoverImage(event) {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setCoverImage(file);
    }


    /*
    |--------------------------------------------------------------------------
    | Screenshots
    |--------------------------------------------------------------------------
    */

    function handleScreenshots(event) {

        const files = Array.from(
            event.target.files || []
        );

        setScreenshots(current => [
            ...current,
            ...files
        ]);

    }


    function removeScreenshot(index) {

        setScreenshots(current =>
            current.filter(
                (_, fileIndex) => fileIndex !== index
            )
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Upload File
    |--------------------------------------------------------------------------
    */

    async function uploadFile(file, path) {

        const {
            error
        } = await supabase.storage
            .from("Projects")
            .upload(
                path,
                file,
                {
                    cacheControl: "3600",
                    upsert: false
                }
            );

        if (error) {
            throw error;
        }

        return path;
    }


    /*
    |--------------------------------------------------------------------------
    | Create Project
    |--------------------------------------------------------------------------
    */

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setSubmitting(true);


        try {

            /*
            |--------------------------------------------------------------------------
            | Validation
            |--------------------------------------------------------------------------
            */

            if (!title.trim()) {
                throw new Error("Project title is required.");
            }

            if (!shortDescription.trim()) {
                throw new Error(
                    "Short description is required."
                );
            }

            if (!description.trim()) {
                throw new Error(
                    "Project description is required."
                );
            }

            if (!coverImage) {
                throw new Error(
                    "Please select a cover image."
                );
            }


            /*
            |--------------------------------------------------------------------------
            | Create Project
            |--------------------------------------------------------------------------
            */

            const {
                data: project,
                error: projectError
            } = await supabase
                .from("projects")
                .insert({
                    title: title.trim(),
                    short_description:
                        shortDescription.trim(),
                    description:
                        description.trim(),
                    github:
                        github.trim() || null,
                    demo:
                        demo.trim() || null,
                    published,
                    featured
                })
                .select()
                .single();


            if (projectError) {
                throw projectError;
            }


            /*
            |--------------------------------------------------------------------------
            | Create Safe Folder Name
            |--------------------------------------------------------------------------
            */

            const folderName = `${project.id}`;


            /*
            |--------------------------------------------------------------------------
            | Upload Cover Image
            |--------------------------------------------------------------------------
            */

            const coverExtension =
                coverImage.name
                    .split(".")
                    .pop()
                    ?.toLowerCase() || "png";

            const coverPath =
                `${folderName}/cover.${coverExtension}`;


            await uploadFile(
                coverImage,
                coverPath
            );


            /*
            |--------------------------------------------------------------------------
            | Update Project With Cover Path
            |--------------------------------------------------------------------------
            */

            const {
                error: coverUpdateError
            } = await supabase
                .from("projects")
                .update({
                    cover_image: coverPath
                })
                .eq("id", project.id);


            if (coverUpdateError) {
                throw coverUpdateError;
            }


            /*
            |--------------------------------------------------------------------------
            | Technologies
            |--------------------------------------------------------------------------
            */

            if (selectedTechnologies.length > 0) {

                const technologyRows =
                    selectedTechnologies.map(
                        technologyId => ({
                            project_id: project.id,
                            technology_id: technologyId
                        })
                    );


                const {
                    error: technologyError
                } = await supabase
                    .from("project_technologies")
                    .insert(technologyRows);


                if (technologyError) {
                    throw technologyError;
                }

            }


            /*
            |--------------------------------------------------------------------------
            | Screenshots
            |--------------------------------------------------------------------------
            */

            if (screenshots.length > 0) {

                const imageRows = [];


                for (
                    let index = 0;
                    index < screenshots.length;
                    index++
                ) {

                    const file =
                        screenshots[index];

                    const extension =
                        file.name
                            .split(".")
                            .pop()
                            ?.toLowerCase() || "png";


                    const imagePath =
                        `${folderName}/screenshots/${index + 1}.${extension}`;


                    await uploadFile(
                        file,
                        imagePath
                    );


                    imageRows.push({
                        project_id: project.id,
                        image_path: imagePath,
                        caption: file.name,
                        display_order: index
                    });

                }


                const {
                    error: imageError
                } = await supabase
                    .from("project_images")
                    .insert(imageRows);


                if (imageError) {
                    throw imageError;
                }

            }


            /*
            |--------------------------------------------------------------------------
            | Finished
            |--------------------------------------------------------------------------
            */

            navigate("/admin/projects");

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Something went wrong while creating the project."
            );

        } finally {

            setSubmitting(false);

        }

    }


    return (
        <div className="max-w-5xl mx-auto">

            {/* Header */}

            <div className="mb-8">

                <Link
                    to="/admin/projects"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        text-slate-400
                        hover:text-white
                        mb-5
                        transition
                    "
                >
                    <FaArrowLeft />
                    Back to Projects
                </Link>


                <h1 className="
                    text-3xl
                    md:text-4xl
                    font-bold
                ">
                    Add Project
                </h1>


                <p className="
                    text-slate-400
                    mt-2
                ">
                    Add a new project to your portfolio.
                </p>

            </div>


            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                {/* Basic Information */}

                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-6
                    md:p-8
                ">

                    <h2 className="
                        text-xl
                        font-bold
                        mb-6
                    ">
                        Project Information
                    </h2>


                    <div className="space-y-6">

                        {/* Title */}

                        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-3">

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-300
                                mb-2
                                font-semibold
                            ">
                                Project Title
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={e =>
                                    setTitle(e.target.value)
                                }
                                placeholder="Bakery POS System"
                                className="input rounded-xl px-3 py-2 w-full"
                                required
                            />

                        </div>


                        {/* Short Description */}

                        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-3">

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-300
                                mb-2
                                font-semibold
                            ">
                                Short Description
                            </label>

                            <input
                                type="text"
                                value={shortDescription}
                                onChange={e =>
                                    setShortDescription(
                                        e.target.value
                                    )
                                }
                                placeholder="A Laravel-based point of sale system."
                                className="input rounded-xl px-3 py-2 w-full"
                                required
                            />

                        </div>


                        {/* Description */}

                        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start gap-3">

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-300
                                mb-2
                                font-semibold
                            ">
                                Project Description
                            </label>

                            <textarea
                                rows={8}
                                value={description}
                                onChange={e =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                placeholder="Describe the project..."
                                className="input resize-y rounded-xl px-3 py-2 w-full"
                                required
                            />

                        </div>

                    </div>

                </section>


                {/* Links */}

                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-6
                    md:p-8
                ">

                    <h2 className="
                        text-xl
                        font-bold
                        mb-6
                    ">
                        Project Links
                    </h2>


                    <div className="
                        grid
                        md:grid-cols-2
                        gap-6
                    ">

                        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-3">

                            <label className="
                                block
                                text-sm
                                text-slate-300
                                mb-2
                                font-semibold
                            ">
                                GitHub URL
                            </label>

                            <input
                                type="url"
                                value={github}
                                onChange={e =>
                                    setGithub(
                                        e.target.value
                                    )
                                }
                                placeholder="https://github.com/..."
                                className="input rounded-xl px-3 py-2 w-full"
                            />

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-3">

                            <label className="
                                block
                                text-sm
                                text-slate-300
                                mb-2
                                font-semibold
                            ">
                                Demo URL
                            </label>

                            <input
                                type="url"
                                value={demo}
                                onChange={e =>
                                    setDemo(
                                        e.target.value
                                    )
                                }
                                placeholder="https://..."
                                className="input rounded-xl px-3 py-2 w-full"
                            />

                        </div>

                    </div>

                </section>


                {/* Technologies */}

                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-6
                    md:p-8
                ">

                    <h2 className="
                        text-xl
                        font-bold
                        mb-2
                    ">
                        Technologies
                    </h2>

                    <p className="
                        text-slate-400
                        text-sm
                        mb-6
                    ">
                        Select the technologies used in this project.
                    </p>


                    {loadingTechnologies ? (

                        <p className="text-slate-500">
                            Loading technologies...
                        </p>

                    ) : (

                        <div className="
                            grid
                            grid-cols-2
                            sm:grid-cols-3
                            md:grid-cols-4
                            gap-3
                        ">

                            {technologies.map(
                                technology => {

                                    const selected =
                                        selectedTechnologies.includes(
                                            technology.id
                                        );

                                    return (
                                        <button
                                            type="button"
                                            key={technology.id}
                                            onClick={() =>
                                                toggleTechnology(
                                                    technology.id
                                                )
                                            }
                                            className={`
                                                text-left
                                                px-4
                                                py-3
                                                rounded-xl
                                                border
                                                transition

                                                ${
                                                    selected
                                                        ? "bg-blue-600/20 border-blue-500 text-blue-400"
                                                        : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
                                                }
                                            `}
                                        >

                                            {technology.name}

                                        </button>
                                    );

                                }
                            )}

                        </div>

                    )}

                </section>


                {/* Images */}

                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-6
                    md:p-8
                ">

                    <h2 className="
                        text-xl
                        font-bold
                        mb-6
                    ">
                        Project Images
                    </h2>


                    {/* Cover */}

                    <div className="mb-8">

                        <label className="
                            block
                            text-sm
                            text-slate-300
                            mb-3
                        ">
                            Cover Image
                        </label>


                        <label className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            min-h-48
                            border-2
                            border-dashed
                            border-slate-700
                            rounded-2xl
                            cursor-pointer
                            hover:border-blue-500
                            hover:bg-slate-800/50
                            transition
                        ">

                            <FaImage
                                className="
                                    text-3xl
                                    text-slate-500
                                    mb-3
                                "
                            />

                            <span className="
                                text-slate-300
                                font-medium
                            ">
                                {coverImage
                                    ? coverImage.name
                                    : "Choose cover image"
                                }
                            </span>

                            <span className="
                                text-xs
                                text-slate-500
                                mt-2
                            ">
                                PNG, JPG or WEBP
                            </span>


                            <input
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleCoverImage
                                }
                                className="hidden"
                            />

                        </label>

                    </div>


                    {/* Screenshots */}

                    <div>

                        <div className="
                            flex
                            items-center
                            justify-between
                            mb-3
                        ">

                            <label className="
                                text-sm
                                text-slate-300
                            ">
                                Screenshots
                            </label>


                            <label className="
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                text-blue-400
                                cursor-pointer
                            ">

                                <FaPlus />

                                Add Screenshots

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={
                                        handleScreenshots
                                    }
                                    className="hidden"
                                />

                            </label>

                        </div>


                        {screenshots.length === 0 ? (

                            <div className="
                                border
                                border-dashed
                                border-slate-800
                                rounded-xl
                                p-8
                                text-center
                                text-slate-500
                            ">
                                No screenshots selected.
                            </div>

                        ) : (

                            <div className="
                                grid
                                grid-cols-2
                                md:grid-cols-3
                                gap-4
                            ">

                                {screenshots.map((file, index) => (
                                    <div
                                        key={`${file.name}-${file.lastModified}-${index}`}
                                        className="
                                            relative
                                            group
                                            rounded-xl
                                            overflow-hidden
                                            bg-slate-800
                                        "
                                    >

                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className="
                                                w-full
                                                h-32
                                                object-cover
                                            "
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeScreenshot(index)}
                                            className="
                                                absolute
                                                top-2
                                                right-2
                                                w-8
                                                h-8
                                                flex
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-black/70
                                                text-white
                                                hover:bg-red-600
                                            "
                                        >
                                            <FaTimes />
                                        </button>

                                    </div>
                                ))}

                            </div>

                        )}

                    </div>

                </section>


                {/* Publishing */}

                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-6
                    md:p-8
                ">

                    <label className="
                        flex
                        items-center
                        gap-4
                        cursor-pointer
                    ">

                        <input
                            type="checkbox"
                            checked={published}
                            onChange={e =>
                                setPublished(
                                    e.target.checked
                                )
                            }
                            className="
                                w-5
                                h-5
                                accent-blue-600
                            "
                        />

                        <div>

                            <span className="
                                block
                                font-medium
                            ">
                                Publish project
                            </span>

                            <span className="
                                text-sm
                                text-slate-500
                            ">
                                Published projects appear on the public portfolio.
                            </span>

                        </div>

                    </label>

                </section>

                {/* Featured*/}

                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-6
                    mt-4
                ">

                    <label className="
                        flex
                        items-center
                        gap-4
                        cursor-pointer
                    ">

                        <input
                            type="checkbox"
                            checked={featured}
                            onChange={e =>
                                setFeatured(
                                    e.target.checked
                                )
                            }
                            className="
                                w-5
                                h-5
                                accent-blue-600
                            "
                        />

                        <div>

                            <span className="
                                block
                                font-medium
                            ">
                                Featured
                            </span>

                            <span className="
                                text-sm
                                text-slate-500
                            ">
                                Show this project on the public portfolio highlight.
                            </span>

                        </div>

                    </label>

                </section>

                {/* Error */}

                {error && (

                    <div className="
                        bg-red-500/10
                        border
                        border-red-500/30
                        text-red-400
                        rounded-xl
                        p-4
                        mt-6
                    ">
                        {error}
                    </div>

                )}

                {/* Buttons */}

                <div className="
                    flex
                    flex-col-reverse
                    sm:flex-row
                    justify-end
                    gap-3
                ">

                    <Link
                        to="/admin/projects"
                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-slate-800
                            hover:bg-slate-700
                            text-center
                            transition
                        "
                    >
                        Cancel
                    </Link>


                    <button
                        type="submit"
                        disabled={submitting}
                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-blue-600
                            hover:bg-blue-700
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            transition
                            font-medium
                        "
                    >
                        {submitting
                            ? "Creating Project..."
                            : "Create Project"
                        }
                    </button>

                </div>
                

            </form>
            

        </div>
    );
}

export default AdminProjectCreate;