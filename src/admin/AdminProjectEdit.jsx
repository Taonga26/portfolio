import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    FaArrowLeft,
    FaImage,
    FaTimes,
    FaPlus,
    FaTrash
} from "react-icons/fa";

import { supabase } from "../utils/supabase";
import { getProjectImage } from "../utils/storage";
import Loader from "../components/Loader";

function AdminProjectEdit() {

    const { id } = useParams();
    const navigate = useNavigate();

    console.log("Editing project:", id);

    const [project, setProject] = useState(null);
    const [technologies, setTechnologies] = useState([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);

    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [github, setGithub] = useState("");
    const [demo, setDemo] = useState("");
    const [published, setPublished] = useState(false);
    const [featured, setFeatured] = useState(false);

    const [coverImage, setCoverImage] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [newScreenshots, setNewScreenshots] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    /*
    |--------------------------------------------------------------------------
    | Load project
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        async function loadData() {

            setLoading(true);
            setError("");

            const [
                projectResult,
                technologiesResult
            ] = await Promise.all([

                supabase
                    .from("projects")
                    .select(`
                        *,
                        project_images(
                            id,
                            image_path,
                            caption,
                            display_order
                        )
                    `)
                    .eq("id", id)
                    .single(),

                supabase
                    .from("technologies")
                    .select("id, name, icon")
                    .order("name")
            ]);


            if (projectResult.error) {
                console.error(projectResult.error);
                setError(projectResult.error.message);
                setLoading(false);
                return;
            }


            if (technologiesResult.error) {
                console.error(technologiesResult.error);
                setError(technologiesResult.error.message);
                setLoading(false);
                return;
            }


            const data = projectResult.data;

            setProject(data);

            setTitle(data.title || "");
            setShortDescription(
                data.short_description || ""
            );
            setDescription(
                data.description || ""
            );
            setGithub(
                data.github || ""
            );
            setDemo(
                data.demo || ""
            );
            setPublished(
                data.published ?? false
            );
            setFeatured(
                data.featured ?? false
            );


            setTechnologies(
                technologiesResult.data || []
            );
            
            const{
                data: projectTechnologies,
                error: projectTechnologyError
            } = await supabase
                .from("project_technologies")
                .select(`
                    technology_id,
                    technologies(
                        id,
                        name,
                        icon
                    )
                `)
                .eq("project_id", id);

            if(projectTechnologyError){
                throw projectTechnologyError
            }

            console.log(
                "Technologies for project:",
                projectTechnologies
            );

            const selectedIds = (projectTechnologies || []).map(
                item => item.technology_id
            );

            console.log(
                "Selected technology IDs:",
                selectedIds
            );

            setSelectedTechnologies(selectedIds);


            setScreenshots(
                [...(data.project_images || [])]
                    .sort(
                        (a, b) =>
                            a.display_order -
                            b.display_order
                    )
            );

            setLoading(false);
        }


        loadData();

    }, [id]);


    const selected = technologies.filter(
        technology =>
            selectedTechnologies.includes(
                technology.id
        )
    );

    const available = technologies.filter(
        technology =>
            !selectedTechnologies.includes(
                technology.id
            )
    );


    /*
    |--------------------------------------------------------------------------
    | Technology selection
    |--------------------------------------------------------------------------
    */

    function toggleTechnology(technologyId) {

        setSelectedTechnologies(current => {

            if (current.includes(technologyId)) {

                return current.filter(
                    id => id !== technologyId
                );

            }

            return [
                ...current,
                technologyId
            ];

        });

    }


    /*
    |--------------------------------------------------------------------------
    | Cover image
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
    | New screenshots
    |--------------------------------------------------------------------------
    */

    function handleNewScreenshots(event) {

        const files = Array.from(
            event.target.files || []
        );

        setNewScreenshots(current => [
            ...current,
            ...files
        ]);

    }


    function removeNewScreenshot(index) {

        setNewScreenshots(current =>
            current.filter(
                (_, i) => i !== index
            )
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Delete existing screenshot
    |--------------------------------------------------------------------------
    */

    async function deleteScreenshot(image) {

        const confirmed = window.confirm(
            "Delete this screenshot?"
        );

        if (!confirmed) {
            return;
        }


        const { error: storageError } =
            await supabase.storage
                .from("projects")
                .remove([
                    image.image_path
                ]);


        if (storageError) {
            console.error(storageError);
            setError(storageError.message);
            return;
        }


        const { error: databaseError } =
            await supabase
                .from("project_images")
                .delete()
                .eq("id", image.id);


        if (databaseError) {
            console.error(databaseError);
            setError(databaseError.message);
            return;
        }


        setScreenshots(current =>
            current.filter(
                item => item.id !== image.id
            )
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Upload file
    |--------------------------------------------------------------------------
    */

    async function uploadFile(file, path) {

        const { error } =
            await supabase.storage
                .from("Projects")
                .upload(
                    path,
                    file,
                    {
                        cacheControl: "3600",
                        upsert: true
                    }
                );


        if (error) {
            throw error;
        }

        return path;
    }


   //generate file

    function getFileExtension(file) {

        return (
            file.name
                .split(".")
                .pop()
                ?.toLowerCase() || "png"
        );

    }

    //submit
    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setSaving(true);


        try {

            /*
            |--------------------------------------------------------------------------
            | Validate
            |--------------------------------------------------------------------------
            */

            if (!title.trim()) {
                throw new Error(
                    "Project title is required."
                );
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


            /*
            |--------------------------------------------------------------------------
            | Update project
            |--------------------------------------------------------------------------
            */

            const { error: projectError } =
                await supabase
                    .from("projects")
                    .update({
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
                    .eq("id", id);


            if (projectError) {
                throw projectError;
            }


            /*
            |--------------------------------------------------------------------------
            | Replace cover image
            |--------------------------------------------------------------------------
            */

            if (coverImage) {

                const extension =
                    getFileExtension(
                        coverImage
                    );


                const folderName =
                    project.cover_image
                        ? project.cover_image
                            .split("/")
                            .slice(0, -1)
                            .join("/")
                        : title
                            .toLowerCase()
                            .trim()
                            .replace(
                                /[^a-z0-9]+/g,
                                "-"
                            );


                const coverPath =
                    `${folderName}/cover.${extension}`;


                await uploadFile(
                    coverImage,
                    coverPath
                );


                const {
                    error: coverError
                } = await supabase
                    .from("projects")
                    .update({
                        cover_image: coverPath
                    })
                    .eq("id", id);


                if (coverError) {
                    throw coverError;
                }

            }


            /*
            |--------------------------------------------------------------------------
            | Technologies
            |--------------------------------------------------------------------------
            */


            

                /*
                |--------------------------------------------------------------------------
                | Remove existing technologies
                |--------------------------------------------------------------------------
                */

                const {
                    error: deleteError
                } = await supabase
                    .from("project_technologies")
                    .delete()
                    .eq("project_id", id);


                if (deleteError) {
                    throw deleteError;
                }


                /*
                |--------------------------------------------------------------------------
                | Add currently selected technologies
                |--------------------------------------------------------------------------
                */

                if (selectedTechnologies.length > 0) {

                    const rows =
                        selectedTechnologies.map(
                            technologyId => ({
                                project_id: id,
                                technology_id:
                                    technologyId
                            })
                        );


                    const {
                        error: insertError
                    } = await supabase
                        .from("project_technologies")
                        .insert(rows);


                    if (insertError) {
                        throw insertError;
                    }
                }


                console.log(
                    "Technologies updated successfully"
                );


            /*
            |--------------------------------------------------------------------------
            | Upload new screenshots
            |--------------------------------------------------------------------------
            */

            if (newScreenshots.length > 0) {

                const currentHighestOrder =
                    screenshots.length > 0
                        ? Math.max(
                            ...screenshots.map(
                                image =>
                                    image.display_order
                            )
                        )
                        : -1;


                const imageRows = [];


                for (
                    let index = 0;
                    index < newScreenshots.length;
                    index++
                ) {

                    const file =
                        newScreenshots[index];

                    const extension =
                        getFileExtension(file);


                    /*
                     * Use project folder from
                     * existing images.
                     */

                    let folderName =
                        project.cover_image
                            ?.split("/")
                            .slice(0, -1)
                            .join("/");


                    /*
                     * Fallback if no cover exists.
                     */

                    if (!folderName) {

                        folderName =
                            title
                                .toLowerCase()
                                .trim()
                                .replace(
                                    /[^a-z0-9]+/g,
                                    "-"
                                );

                    }


                    const timestamp =
                        Date.now();

                    const fileName =
                        `${timestamp}-${index + 1}.${extension}`;


                    const imagePath =
                        `${folderName}/${fileName}`;


                    await uploadFile(
                        file,
                        imagePath
                    );


                    imageRows.push({
                        project_id: id,
                        image_path: imagePath,
                        caption: file.name,
                        display_order:
                            currentHighestOrder +
                            index +
                            1
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
                "Unable to update project."
            );

        } finally {

            setSaving(false);

        }

    }


    if (loading) {

        return (
            <Loader/>
        );

    }


    if (!project) {

        return (
            <div className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-8
            ">

                <h2 className="text-xl font-bold">
                    Project not found
                </h2>

                <Link
                    to="/admin/projects"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        mt-5
                        text-blue-400
                    "
                >
                    <FaArrowLeft />
                    Back to Projects
                </Link>

            </div>
        );

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
                    Edit Project
                </h1>


                <p className="
                    text-slate-400
                    mt-2
                ">
                    Update your project information.
                </p>

            </div>


            {/* Error */}

            {error && (

                <div className="
                    bg-red-500/10
                    border
                    border-red-500/30
                    text-red-400
                    rounded-xl
                    p-4
                    mb-6
                ">
                    {error}
                </div>

            )}


            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                {/* Project information */}

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


                    <div className="space-y-5">

                        {/* Project Title */}
                        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-3">
                            <label className="font-semibold">
                                Project Title:
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="input rounded-xl px-3 py-2 w-full"
                            />
                        </div>

                        {/* Short Description */}
                        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start gap-3">
                            <label className="font-semibold pt-2">
                                Short Description:
                            </label>

                            <textarea
                                rows={2}
                                value={shortDescription}
                                onChange={e => setShortDescription(e.target.value)}
                                className="input resize-y rounded-xl px-3 py-2 w-full"
                            />
                        </div>

                        {/* Description */}
                        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start gap-3">
                            <label className="font-semibold pt-2">
                                Description:
                            </label>

                            <textarea
                                rows={4}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="input resize-y rounded-xl px-3 py-2 w-full"
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

                        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-1">

                            <label className="label font-semibold mr-4">
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
                                className="input rounded-xl px-3 py-1 w-3/4"
                            />

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-1">

                            <label className="label font-semibold mr-4">
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
                                className="input rounded-xl px-3 py-1 w-3/4"
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
                        text-sm
                        text-slate-400
                        mb-6
                    ">
                        Manage the technologies used by this project.
                    </p>


                    {/* Selected */}

                    <div className="mb-8">

                        <h3 className="
                            text-sm
                            font-semibold
                            text-blue-400
                            mb-3
                        ">
                            Selected Technologies
                        </h3>


                        {selected.length > 0 ? (

                            <div className="
                                flex
                                flex-wrap
                                gap-3
                            ">

                                {selected.map(technology => (

                                    <button
                                        type="button"
                                        key={technology.id}
                                        onClick={() =>
                                            toggleTechnology(
                                                technology.id
                                            )
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            px-4
                                            py-2
                                            rounded-xl
                                            bg-blue-600/20
                                            border
                                            border-blue-500
                                            text-blue-400
                                            hover:bg-red-500/10
                                            hover:border-red-500
                                            hover:text-red-400
                                            transition
                                        "
                                    >

                                        {technology.name}

                                        <FaTimes
                                            className="text-xs"
                                        />

                                    </button>

                                ))}

                            </div>

                        ) : (

                            <p className="
                                text-sm
                                text-slate-500
                            ">
                                No technologies selected.
                            </p>

                        )}

                    </div>


                    {/* Available */}

                    <div>

                        <h3 className="
                            text-sm
                            font-semibold
                            text-slate-400
                            mb-3
                        ">
                            Available Technologies
                        </h3>


                        {available.length > 0 ? (

                            <div className="
                                grid
                                grid-cols-2
                                sm:grid-cols-3
                                md:grid-cols-4
                                gap-3
                            ">

                                {available.map(technology => (

                                    <button
                                        type="button"
                                        key={technology.id}
                                        onClick={() =>
                                            toggleTechnology(
                                                technology.id
                                            )
                                        }
                                        className="
                                            px-4
                                            py-3
                                            rounded-xl
                                            bg-slate-800
                                            border
                                            border-slate-700
                                            text-slate-300
                                            hover:border-blue-500
                                            hover:text-blue-400
                                            transition
                                            text-left
                                        "
                                    >

                                        {technology.name}

                                    </button>

                                ))}

                            </div>

                        ) : (

                            <p className="
                                text-sm
                                text-slate-500
                            ">
                                All available technologies are selected.
                            </p>

                        )}

                    </div>

                </section>


                {/* Cover image */}

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
                        Cover Image
                    </h2>


                    <div className="
                        grid
                        md:grid-cols-2
                        gap-6
                    ">

                        {/* Current */}

                        <div>

                            <p className="
                                text-sm
                                text-slate-400
                                mb-3
                            ">
                                Current Cover
                            </p>


                            {project.cover_image ? (

                                <img
                                    src={getProjectImage(
                                        project.cover_image
                                    )}
                                    alt={project.title}
                                    className="
                                        w-full
                                        h-48
                                        object-cover
                                        rounded-xl
                                    "
                                />

                            ) : (

                                <div className="
                                    h-48
                                    flex
                                    items-center
                                    justify-center
                                    bg-slate-800
                                    rounded-xl
                                    text-slate-500
                                ">
                                    No cover image
                                </div>

                            )}

                        </div>


                        {/* Replace */}

                        <label className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            min-h-48
                            border-2
                            border-dashed
                            border-slate-700
                            rounded-xl
                            cursor-pointer
                            hover:border-blue-500
                        ">

                            <FaImage className="
                                text-3xl
                                text-slate-500
                                mb-3
                            " />

                            <span className="
                                text-slate-300
                            ">
                                {coverImage
                                    ? coverImage.name
                                    : "Replace cover image"
                                }
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

                </section>


                {/* Screenshots */}

                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-6
                    md:p-8
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-6
                    ">

                        <div>

                            <h2 className="
                                text-xl
                                font-bold
                            ">
                                Screenshots
                            </h2>

                            <p className="
                                text-sm
                                text-slate-400
                                mt-1
                            ">
                                Manage project screenshots.
                            </p>

                        </div>


                        <label className="
                            inline-flex
                            items-center
                            gap-2
                            bg-blue-600
                            hover:bg-blue-700
                            px-4
                            py-2
                            rounded-xl
                            cursor-pointer
                            text-sm
                        ">

                            <FaPlus />

                            Add

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={
                                    handleNewScreenshots
                                }
                                className="hidden"
                            />

                        </label>

                    </div>


                    {/* Existing screenshots */}

                    {screenshots.length > 0 && (

                        <div className="
                            grid
                            grid-cols-2
                            md:grid-cols-3
                            gap-4
                        ">

                            {screenshots.map(
                                image => (

                                    <div
                                        key={image.id}
                                        className="
                                            relative
                                            group
                                            rounded-xl
                                            overflow-hidden
                                            bg-slate-800
                                        "
                                    >

                                        <img
                                            src={getProjectImage(
                                                image.image_path
                                            )}
                                            alt={
                                                image.caption ||
                                                "Project screenshot"
                                            }
                                            className="
                                                w-full
                                                h-40
                                                object-cover
                                            "
                                        />


                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteScreenshot(
                                                    image
                                                )
                                            }
                                            className="
                                                absolute
                                                top-2
                                                right-2
                                                w-9
                                                h-9
                                                flex
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-black/70
                                                text-red-400
                                                hover:bg-red-600
                                                hover:text-white
                                            "
                                        >
                                            <FaTrash />
                                        </button>


                                        <div className="
                                            absolute
                                            bottom-0
                                            left-0
                                            right-0
                                            bg-black/70
                                            p-2
                                            text-xs
                                            truncate
                                        ">
                                            {image.caption}
                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}


                    {/* New screenshots */}

                    {newScreenshots.length > 0 && (

                        <div className="mt-6">

                            <h3 className="
                                text-sm
                                font-medium
                                text-slate-300
                                mb-3
                            ">
                                New screenshots
                            </h3>


                            <div className="
                                grid
                                grid-cols-2
                                md:grid-cols-3
                                gap-4
                            ">

                                {newScreenshots.map(
                                    (file, index) => (

                                        <div
                                            key={`${file.name}-${file.lastModified}-${index}`}
                                            className="
                                                relative
                                                rounded-xl
                                                overflow-hidden
                                            "
                                        >

                                            <img
                                                src={URL.createObjectURL(
                                                    file
                                                )}
                                                alt={file.name}
                                                className="
                                                    w-full
                                                    h-40
                                                    object-cover
                                                "
                                            />


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeNewScreenshot(
                                                        index
                                                    )
                                                }
                                                className="
                                                    absolute
                                                    top-2
                                                    right-2
                                                    w-9
                                                    h-9
                                                    flex
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-black/70
                                                    text-red-400
                                                "
                                            >
                                                <FaTimes />
                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                </section>


                {/* Publish */}

                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-6
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
                                Published
                            </span>

                            <span className="
                                text-sm
                                text-slate-500
                            ">
                                Show this project on the public portfolio.
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

                {/* Actions */}

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
                            text-center
                        "
                    >
                        Cancel
                    </Link>


                    <button
                        type="submit"
                        disabled={saving}
                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-blue-600
                            hover:bg-blue-700
                            disabled:opacity-50
                            rounded-xl
                            font-medium
                        "
                    >
                        {saving
                            ? "Saving Changes..."
                            : "Save Changes"
                        }
                    </button>

                </div>

            </form>

        </div>

    );
}

export default AdminProjectEdit;