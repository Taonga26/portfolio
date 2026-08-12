import { useEffect, useState } from "react";
import { FaSave, FaUser } from "react-icons/fa";

import { supabase } from "../utils/supabase";
import Loader from "../components/Loader";

function AdminProfile() {
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [aboutImagePreview, setAboutImagePreview] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [aboutImage, setAboutImage] = useState(null);
    

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    const [form, setForm] = useState({
        name: "",
        last_name: "",
        professional_title: "",
        short_bio: "",

        email: "",
        phone: "",
        location: "",

        github_url: "",
        linkedin_url: "",
        facebook_url: "",
        twitter_url: "",
        website_url: ""
    });


    const [aboutForm, setAboutForm] = useState({
        id: "",
        title: "",
        content: "",
        content_secondary: "",
        image_path: ""
    });


    /*
    |--------------------------------------------------------------------------
    | Load profile
    |--------------------------------------------------------------------------
    */


    useEffect(() => {

        async function loadProfile() {

            setLoading(true);
            setError("");


            const {
                data,
                error
            } = await supabase
                .from("profile")
                .select(`*,
                    about (*
                    )
                    `)
                .limit(1)
                .maybeSingle();


            if (error) {

                console.error(error);

                setError(error.message);

                setLoading(false);

                return;
            }


            if (data) {

                setProfile(data);

                setForm({
                    name:
                        data.name || "",

                    last_name: 
                        data.last_name || "",

                    professional_title:
                        data.professional_title || "",

                    short_bio:
                        data.short_bio || "",

                    email:
                        data.email || "",

                    phone:
                        data.phone || "",

                    location:
                        data.location || "",

                    github_url:
                        data.github_url || "",

                    linkedin_url:
                        data.linkedin_url || "",

                    facebook_url:
                        data.facebook_url || "",

                    twitter_url:
                        data.twitter_url || "",

                    website_url:
                        data.website_url || ""
                });

                if (data.about) {

                    setAboutForm({
                        id: data.about.id || "",
                        title: data.about.title || "",
                        content: data.about.content || "",
                        content_secondary:
                            data.about.content_secondary || "",
                    });

                    if (data.about.image_path) {

                    const {
                        data: imageData
                    } = supabase.storage
                        .from("profile")
                        .getPublicUrl(
                            data.about.image_path
                        );

                    setAboutImagePreview(
                        imageData.publicUrl
                    );
                }

                }

                if (data.profile_image_path) {

                    const {
                        data: imageData
                    } = supabase.storage
                        .from("profile")
                        .getPublicUrl(
                            data.profile_image_path
                        );

                    setProfileImagePreview(
                        imageData.publicUrl
                    );
                }

                
            }

            console.log("Loaded profile:", data);


            setLoading(false);
        }

        loadProfile();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Handle input
    |--------------------------------------------------------------------------
    */

    function handleChange(event) {

        const {
            name,
            value
        } = event.target;


        setForm(previous => ({
            ...previous,
            [name]: value
        }));

    }

    function handleAboutChange(event) {

        const {
            name,
            value
        } = event.target;

        setAboutForm(previous => ({
            ...previous,
            [name]: value
        }));
    }

    function handleImageChange(event, type) {

        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        if (!selectedFile.type.startsWith("image/")) {

            setError("Please select a valid image.");

            return;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {

            setError("Image must be smaller than 5MB.");

            return;
        }

        if (type === "profile") {

            setProfileImage(selectedFile);

            setProfileImagePreview(
                URL.createObjectURL(selectedFile)
            );

        } else if (type === "about") {

            setAboutImage(selectedFile);

            setAboutImagePreview(
                URL.createObjectURL(selectedFile)
            );
        }

        setError("");
    }


    /*
    |--------------------------------------------------------------------------
    | Save
    |--------------------------------------------------------------------------
    */
    async function handleImageUpload(type) {

        const isProfileImage = type === "profile";

        // Select the correct image
        const selectedImage = isProfileImage
            ? profileImage
            : aboutImage;

        if (!selectedImage) {
            setError(
                `Please select a ${isProfileImage ? "profile" : "about"} image.`
            );
            return;
        }

        if (!profile?.id) {
            setError("Profile not loaded.");
            return;
        }

        setUploadingImage(true);
        setError("");
        setSuccess("");

        // Generate unique path
        const newPath =
            `${type}/${crypto.randomUUID()}-${selectedImage.name}`;

        // Database column
        const imageColumn = isProfileImage
            ? "profile_image_path"
            : "image_path";

        // Existing image
        const oldPath = profile?.[imageColumn];

        try {

            /*
            |--------------------------------------------------------------------------
            | Upload new image
            |--------------------------------------------------------------------------
            */
            
            const {
                error: uploadError
            } = await supabase.storage
                .from("profile")
                .upload(
                    newPath,
                    selectedImage,
                    {
                        cacheControl: "3600",
                        upsert: false,
                        contentType: selectedImage.type
                    }
                );

            if (uploadError) {
                throw uploadError;
            }
            


            /*
            |--------------------------------------------------------------------------
            | Update profile record
            |--------------------------------------------------------------------------
            */
            const record = isProfileImage? "profile":"about";


            const {
                error: updateError
            } = await supabase
                .from(record)
                .update({
                    [imageColumn]: newPath,
                    updated_at: new Date().toISOString()
                })
                .eq("id", profile.id);


            /*
            |--------------------------------------------------------------------------
            | If database update fails,
            | remove newly uploaded image
            |--------------------------------------------------------------------------
            */

            if (updateError) {

                await supabase.storage
                    .from(record)
                    .remove([
                        newPath
                    ]);

                throw updateError;
            }


            /*
            |--------------------------------------------------------------------------
            | Delete old image
            |--------------------------------------------------------------------------
            */

            if (
                oldPath &&
                oldPath !== newPath
            ) {

                const {
                    error: deleteError
                } = await supabase.storage
                    .from(record)
                    .remove([
                        oldPath
                    ]);

                if (deleteError) {

                    console.warn(
                        `Old ${type} image could not be deleted:`,
                        deleteError
                    );
                }
            }


            /*
            |--------------------------------------------------------------------------
            | Update local state
            |--------------------------------------------------------------------------
            */

            setProfile(previous => ({
                ...previous,
                [imageColumn]: newPath
            }));


            /*
            |--------------------------------------------------------------------------
            | Clear selected image
            |--------------------------------------------------------------------------
            */

            if (isProfileImage) {
                setProfileImage(null);
            } else {
                setAboutImage(null);
            }


            /*
            |--------------------------------------------------------------------------
            | Success message
            |--------------------------------------------------------------------------
            */

            setSuccess(
                `${isProfileImage ? "Profile" : "About"} image updated successfully.`
            );

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                `Failed to update ${isProfileImage ? "profile" : "about"} image.`
            );

        } finally {

            setUploadingImage(false);
        }
    }

    async function handleSubmit(event) {

        event.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {

            /*
            |--------------------------------------------------------------------------
            | Update profile
            |--------------------------------------------------------------------------
            */

            const {
                error: profileError
            } = await supabase
                .from("profile")
                .update({
                    ...form,
                    updated_at:
                        new Date().toISOString()
                })
                .eq(
                    "id",
                    profile.id
                );


            if (profileError) {
                throw profileError;
            }


            /*
            |--------------------------------------------------------------------------
            | Update About
            |--------------------------------------------------------------------------
            */

            if (aboutForm.id) {

                const {
                    error: aboutError
                } = await supabase
                    .from("about")
                    .update({
                        title:
                            aboutForm.title,

                        content:
                            aboutForm.content,

                        content_secondary:
                            aboutForm.content_secondary,

                        updated_at:
                            new Date().toISOString()
                    })
                    .eq(
                        "id",
                        aboutForm.id
                    );


                if (aboutError) {
                    throw aboutError;
                }
            }


            setSuccess(
                "Profile updated successfully."
            );


        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Failed to update profile."
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


    return (

        <div className="
            max-w-5xl
            mx-auto
            p-6
            md:p-8
        ">

            {/* Header */}

            <div className="
                flex
                items-center
                gap-4
                mb-8
            ">

                <div className="
                    w-12
                    h-12
                    rounded-xl
                    bg-blue-500/10
                    text-blue-400
                    flex
                    items-center
                    justify-center
                ">

                    <FaUser />

                </div>


                <div>

                    <h1 className="
                        text-2xl
                        md:text-3xl
                        font-bold
                    ">
                        Profile
                    </h1>

                    <p className="
                        text-slate-400
                        mt-1
                    ">
                        Manage the information
                        displayed on your portfolio.
                    </p>

                </div>

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

            <section className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                p-6
                md:p-8
                mb-6
            ">

                <div className="mb-6">

                    <h2 className="
                        text-xl
                        font-semibold
                    ">
                        Profile Image
                    </h2>

                    <p className="
                        text-sm
                        text-slate-400
                        mt-1
                    ">
                        This image will be displayed
                        throughout your portfolio.
                    </p>

                </div>


                <div className="
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    gap-8
                ">

                    {/* Preview */}

                    <div className="
                        w-40
                        h-40
                        rounded-full
                        overflow-hidden
                        border-4
                        border-slate-700
                        bg-slate-800
                        flex
                        items-center
                        justify-center
                        shrink-0
                    ">

                        {profileImagePreview ? (

                            <img
                                src={profileImagePreview}
                                alt="Profile preview"
                                className="
                                    w-full
                                    h-full
                                    object-cover
                                "
                            />

                        ) : (

                            <FaUser className="
                                text-5xl
                                text-slate-600
                            " />

                        )}

                    </div>


                    {/* Controls */}

                    <div className="
                        flex
                        flex-col
                        gap-4
                    ">

                        <label className="
                            inline-flex
                            items-center
                            justify-center
                            px-5
                            py-3
                            rounded-xl
                            border
                            border-slate-700
                            bg-slate-800
                            hover:border-blue-500
                            cursor-pointer
                            transition
                        ">

                            Choose Image

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                        </label>


                        {profileImage && (

                            <p className="
                                text-sm
                                text-slate-400
                            ">
                                {profileImage.name}
                            </p>

                        )}


                        <button
                            type="button"
                            onClick={()=>
                                handleImageUpload("profile")
                            }
                            disabled={
                                !profileImage ||
                                uploadingImage
                            }
                            className="
                                px-5
                                py-3
                                rounded-xl
                                bg-blue-600
                                hover:bg-blue-700
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                transition
                            "
                        >

                            {uploadingImage
                                ? "Uploading..."
                                : "Change Profile Image"
                            }

                        </button>


                        <p className="
                            text-xs
                            text-slate-500
                        ">
                            JPG, PNG or WebP. Maximum 5MB.
                        </p>

                    </div>

                </div>

            </section>


            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >   
                {/* ======================================================
                    Personal Information
                ====================================================== */}

                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-6
                    md:p-8
                ">

                    <h2 className="
                        text-xl
                        font-semibold
                        mb-6
                    ">
                        Personal Information
                    </h2>


                    <div className="
                        grid
                        md:grid-cols-2
                        gap-6
                    ">

                        <Input
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="First name"
                        />

                        <Input
                            label="Last Name"
                            name="last_name"
                            value={form.last_name}
                            onChange={handleChange}
                            placeholder="Last name"
                        />


                        <Input
                            label="Professional Title"
                            name="professional_title"
                            value={
                                form.professional_title
                            }
                            onChange={handleChange}
                            placeholder="Software Developer"
                        />


                        <Input
                            label="Location"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Lusaka, Zambia"
                        />

                    </div>

                </section>


                {/* ======================================================
                    About
                ====================================================== */}

                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-6
                    md:p-8
                    
                ">

                    <div className="mb-6">

                        <h2 className="
                            text-xl
                            font-semibold
                        ">
                            About Me
                        </h2>

                        <p className="
                            text-sm
                            text-slate-400
                            mt-1
                        ">
                            Manage the content displayed in
                            the About section of your portfolio.
                        </p>

                    </div>

                    <section className="
                        bg-slate-900
                        border
                        border-slate-800
                        rounded-3xl
                        p-6
                        md:p-8
                        mb-4
                    ">

                        <div className="mb-6">

                            <h2 className="
                                text-xl
                                font-semibold
                            ">
                                Image
                            </h2>

                            <p className="
                                text-sm
                                text-slate-400
                                mt-1
                            ">
                                This image will be displayed
                                throughout your portfolio.
                            </p>

                        </div>


                        <div className="
                            flex
                            flex-col
                            md:flex-row
                            items-center
                            gap-8
                            mb-4
                        ">

                            {/* Preview */}

                            <div className="
                                w-40
                                h-40
                                rounded-full
                                overflow-hidden
                                border-4
                                border-slate-700
                                bg-slate-800
                                flex
                                items-center
                                justify-center
                                shrink-0
                            ">

                                {aboutImagePreview ? (

                                    <img
                                        src={aboutImagePreview}
                                        alt="Profile preview"
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                        "
                                    />

                                ) : (

                                    <FaUser className="
                                        text-5xl
                                        text-slate-600
                                    " />

                                )}

                            </div>


                            {/* Controls */}

                            <div className="
                                flex
                                flex-col
                                gap-4
                            ">

                                <label className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    px-5
                                    py-3
                                    rounded-xl
                                    border
                                    border-slate-700
                                    bg-slate-800
                                    hover:border-blue-500
                                    cursor-pointer
                                    transition
                                ">

                                    Choose Image

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                </label>


                                {aboutImage && (

                                    <p className="
                                        text-sm
                                        text-slate-400
                                    ">
                                        {aboutImage.name}
                                    </p>

                                )}


                                <button
                                    type="button"
                                    onClick={()=>
                                        handleImageUpload("about")
                                    }
                                    disabled={
                                        !aboutImage ||
                                        uploadingImage
                                    }
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-blue-600
                                        hover:bg-blue-700
                                        disabled:opacity-50
                                        disabled:cursor-not-allowed
                                        transition
                                    "
                                >

                                    {uploadingImage
                                        ? "Uploading..."
                                        : "Change About Image"
                                    }

                                </button>


                                <p className="
                                    text-xs
                                    text-slate-500
                                ">
                                    JPG, PNG or WebP. Maximum 5MB.
                                </p>

                            </div>

                        </div>

                    </section>


                    <div className="space-y-6">

                        {/* About Title */}

                        <Input
                            label="About Title"
                            name="title"
                            value={aboutForm.title}
                            onChange={handleAboutChange}
                            placeholder="Full Stack Developer & Machine Learning Enthusiast"
                        />


                        {/* Primary Content */}

                        <Textarea
                            label="Main Content"
                            name="content"
                            value={aboutForm.content}
                            onChange={handleAboutChange}
                            placeholder="Write the main About Me content..."
                            rows={7}
                        />


                        {/* Secondary Content */}

                        <Textarea
                            label="Secondary Content"
                            name="content_secondary"
                            value={
                                aboutForm.content_secondary
                            }
                            onChange={handleAboutChange}
                            placeholder="Write additional information about yourself..."
                            rows={7}
                        />

                    </div>

                </section>


                {/* ======================================================
                    Social Links
                ====================================================== */}

                <section className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-6
                    md:p-8
                ">

                    <h2 className="
                        text-xl
                        font-semibold
                        mb-6
                    ">
                        Social & Website Links
                    </h2>


                    <div className="space-y-6">

                        <Input
                            label="GitHub"
                            name="github_url"
                            value={form.github_url}
                            onChange={handleChange}
                            placeholder="https://github.com/..."
                        />


                        <Input
                            label="LinkedIn"
                            name="linkedin_url"
                            value={form.linkedin_url}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/..."
                        />


                        <Input
                            label="Facebook"
                            name="facebook_url"
                            value={form.facebook_url}
                            onChange={handleChange}
                            placeholder="https://facebook.com/..."
                        />


                        <Input
                            label="Twitter / X"
                            name="twitter_url"
                            value={form.twitter_url}
                            onChange={handleChange}
                            placeholder="https://x.com/..."
                        />


                        <Input
                            label="Personal Website"
                            name="website_url"
                            value={form.website_url}
                            onChange={handleChange}
                            placeholder="https://..."
                        />

                    </div>

                </section>


                {/* Save */}

                <div className="
                    flex
                    justify-end
                ">

                    <button
                        type="submit"
                        disabled={saving}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-6
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
                            : "Save Changes"
                        }

                    </button>

                </div>

            </form>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Input component
|--------------------------------------------------------------------------
*/

function Input({
    label,
    ...props
}) {

    return (

        <div>

            <label className="
                block
                text-sm
                font-medium
                mb-2
            ">
                {label}
            </label>


            <input
                {...props}
                className="
                    w-full
                    bg-slate-800
                    border
                    border-slate-700
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    placeholder-slate-500
                    focus:outline-none
                    focus:border-blue-500
                    transition
                "
            />

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Textarea component
|--------------------------------------------------------------------------
*/

function Textarea({
    label,
    ...props
}) {

    return (

        <div>

            <label className="
                block
                text-sm
                font-medium
                mb-2
            ">
                {label}
            </label>


            <textarea
                {...props}
                className="
                    w-full
                    bg-slate-800
                    border
                    border-slate-700
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    placeholder-slate-500
                    focus:outline-none
                    focus:border-blue-500
                    transition
                    resize-y
                "
            />

        </div>
    );
}


export default AdminProfile;