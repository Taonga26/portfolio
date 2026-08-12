import { supabase } from "./supabase";


export function getResumeUrl(
    filePath
) {

    if (!filePath) {
        return null;
    }


    const {
        data
    } = supabase.storage
        .from("resumes")
        .getPublicUrl(filePath);


    return data.publicUrl;
}