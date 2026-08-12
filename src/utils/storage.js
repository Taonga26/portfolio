import { supabase } from "./supabase";

//project images
export function getProjectImage(path) {
    if (!path) return null;

    const { data } = supabase.storage
        .from("Projects")
        .getPublicUrl(path);

    return data.publicUrl;
}
//resume
export function getResumeUrl(
    fileUrl
) {

    if (!fileUrl) {
        return null;
    }

    const {
        data
    } = supabase.storage
        .from("resume")
        .getPublicUrl(fileUrl);

    return data.publicUrl;
}
//profile images
export function getProfileImage(path) {
    if (!path) return null;

    const { data } = supabase.storage
        .from("profile")
        .getPublicUrl(path);

    return data.publicUrl;
}


