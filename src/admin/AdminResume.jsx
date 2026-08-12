import { useEffect, useState } from "react";
import {
    FaDownload,
    FaFilePdf,
    FaTrash,
    FaUpload
} from "react-icons/fa";

import { supabase } from "../utils/supabase";
import { getResumeUrl } from "../utils/storage";


function AdminResume() {

    const [resume, setResume] = useState(null);

    const [file, setFile] = useState(null);

    const [loading, setLoading] =
        useState(true);

    const [uploading, setUploading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    /*
    |--------------------------------------------------------------------------
    | Load current resume
    |--------------------------------------------------------------------------
    */


    useEffect(() => {


        async function loadResume() {

            setLoading(true);
            setError("");


            const {
                data,
                error
            } = await supabase
                .from("resume")
                .select(`
                    id,
                    file_name,
                    file_url,
                    updated_at,
                    active
                `)
                .eq("active", true)
                .maybeSingle();


            if (error) {

                console.error(error);

                setError(error.message);

                setLoading(false);

                return;
            }


            setResume(data);

            setLoading(false);
        }

        loadResume();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Select file
    |--------------------------------------------------------------------------
    */

    function handleFileChange(event) {

        setError("");
        setSuccess("");


        const selectedFile =
            event.target.files?.[0];


        if (!selectedFile) {
            return;
        }


        if (
            selectedFile.type !==
            "application/pdf"
        ) {

            setError(
                "Please select a PDF file."
            );

            event.target.value = "";

            return;
        }


        setFile(selectedFile);
    }


    /*
    |--------------------------------------------------------------------------
    | Upload
    |--------------------------------------------------------------------------
    */

    async function handleUpload(event) {

        event.preventDefault();

        setError("");
        setSuccess("");

        if (!file) {
            setError("Please select a PDF file first.");
            return;
        }

        setUploading(true);

        

        try {
            let newFilePath = null;
            
            // Generate unique storage path
            

            newFilePath = `resume/${crypto.randomUUID()}.pdf`;



            // Upload the new PDF
            

            const {
                error: uploadError
            } = await supabase.storage
                .from("resume")
                .upload(
                    newFilePath,
                    file,
                    {
                        cacheControl: "3600",
                        upsert: false,
                        contentType: "application/pdf"
                    }
                );


            if (uploadError) {
                throw uploadError;
            }


            // Create the new resume record FIRST

            const {
                data: newResume,
                error: insertError
            } = await supabase
                .from("resume")
                .insert({
                    file_name: file.name,
                    file_url: newFilePath,
                    active: true
                })
                .select()
                .single();


            /*
            | If database insert failed:
            | delete the newly uploaded file
            */

            if (insertError) {

                await supabase.storage
                    .from("resume")
                    .remove([
                        newFilePath
                    ]);

                newFilePath = null;

                throw insertError;
            }


            
            // Deactivate the old resume
        

            if (resume) {

                const {
                    error: deactivateError
                } = await supabase
                    .from("resume")
                    .update({
                        active: false
                    })
                    .eq("id", resume.id);


                // If deactivation fails:
                // remove the new DB record + new file
    
                if (deactivateError) {

                    await supabase
                        .from("resume")
                        .delete()
                        .eq(
                            "id",
                            newResume.id
                        );


                    await supabase.storage
                        .from("resume")
                        .remove([
                            newFilePath
                        ]);

                    newFilePath = null;

                    throw deactivateError;
                }
            }


            // Delete the old storage file

            if (resume?.file_url) {

                const {
                    error: removeError
                } = await supabase.storage
                    .from("resume")
                    .remove([
                        resume.file_url
                    ]);


                /*
                |--------------------------------------------------------------------------
                | Do NOT rollback here.
                |
                | The new resume is already active.
                | Failure to delete the old file is only
                | a storage cleanup problem.
                |--------------------------------------------------------------------------
                */

                if (removeError) {

                    console.warn(
                        "Old resume could not be deleted:",
                        removeError
                    );
                }
            }



            // Update React state

            setResume(newResume);

            setFile(null);

            setSuccess(
                "Resume replaced successfully."
            );


            
            
            // Reset file input
            

            event.target.reset();


        } catch (error) {

            console.error(
                "Resume upload failed:",
                error
            );


            setError(
                error.message ||
                "Failed to replace resume."
            );


        } finally {

            setUploading(false);
        }
    }


    
    
    // Delete resume
    

    async function handleDelete() {

        if (!resume) {
            return;
        }


        const confirmed =
            window.confirm(
                "Are you sure you want to delete the current resume?"
            );


        if (!confirmed) {
            return;
        }


        setError("");
        setSuccess("");


        try {

            // Delete storage file

            const {
                error: storageError
            } = await supabase.storage
                .from("resume")
                .remove([
                    resume.file_url
                ]);


            if (storageError) {
                throw storageError;
            }

            
            // Delete database record
            

            const {
                error: databaseError
            } = await supabase
                .from("resume")
                .delete()
                .eq(
                    "id",
                    resume.id
                );


            if (databaseError) {
                throw databaseError;
            }


            setResume(null);

            setSuccess(
                "Resume deleted successfully."
            );

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Failed to delete resume."
            );
        }
    }


    if (loading) {

        return (

            <div className="
                p-8
                text-slate-400
            ">
                Loading resume...
            </div>

        );
    }

    const resumeUrl = getResumeUrl(
        resume?.file_url
    );


    return (

        <div className="
            max-w-5xl
            mx-auto
            p-6
            md:p-8
        ">

            {/* Header */}

            <div className="mb-8">

                <h1 className="
                    text-2xl
                    md:text-3xl
                    font-bold
                ">
                    Resume
                </h1>

                <p className="
                    text-slate-400
                    mt-2
                ">
                    Manage the resume displayed
                    on your portfolio.
                </p>

            </div>


            {/* Messages */}

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


            {success && (

                <div className="
                    mb-6
                    p-4
                    rounded-xl
                    bg-green-500/10
                    border
                    border-green-500/30
                    text-green-400
                ">
                    {success}
                </div>

            )}


            <div className="
                grid
                lg:grid-cols-2
                gap-8
            ">

                {/* Current resume */}

                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-6
                ">

                    <h2 className="
                        text-lg
                        font-semibold
                        mb-6
                    ">
                        Current Resume
                    </h2>


                    {resume ? (

                        <div className="
                            space-y-6
                        ">

                            <div className="
                                flex
                                items-center
                                gap-4
                                p-5
                                rounded-2xl
                                bg-slate-800
                                border
                                border-slate-700
                            ">

                                <div className="
                                    w-14
                                    h-14
                                    rounded-xl
                                    bg-red-500/10
                                    text-red-400
                                    flex
                                    items-center
                                    justify-center
                                ">

                                    <FaFilePdf
                                        className="text-2xl"
                                    />

                                </div>


                                <div className="min-w-0">

                                    <p className="
                                        font-medium
                                        truncate
                                    ">
                                        {resume.file_name}
                                    </p>

                                    <p className="
                                        text-sm
                                        text-slate-500
                                        mt-1
                                    ">
                                        Updated{" "}
                                        {new Date(
                                            resume.updated_at
                                        ).toLocaleDateString()}
                                    </p>

                                </div>

                            </div>


                            <div className="
                                flex
                                flex-wrap
                                gap-3
                            ">

                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-blue-600
                                        hover:bg-blue-700
                                        transition
                                    "
                                >
                                    View Resume
                                </a>


                                <a
                                    href={resumeUrl}
                                    download
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-slate-800
                                        hover:bg-slate-700
                                        transition
                                    "
                                >
                                    <FaDownload />
                                    Download
                                </a>


                                <button
                                    type="button"
                                    onClick={
                                        handleDelete
                                    }
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-red-500/10
                                        text-red-400
                                        hover:bg-red-500/20
                                        transition
                                    "
                                >
                                    <FaTrash />
                                    Delete
                                </button>

                            </div>

                        </div>

                    ) : (

                        <div className="
                            text-center
                            py-12
                            text-slate-500
                        ">

                            <FaFilePdf
                                className="
                                    text-5xl
                                    mx-auto
                                    mb-4
                                "
                            />

                            <p>
                                No active resume.
                            </p>

                        </div>

                    )}

                </section>


                {/* Upload */}

                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-6
                ">

                    <h2 className="
                        text-lg
                        font-semibold
                        mb-2
                    ">
                        {resume
                            ? "Replace Resume"
                            : "Upload Resume"
                        }
                    </h2>

                    <p className="
                        text-sm
                        text-slate-400
                        mb-6
                    ">
                        Upload a PDF file. The new
                        resume will automatically
                        become the active resume.
                    </p>


                    <form
                        onSubmit={
                            handleUpload
                        }
                    >

                        <label className="
                            block
                            border-2
                            border-dashed
                            border-slate-700
                            hover:border-blue-500
                            rounded-2xl
                            p-8
                            text-center
                            cursor-pointer
                            transition
                        ">

                            <FaUpload className="
                                mx-auto
                                text-3xl
                                text-blue-400
                                mb-4
                            " />

                            <p className="
                                font-medium
                            ">
                                Select PDF
                            </p>

                            <p className="
                                text-sm
                                text-slate-500
                                mt-2
                            ">
                                PDF files only
                            </p>


                            <input
                                type="file"
                                accept="application/pdf,.pdf"
                                onChange={
                                    handleFileChange
                                }
                                className="hidden"
                            />

                        </label>


                        {file && (

                            <div className="
                                mt-4
                                p-4
                                rounded-xl
                                bg-slate-800
                                text-sm
                            ">

                                Selected:

                                <span className="
                                    ml-2
                                    text-blue-400
                                ">
                                    {file.name}
                                </span>

                            </div>

                        )}


                        <button
                            type="submit"
                            disabled={
                                uploading ||
                                !file
                            }
                            className="
                                w-full
                                mt-6
                                py-3
                                rounded-xl
                                bg-blue-600
                                hover:bg-blue-700
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                transition
                            "
                        >

                            {uploading
                                ? "Uploading..."
                                : resume
                                    ? "Replace Resume"
                                    : "Upload Resume"
                            }

                        </button>

                    </form>

                </section>

            </div>

        </div>
    );
}


export default AdminResume;